/**
 * Hook to fetch person data from Microsoft Graph
 */

import { useState, useEffect } from 'react';
import { User, Presence } from '@microsoft/microsoft-graph-types';
import { useGraphClient } from './useGraphClient';
import { useProvider, useProviderState } from '../providers/ProviderContext';
import { MockProvider } from '../providers/MockProvider';

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

/**
 * Fetch person data from Microsoft Graph
 */
export const usePersonData = (options: UsePersonDataOptions): PersonData => {
  const graphClient = useGraphClient();
  const provider = useProvider();
  const providerState = useProviderState();
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

      try {
        setData((prev) => ({ ...prev, loading: true, error: null }));

        const isCurrentUserQuery = identifier.toLowerCase() === 'me';

        // Fetch user (`/me` works with User.Read; `/users/{id}` may require broader scopes)
        const user = await graphClient
          .api(isCurrentUserQuery ? '/me' : `/users/${identifier}`)
          .select('id,displayName,jobTitle,mail,department,officeLocation,userPrincipalName')
          .get();

        if (cancelled) return;

        let presence: Presence | null = null;
        let photoUrl: string | null = null;

        // Fetch presence if requested
        if (fetchPresence && user.id) {
          try {
            presence = await graphClient
              .api(isCurrentUserQuery ? '/me/presence' : `/users/${user.id}/presence`)
              .get();
          } catch (err) {
            console.warn('Failed to fetch presence:', err);
          }
        }

        // Fetch photo if requested
        if (fetchPhoto && user.id) {
          try {
            const photoBlob = await graphClient
              .api(isCurrentUserQuery ? '/me/photo/$value' : `/users/${user.id}/photo/$value`)
              .get();
            photoUrl = URL.createObjectURL(photoBlob);
          } catch (err) {
            console.warn('Failed to fetch photo:', err);
          }
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
  ]);

  return data;
};
