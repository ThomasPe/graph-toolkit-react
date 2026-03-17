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

  const [results, setResults] = useState<PeopleSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < minChars) {
      setResults([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const search = async () => {
      setLoading(true);
      try {
        if (isPeopleSearchProvider(provider)) {
          const data = await provider.searchPeople(query, maxResults);
          if (!cancelled) {
            setResults(data);
          }
        } else if (providerState === 'SignedIn' && graphClient) {
          const response = await graphClient
            .api('/users')
            .header('ConsistencyLevel', 'eventual')
            .search(`"displayName:${query}" OR "mail:${query}" OR "userPrincipalName:${query}"`)
            .select(PEOPLE_SEARCH_SELECT_FIELDS)
            .top(maxResults)
            .get() as { value?: PeopleSearchResult[] };
          if (!cancelled) {
            setResults(response.value ?? []);
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
  }, [query, graphClient, provider, providerState, minChars, maxResults]);

  return { results, loading };
};
