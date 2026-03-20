/**
 * Hook to load a list of people from Microsoft Graph or a compatible provider
 */

import { useEffect, useState } from 'react';
import type { Presence, User } from '@microsoft/microsoft-graph-types';
import { useGraphClient } from './useGraphClient';
import { useProvider, useProviderState } from '../providers/ProviderContext';
import {
  isPeopleSearchProvider,
  isPersonDataProvider,
} from '../providers/IPersonDataProvider';
import type { PeoplePerson } from '../components/People/People.types';

const PEOPLE_SELECT_FIELDS = 'id,displayName,mail,userPrincipalName,jobTitle,department';
const GROUP_MEMBERS_SELECT_FIELDS = 'id,displayName,mail,userPrincipalName,jobTitle,department';
const DEFAULT_MAX_PEOPLE = 10;

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
 * Suggestion item returned by the Microsoft Graph `/me/people` endpoint.
 */
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

/**
 * Options for the {@link usePeopleList} hook.
 */
export interface UsePeopleListOptions {
  /**
   * Pre-resolved people to render directly.
   */
  people?: PeoplePerson[];
  /**
   * User identifiers to resolve into person entries.
   */
  userIds?: string[];
  /**
   * Group ID whose direct members should be loaded.
   */
  groupId?: string;
  /**
   * Maximum number of people to load for Graph-backed list queries.
   *
   * Ignored when {@link userIds} or direct {@link people} are provided.
   */
  maxPeople?: number;
  /**
   * Whether presence information should be loaded when supported.
   */
  showPresence?: boolean;
}

/**
 * Result returned by the {@link usePeopleList} hook.
 */
export interface UsePeopleListResult {
  /**
   * The resolved list of people.
   */
  people: PeoplePerson[];
  /**
   * Whether loading is currently in progress.
   */
  loading: boolean;
  /**
   * The most recent list-loading error, if any.
   */
  error: Error | null;
}

const mapGraphPeopleSuggestion = (person: GraphPeopleSuggestion): PeoplePerson => ({
  id:
    person.id ??
    person.userPrincipalName ??
    person.scoredEmailAddresses?.[0]?.address ??
    person.displayName ??
    'unknown-person',
  displayName: person.displayName ?? null,
  mail: person.scoredEmailAddresses?.[0]?.address ?? null,
  userPrincipalName: person.userPrincipalName ?? null,
  jobTitle: person.jobTitle ?? null,
  department: person.department ?? null,
});

const mapGraphUser = (user: User): PeoplePerson => ({
  id: user.id ?? user.userPrincipalName ?? user.mail ?? 'unknown-user',
  displayName: user.displayName ?? null,
  mail: user.mail ?? null,
  userPrincipalName: user.userPrincipalName ?? null,
  jobTitle: user.jobTitle ?? null,
  department: user.department ?? null,
});

const mergePresence = (person: PeoplePerson, presence: Presence | null): PeoplePerson => ({
  ...person,
  presenceActivity: presence?.activity ?? null,
  presenceAvailability: presence?.availability ?? null,
});

const resolveIdentifier = (person: Pick<PeoplePerson, 'id' | 'userPrincipalName' | 'mail'>): string | undefined =>
  person.id ?? person.userPrincipalName ?? person.mail ?? undefined;

const uniqueNonEmpty = (values?: string[]): string[] =>
  Array.from(new Set((values ?? []).map(value => value.trim()).filter(Boolean)));

/**
 * Hook to load a compact people list for the {@link People} component.
 *
 * Resolution order matches the component inputs:
 * 1. `people` (render directly)
 * 2. `userIds` (resolve each identifier)
 * 3. `groupId` (load direct group members)
 * 4. default current-user people suggestions (`/me/people`)
 *
 * @param options - Configuration for how people should be resolved
 * @returns The resolved people, loading state, and any list-level error
 */
export const usePeopleList = (options?: UsePeopleListOptions): UsePeopleListResult => {
  const graphClient = useGraphClient();
  const provider = useProvider();
  const providerState = useProviderState();
  const userIds = uniqueNonEmpty(options?.userIds);
  const groupId = options?.groupId?.trim();
  const maxPeople = options?.maxPeople ?? DEFAULT_MAX_PEOPLE;
  const showPresence = options?.showPresence ?? false;

  const [state, setState] = useState<UsePeopleListResult>({
    people: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const loadPersonByIdentifier = async (identifier: string): Promise<PeoplePerson | null> => {
      if (isPersonDataProvider(provider)) {
        const response = await provider.getPersonData({
          identifier,
          fetchPresence: showPresence,
          fetchPhoto: true,
        });

        if (!response.user) {
          return null;
        }

        return {
          ...mapGraphUser(response.user),
          photoUrl: response.photoUrl,
          presenceActivity: response.presence?.activity ?? null,
          presenceAvailability: response.presence?.availability ?? null,
        };
      }

      if (providerState !== 'SignedIn' || !graphClient) {
        return null;
      }

      const isCurrentUserQuery = identifier.toLowerCase() === 'me';
      const user = (await graphClient
        .api(isCurrentUserQuery ? '/me' : `/users/${identifier}`)
        .select(PEOPLE_SELECT_FIELDS)
        .get()) as User;

      let presence: Presence | null = null;
      let photoUrl: string | null = null;

      if (showPresence && user.id) {
        try {
          presence = (await graphClient
            .api(isCurrentUserQuery ? '/me/presence' : `/users/${user.id}/presence`)
            .get()) as Presence;
        } catch {
          presence = null;
        }
      }

      if (user.id) {
        try {
          const photoResponse = await graphClient
            .api(isCurrentUserQuery ? '/me/photo/$value' : `/users/${user.id}/photo/$value`)
            .get();
          photoUrl = await photoResponseToDataUrl(photoResponse);
        } catch {
          photoUrl = null;
        }
      }

      return {
        ...mapGraphUser(user),
        photoUrl,
        presenceActivity: presence?.activity ?? null,
        presenceAvailability: presence?.availability ?? null,
      };
    };

    const enrichResolvedPeople = async (people: PeoplePerson[]): Promise<PeoplePerson[]> => {
      const enriched = await Promise.all(
        people.map(async person => {
          const identifier = resolveIdentifier(person);

          if (!identifier) {
            return showPresence ? mergePresence(person, null) : person;
          }

          const shouldFetchPresence = showPresence && !person.presenceAvailability && !person.presenceActivity;
          const shouldFetchPhoto = !person.photoUrl;

          if (!shouldFetchPresence && !shouldFetchPhoto) {
            return person;
          }

          try {
            const loaded = await loadPersonByIdentifier(identifier);
            if (!loaded) {
              return person;
            }

            return {
              ...person,
              photoUrl: person.photoUrl ?? loaded.photoUrl,
              presenceActivity: person.presenceActivity ?? loaded.presenceActivity,
              presenceAvailability: person.presenceAvailability ?? loaded.presenceAvailability,
            };
          } catch {
            return person;
          }
        })
      );

      return enriched.filter((person): person is PeoplePerson => Boolean(person.id));
    };

    const load = async () => {
      if (options?.people) {
        const nextPeople = showPresence ? await enrichResolvedPeople(options.people) : options.people;
        if (!cancelled) {
          setState({ people: nextPeople, loading: false, error: null });
        }
        return;
      }

      if (userIds.length > 0) {
        const results = await Promise.allSettled(userIds.map(identifier => loadPersonByIdentifier(identifier)));
        const nextPeople = results
          .flatMap(result => (result.status === 'fulfilled' && result.value ? [result.value] : []));

        if (!cancelled) {
          setState({ people: nextPeople, loading: false, error: null });
        }
        return;
      }

      if (!isPeopleSearchProvider(provider) && providerState !== 'SignedIn') {
        if (!cancelled) {
          setState({ people: [], loading: false, error: null });
        }
        return;
      }

      try {
        let nextPeople: PeoplePerson[] = [];

        if (groupId) {
          if (graphClient && providerState === 'SignedIn') {
            const response = (await graphClient
              .api(`/groups/${groupId}/members/microsoft.graph.user`)
              .select(GROUP_MEMBERS_SELECT_FIELDS)
              .top(maxPeople)
              .get()) as { value?: User[] };
            nextPeople = (response.value ?? []).map(mapGraphUser);
          }
        } else if (isPeopleSearchProvider(provider)) {
          nextPeople = (await provider.searchPeople('', maxPeople)).map(person => ({
            ...person,
            presenceActivity: null,
            presenceAvailability: null,
          }));
        } else if (graphClient && providerState === 'SignedIn') {
          const response = (await graphClient
            .api('/me/people')
            .select('id,displayName,scoredEmailAddresses,userPrincipalName,jobTitle,department')
            .top(maxPeople)
            .get()) as { value?: GraphPeopleSuggestion[] };
          nextPeople = (response.value ?? []).map(mapGraphPeopleSuggestion);
        }

        if (showPresence || nextPeople.some(person => !person.photoUrl)) {
          nextPeople = await enrichResolvedPeople(nextPeople);
        }

        if (!cancelled) {
          setState({ people: nextPeople, loading: false, error: null });
        }
      } catch (error) {
        if (!cancelled) {
          setState({ people: [], loading: false, error: error as Error });
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [graphClient, groupId, maxPeople, options?.people, provider, providerState, showPresence, userIds]);

  return state;
};
