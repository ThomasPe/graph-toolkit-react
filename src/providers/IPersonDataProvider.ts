/**
 * Person data provider interface for fetching user information, presence, and photos
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
