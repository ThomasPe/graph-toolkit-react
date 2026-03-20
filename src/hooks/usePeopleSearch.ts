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

/**
 * Normalize a people search query before it is sent to a provider or Graph.
 *
 * The hook strips quotes used to protect the Graph `$search` expression and trims
 * surrounding whitespace so provider-backed and Graph-backed searches behave the same way.
 *
 * @param query - Raw query from the picker input
 * @returns A sanitized query suitable for search requests
 */
const normalizePeopleSearchQuery = (query: string): string => {
  return query.trim().replace(/"/g, '').trim();
};

/**
 * Hook to search for people by name, email, or UPN.
 *
 * When used with a {@link MockProvider} the search is performed locally against mock data.
 * With a real provider the hook queries the Microsoft Graph `/users` endpoint using
 * `$search` with `ConsistencyLevel: eventual`. When `loadInitialResults` is enabled and
 * the query is empty, it instead loads the first tenant directory users from `/users`.
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
    const normalizedQuery = normalizePeopleSearchQuery(query);
    const shouldLoadInitialResults = loadInitialResults && query.length === 0;

    if (!shouldLoadInitialResults && (!normalizedQuery || normalizedQuery.length < minChars)) {
      setResults([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const search = async () => {
      setLoading(true);
      try {
        if (isPeopleSearchProvider(provider)) {
          const data = await provider.searchPeople(
            shouldLoadInitialResults ? '' : normalizedQuery,
            maxResults
          );
          if (!cancelled) {
            setResults(data);
          }
        } else if (providerState === 'SignedIn' && graphClient) {
          let nextResults: PeopleSearchResult[];

          if (shouldLoadInitialResults) {
            const response = (await graphClient
              .api('/users')
              .select(PEOPLE_SEARCH_SELECT_FIELDS)
              .top(maxResults)
              .get()) as { value?: PeopleSearchResult[] };

            nextResults = response.value ?? [];
          } else {
            const response = (await graphClient
              .api('/users')
              .header('ConsistencyLevel', 'eventual')
              .search(`"displayName:${normalizedQuery}" OR "mail:${normalizedQuery}" OR "userPrincipalName:${normalizedQuery}"`)
              .select(PEOPLE_SEARCH_SELECT_FIELDS)
              .top(maxResults)
              .get()) as { value?: PeopleSearchResult[] };

            nextResults = response.value ?? [];
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

    if (shouldLoadInitialResults) {
      void search();

      return () => {
        cancelled = true;
      };
    }

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
