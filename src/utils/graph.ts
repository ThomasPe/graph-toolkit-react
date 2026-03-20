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

/**
 * Convert a Microsoft Graph photo response into a data URL string when possible.
 *
 * The Graph SDK may return a string, `Blob`, or `ArrayBuffer` depending on the
 * environment and request adapter. Unsupported response shapes resolve to `null`.
 *
 * @param photoResponse - Raw response returned from the Graph photo endpoint
 * @returns A data URL string or `null` when the response cannot be converted
 */
export const photoResponseToDataUrl = async (photoResponse: unknown): Promise<string | null> => {
  if (!photoResponse) {
    return null;
  }

  if (typeof photoResponse === 'string') {
    return photoResponse;
  }

  const blob =
    photoResponse instanceof Blob
      ? photoResponse
      : photoResponse instanceof ArrayBuffer
        ? new Blob([photoResponse])
        : null;

  if (!blob) {
    return null;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : null);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
};
