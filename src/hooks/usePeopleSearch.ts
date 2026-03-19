/**
 * Hook to search for people using Microsoft Graph or a mock provider
 */

import { useState, useEffect } from 'react';
import { useGraphClient } from './useGraphClient';
import { useProvider, useProviderState } from '../providers/ProviderContext';
import { isPeopleSearchProvider, PeopleSearchResult } from '../providers/IPersonDataProvider';

export interface UsePeopleSearchOptions {
  /**
   * Minimum number of characters required before searching (default: 1)
   */
  minChars?: number;
  /**
   * Maximum number of results to return (default: 10)
   */
  maxResults?: number;
  /**
   * Whether an empty query should load initial suggestions (default: false)
   */
  loadInitialResults?: boolean;
}

export interface UsePeopleSearchResult {
  /**
   * The list of matching people
   */
  results: PeopleSearchResult[];
  /**
   * Whether a search is in progress
   */
  loading: boolean;
}

const PEOPLE_SEARCH_SELECT_FIELDS =
  'id,displayName,mail,userPrincipalName,jobTitle,department';

const PEOPLE_SUGGESTIONS_SELECT_FIELDS =
  'id,displayName,scoredEmailAddresses,userPrincipalName,jobTitle,department';

/**
 * Suggestion item returned by the Microsoft Graph `/me/people` endpoint.
 *
 * Unlike the `/users` search response, the primary email is exposed through
 * `scoredEmailAddresses` rather than a top-level `mail` field.
 */
interface GraphPeopleSuggestion {
  id?: string | null;
  displayName?: string | null;
  userPrincipalName?: string | null;
  /**
   * Ranked email addresses associated with the suggested person.
   * The first address is used as the primary email in picker results.
   */
  scoredEmailAddresses?: Array<{
    address?: string | null;
  }> | null;
  jobTitle?: string | null;
  department?: string | null;
}

/**
 * Convert a `/me/people` suggestion into the shared {@link PeopleSearchResult} shape.
 *
 * @param person - The raw suggestion returned by Microsoft Graph
 * @returns A normalized picker result with a stable ID and primary email
 */
const mapGraphPeopleSuggestion = (person: GraphPeopleSuggestion): PeopleSearchResult => {
  const primaryEmail = person.scoredEmailAddresses?.[0]?.address ?? null;
  const fallbackId = `person-suggestion:${person.displayName ?? 'unknown'}:${person.userPrincipalName ?? primaryEmail ?? person.jobTitle ?? 'no-identity'}`;

  return {
    id: person.id ?? person.userPrincipalName ?? primaryEmail ?? person.displayName ?? fallbackId,
    displayName: person.displayName ?? null,
    mail: primaryEmail,
    userPrincipalName: person.userPrincipalName ?? null,
    jobTitle: person.jobTitle ?? null,
    department: person.department ?? null,
  };
};

/**
 * Hook to search for people by name, email, or UPN.
 *
 * When used with a {@link MockProvider} the search is performed locally against mock data.
 * With a real provider the hook queries the Microsoft Graph `/users` endpoint using
 * `$search` with `ConsistencyLevel: eventual`.
 *
 * @param query - The search query string
 * @param options - Optional configuration
 * @returns An object with the search results and a loading flag
 */
export const usePeopleSearch = (
  query: string,
  options?: UsePeopleSearchOptions
): UsePeopleSearchResult => {
  const graphClient = useGraphClient();
  const provider = useProvider();
  const providerState = useProviderState();
  const minChars = options?.minChars ?? 1;
  const maxResults = options?.maxResults ?? 10;
  const loadInitialResults = options?.loadInitialResults ?? false;

  const [results, setResults] = useState<PeopleSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      if (!loadInitialResults) {
        setResults([]);
        setLoading(false);
        return;
      }
    } else if (query.length < minChars) {
      setResults([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const search = async () => {
      setLoading(true);
      const sanitizedQuery = query.replace(/"/g, '');
      try {
        if (isPeopleSearchProvider(provider)) {
          const data = await provider.searchPeople(query, maxResults);
          if (!cancelled) {
            setResults(data);
          }
        } else if (providerState === 'SignedIn' && graphClient) {
          let nextResults: PeopleSearchResult[];

          if (sanitizedQuery) {
            const response = (await graphClient
              .api('/users')
              .header('ConsistencyLevel', 'eventual')
              .search(`"displayName:${sanitizedQuery}" OR "mail:${sanitizedQuery}" OR "userPrincipalName:${sanitizedQuery}"`)
              .select(PEOPLE_SEARCH_SELECT_FIELDS)
              .top(maxResults)
              .get()) as { value?: PeopleSearchResult[] };

            nextResults = response.value ?? [];
          } else {
            const response = (await graphClient
              .api('/me/people')
              .select(PEOPLE_SUGGESTIONS_SELECT_FIELDS)
              .top(maxResults)
              .get()) as { value?: GraphPeopleSuggestion[] };

            nextResults = (response.value ?? []).map(mapGraphPeopleSuggestion);
          }

          if (!cancelled) {
            setResults(nextResults);
          }
        } else {
          if (!cancelled) {
            setResults([]);
          }
        }
      } catch {
        if (!cancelled) {
          setResults([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    const debounceHandle = setTimeout(() => {
      void search();
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(debounceHandle);
    };
  }, [query, graphClient, provider, providerState, minChars, maxResults, loadInitialResults]);

  return { results, loading };
};
