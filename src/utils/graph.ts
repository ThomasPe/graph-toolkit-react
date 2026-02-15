/**
 * Graph utility functions
 */

import { Client } from '@microsoft/microsoft-graph-client';
import { IProvider } from '../providers/IProvider';

/**
 * Create a Graph client from a provider
 */
export const createGraphClient = (provider: IProvider): Client => {
  return Client.init({
    authProvider: async (done) => {
      try {
        const token = await provider.getAccessToken();
        done(null, token);
      } catch (error) {
        done(error as Error, null);
      }
    },
  });
};

/**
 * Extract initials from a display name
 */
export const getInitials = (displayName?: string): string => {
  if (!displayName) return '';

  const parts = displayName.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
