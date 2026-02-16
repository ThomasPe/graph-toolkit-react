/**
 * Hook to fetch person data from Microsoft Graph
 */

import { useState, useEffect } from 'react';
import { User, Presence } from '@microsoft/microsoft-graph-types';
import { useGraphClient } from './useGraphClient';
import { usePersonCacheOptions, useProvider, useProviderState } from '../providers/ProviderContext';
import { MockProvider } from '../providers/MockProvider';
import {
  getPersonCacheKey,
  isTimestampFresh,
  PersonCacheEntry,
  readPersonCache,
  writePersonCache,
} from '../utils/personCache';

export interface PersonData {
  user: User | null;
  presence: Presence | null;
  photoUrl: string | null;
  loading: boolean;
  error: Error | null;
}

export interface UsePersonDataOptions {
  userId?: string;
  userPrincipalName?: string;
  fetchPresence?: boolean;
  fetchPhoto?: boolean;
}

const photoResponseToDataUrl = async (photoResponse: unknown): Promise<string | null> => {
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

/**
 * Fetch person data from Microsoft Graph
 */
export const usePersonData = (options: UsePersonDataOptions): PersonData => {
  const graphClient = useGraphClient();
  const provider = useProvider();
  const providerState = useProviderState();
  const personCacheOptions = usePersonCacheOptions();
  const { userId, userPrincipalName, fetchPresence = false, fetchPhoto = true } = options;
  const [data, setData] = useState<PersonData>({
    user: null,
    presence: null,
    photoUrl: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      if (provider instanceof MockProvider) {
        // Return static mock data without calling Graph
        const mockUser: User = {
          id: '00000000-0000-0000-0000-000000000000',
          displayName: 'Adele Vance',
          userPrincipalName: 'adelev@contoso.com',
          jobTitle: 'Product Manager',
          department: 'Marketing',
          officeLocation: '19/3106',
          mail: 'adelev@contoso.com',
        } as User;
        const mockPresence: Presence = {
          availability: 'Available',
          activity: 'Available',
          id: mockUser.id!,
          odataType: '#microsoft.graph.presence',
        } as unknown as Presence;
        const sampleAvatarUrl =
          'https://ui-avatars.com/api/?name=Adele+Vance&background=0D8ABC&color=ffffff';

        if (!cancelled) {
          setData({
            user: mockUser,
            presence: fetchPresence ? mockPresence : null,
            photoUrl: fetchPhoto ? sampleAvatarUrl : null,
            loading: false,
            error: null,
          });
        }
        return;
      }

      if (providerState !== 'SignedIn') {
        if (!cancelled) {
          setData({
            user: null,
            presence: null,
            photoUrl: null,
            loading: false,
            error: providerState === 'SignedOut' ? null : new Error('Provider not signed in'),
          });
        }
        return;
      }

      if (!graphClient) {
        if (!cancelled) {
          setData((prev) => ({ ...prev, loading: true }));
        }
        return;
      }

      const identifier = userId || userPrincipalName;
      if (!identifier) {
        if (!cancelled) {
          setData({
            user: null,
            presence: null,
            photoUrl: null,
            loading: false,
            error: null,
          });
        }
        return;
      }

      const cacheKey = getPersonCacheKey(identifier);
      const cached = personCacheOptions.enabled ? await readPersonCache(cacheKey) : null;
      const hasFreshUser = Boolean(
        cached?.user && isTimestampFresh(cached.userCachedAt, personCacheOptions.userTtlMs)
      );
      const hasFreshPresence = Boolean(
        cached?.presenceCachedAt &&
        isTimestampFresh(cached.presenceCachedAt, personCacheOptions.presenceTtlMs)
      );
      const hasFreshPhoto = Boolean(
        cached?.photoCachedAt &&
        isTimestampFresh(cached.photoCachedAt, personCacheOptions.photoTtlMs)
      );

      if (hasFreshUser && (!fetchPresence || hasFreshPresence) && (!fetchPhoto || hasFreshPhoto)) {
        if (!cancelled) {
          setData({
            user: cached?.user ?? null,
            presence: fetchPresence ? (cached?.presence ?? null) : null,
            photoUrl: fetchPhoto ? (cached?.photoUrl ?? null) : null,
            loading: false,
            error: null,
          });
        }
        return;
      }

      try {
        setData((prev) => ({ ...prev, loading: true, error: null }));

        const isCurrentUserQuery = identifier.toLowerCase() === 'me';
        const now = Date.now();
        let didFetchUser = false;
        let didFetchPresence = false;
        let didFetchPhoto = false;

        // Fetch user (`/me` works with User.Read; `/users/{id}` may require broader scopes)
        let user: User | null = hasFreshUser ? (cached?.user ?? null) : null;

        if (!user) {
          user = (await graphClient
            .api(isCurrentUserQuery ? '/me' : `/users/${identifier}`)
            .select('id,displayName,jobTitle,mail,department,officeLocation,userPrincipalName')
            .get()) as User;
          didFetchUser = true;
        }

        if (cancelled) return;

        let presence: Presence | null = null;
        let photoUrl: string | null = null;

        // Fetch presence if requested
        if (fetchPresence) {
          if (hasFreshPresence) {
            presence = cached?.presence ?? null;
          } else if (user?.id) {
            try {
              presence = await graphClient
                .api(isCurrentUserQuery ? '/me/presence' : `/users/${user.id}/presence`)
                .get();
            } catch (err) {
              console.warn('Failed to fetch presence:', err);
            }
            didFetchPresence = true;
          }
        }

        // Fetch photo if requested
        if (fetchPhoto) {
          if (hasFreshPhoto) {
            photoUrl = cached?.photoUrl ?? null;
          } else if (user?.id) {
            try {
              const photoResponse = await graphClient
                .api(isCurrentUserQuery ? '/me/photo/$value' : `/users/${user.id}/photo/$value`)
                .get();
              photoUrl = await photoResponseToDataUrl(photoResponse);
            } catch (err) {
              console.warn('Failed to fetch photo:', err);
            }
            didFetchPhoto = true;
          }
        }

        const updatedCache: PersonCacheEntry = {
          ...(cached ?? {}),
        };

        if (didFetchUser && user) {
          updatedCache.user = user;
          updatedCache.userCachedAt = now;
        }

        if (fetchPresence && (didFetchPresence || hasFreshPresence)) {
          updatedCache.presence = didFetchPresence ? presence : cached?.presence;
          updatedCache.presenceCachedAt = didFetchPresence ? now : cached?.presenceCachedAt;
        }

        if (fetchPhoto && (didFetchPhoto || hasFreshPhoto)) {
          updatedCache.photoUrl = didFetchPhoto ? photoUrl : cached?.photoUrl;
          updatedCache.photoCachedAt = didFetchPhoto ? now : cached?.photoCachedAt;
        }

        if (
          personCacheOptions.enabled &&
          (didFetchUser || didFetchPresence || didFetchPhoto) &&
          updatedCache.user
        ) {
          await writePersonCache(cacheKey, updatedCache);
        }

        if (!cancelled) {
          setData({
            user,
            presence,
            photoUrl,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setData({
            user: null,
            presence: null,
            photoUrl: null,
            loading: false,
            error: error as Error,
          });
        }
      }
    };

    void fetchData();

    return () => {
      cancelled = true;
    };
  }, [
    graphClient,
    provider,
    providerState,
    userId,
    userPrincipalName,
    fetchPresence,
    fetchPhoto,
    personCacheOptions,
  ]);

  return data;
};
