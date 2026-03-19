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

interface GraphPeopleSuggestion {
  id?: string | null;
  displayName?: string | null;
  userPrincipalName?: string | null;
  scoredEmailAddresses?: Array<{
    address?: string | null;
  }> | null;
  jobTitle?: string | null;
  department?: string | null;
}

const mapGraphPeopleSuggestion = (person: GraphPeopleSuggestion): PeopleSearchResult => {
  const primaryEmail = person.scoredEmailAddresses?.[0]?.address ?? null;

  return {
    id: person.id ?? person.userPrincipalName ?? primaryEmail ?? person.displayName ?? 'unknown-person',
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
  query: string | null | undefined,
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
    const normalizedQuery = query ?? '';

    if (!normalizedQuery) {
      if (!loadInitialResults) {
        setResults([]);
        setLoading(false);
        return;
      }
    } else if (normalizedQuery.length < minChars) {
      setResults([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const search = async () => {
      setLoading(true);
      const sanitizedQuery = normalizedQuery.replace(/"/g, '');
      try {
        if (isPeopleSearchProvider(provider)) {
          const data = await provider.searchPeople(normalizedQuery, maxResults);
          if (!cancelled) {
            setResults(data);
          }
        } else if (providerState === 'SignedIn' && graphClient) {
          const response = sanitizedQuery
            ? await graphClient
                .api('/users')
                .header('ConsistencyLevel', 'eventual')
                .search(`"displayName:${sanitizedQuery}" OR "mail:${sanitizedQuery}" OR "userPrincipalName:${sanitizedQuery}"`)
                .select(PEOPLE_SEARCH_SELECT_FIELDS)
                .top(maxResults)
                .get() as { value?: PeopleSearchResult[] }
            : await graphClient
                .api('/me/people')
                .select(PEOPLE_SUGGESTIONS_SELECT_FIELDS)
                .top(maxResults)
                .get() as { value?: GraphPeopleSuggestion[] };
          if (!cancelled) {
            setResults(
              sanitizedQuery
                ? (response.value as PeopleSearchResult[] | undefined) ?? []
                : ((response.value as GraphPeopleSuggestion[] | undefined) ?? []).map(
                    mapGraphPeopleSuggestion
                  )
            );
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
