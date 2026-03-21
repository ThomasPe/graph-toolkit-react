/**
 * Hook to fetch person data from Microsoft Graph
 */

import { useState, useEffect } from 'react';
import { User, Presence } from '@microsoft/microsoft-graph-types';
import { useGraphClient } from './useGraphClient';
import { usePersonCacheOptions, useProvider, useProviderState } from '../providers/ProviderContext';
import { isPersonDataProvider } from '../providers/IPersonDataProvider';
import { encodeGraphPathSegment, photoResponseToDataUrl } from '../utils/graph';
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
  selectFields?: string[];
}

const DEFAULT_USER_SELECT_FIELDS = [
  'id',
  'displayName',
  'jobTitle',
  'mail',
  'department',
  'officeLocation',
  'userPrincipalName',
];

/**
 * Fetch person data from Microsoft Graph
 */
export const usePersonData = (options: UsePersonDataOptions): PersonData => {
  const graphClient = useGraphClient();
  const provider = useProvider();
  const providerState = useProviderState();
  const personCacheOptions = usePersonCacheOptions();
  const { userId, userPrincipalName, fetchPresence = false, fetchPhoto = true, selectFields } = options;
  const resolvedSelectFields = [
    ...new Set([
      ...DEFAULT_USER_SELECT_FIELDS,
      ...(selectFields ?? [])
        .map((f) => f.trim())
        .filter((f) => f.length > 0 && /^[a-zA-Z0-9_./]+$/.test(f)),
    ]),
  ].join(',');
  const [data, setData] = useState<PersonData>({
    user: null,
    presence: null,
    photoUrl: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    const customSelectFields = resolvedSelectFields
      .split(',')
      .filter((f) => !DEFAULT_USER_SELECT_FIELDS.includes(f));

    const fetchData = async () => {
      const identifier = userId || userPrincipalName;

      if (isPersonDataProvider(provider)) {
        try {
          const providerData = await provider.getPersonData({
            identifier,
            fetchPresence,
            fetchPhoto,
            selectFields: customSelectFields.length > 0 ? customSelectFields : undefined,
          });

          if (!cancelled) {
            setData({
              user: providerData.user,
              presence: providerData.presence,
              photoUrl: providerData.photoUrl,
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

        let user: User | null = hasFreshUser ? (cached?.user ?? null) : null;

        if (!user) {
          user = (await graphClient
            .api(isCurrentUserQuery ? '/me' : `/users/${encodeGraphPathSegment(identifier)}`)
            .select(resolvedSelectFields)
            .get()) as User;
          didFetchUser = true;
        }

        if (cancelled) return;

        let presence: Presence | null = null;
        let photoUrl: string | null = null;

        if (fetchPresence) {
          if (hasFreshPresence) {
            presence = cached?.presence ?? null;
          } else if (user?.id) {
            try {
              presence = await graphClient
                .api(
                  isCurrentUserQuery
                    ? '/me/presence'
                    : `/users/${encodeGraphPathSegment(user.id)}/presence`
                )
                .get();
            } catch (err) {
              console.warn('Failed to fetch presence:', err);
            }
            didFetchPresence = true;
          }
        }

        if (fetchPhoto) {
          if (hasFreshPhoto) {
            photoUrl = cached?.photoUrl ?? null;
          } else if (user?.id) {
            try {
              const photoResponse = await graphClient
                .api(
                  isCurrentUserQuery
                    ? '/me/photo/$value'
                    : `/users/${encodeGraphPathSegment(user.id)}/photo/$value`
                )
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
  }, [graphClient, provider, providerState, userId, userPrincipalName, fetchPresence, fetchPhoto, personCacheOptions, resolvedSelectFields]);

  return data;
};
