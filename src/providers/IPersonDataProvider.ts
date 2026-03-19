/**
 * Person data provider interface for fetching user information, presence, and photos,
 * and optionally searching for people.
 */

import { Presence, User } from '@microsoft/microsoft-graph-types';
import { IProvider } from './IProvider';

/**
 * Request parameters for fetching person data
 */
export interface ProviderPersonDataRequest {
  /**
   * User identifier (email, UPN, or user ID). If not provided, fetches data for the current user
   */
  identifier?: string;
  /**
   * Whether to fetch presence information
   */
  fetchPresence: boolean;
  /**
   * Whether to fetch profile photo
   */
  fetchPhoto: boolean;
  /**
   * Additional user profile fields to fetch beyond the default set.
   * Each entry must be a valid OData field name (letters, digits, underscores, dots, or slashes).
   * Empty strings and entries containing unsafe characters are ignored.
   */
  selectFields?: string[];
}

/**
 * Response data containing user information, presence, and photo
 */
export interface ProviderPersonDataResponse {
  /**
   * User profile data
   */
  user: User | null;
  /**
   * User presence information
   */
  presence: Presence | null;
  /**
   * URL to user's profile photo
   */
  photoUrl: string | null;
}

/**
 * Optional interface that providers can implement to support person data fetching
 */
export interface IPersonDataProvider {
  /**
   * Fetch user data including profile information, presence, and photo
   * @param request - Request parameters specifying what data to fetch
   * @returns Promise resolving to user data, presence, and photo URL
   */
  getPersonData(request: ProviderPersonDataRequest): Promise<ProviderPersonDataResponse>;
}

/**
 * Type guard to check if a provider implements the IPersonDataProvider interface
 * @param provider - The provider to check
 * @returns True if the provider implements IPersonDataProvider
 */
export const isPersonDataProvider = (
  provider: IProvider | null
): provider is IProvider & IPersonDataProvider => {
  return (
    typeof provider === 'object' &&
    provider !== null &&
    typeof (provider as Partial<IPersonDataProvider>).getPersonData === 'function'
  );
};

/**
 * Result item returned by a people search operation
 */
export interface PeopleSearchResult {
  /**
   * The unique identifier for the person
   */
  id: string;
  /**
   * The person's display name
   */
  displayName?: string | null;
  /**
   * The person's primary mail address
   */
  mail?: string | null;
  /**
   * The person's user principal name
   */
  userPrincipalName?: string | null;
  /**
   * The person's job title
   */
  jobTitle?: string | null;
  /**
   * The department the person belongs to
   */
  department?: string | null;
  /**
   * Optional profile photo URL for the person.
   * When provided, UI components can render the avatar image without fetching it separately.
   */
  photoUrl?: string | null;
}

/**
 * Optional interface that providers can implement to support people search
 */
export interface IPeopleSearchProvider {
  /**
   * Search for people matching the given query string
   * @param query - The search query (display name, email, or UPN fragment). An empty query may return initial suggestions.
   * @param maxResults - Maximum number of results to return (default: 10)
   * @returns Promise resolving to an array of matching people
   */
  searchPeople(query: string, maxResults?: number): Promise<PeopleSearchResult[]>;
}

/**
 * Type guard to check if a provider implements the IPeopleSearchProvider interface
 * @param provider - The provider to check
 * @returns True if the provider implements IPeopleSearchProvider
 */
export const isPeopleSearchProvider = (
  provider: IProvider | null
): provider is IProvider & IPeopleSearchProvider => {
  return (
    typeof provider === 'object' &&
    provider !== null &&
    typeof (provider as Partial<IPeopleSearchProvider>).searchPeople === 'function'
  );
};
