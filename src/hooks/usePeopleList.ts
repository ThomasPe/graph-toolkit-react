/**
 * Hook to load a list of people from Microsoft Graph or a compatible provider
 */

import { useEffect, useMemo, useState } from 'react';
import type { Presence, User } from '@microsoft/microsoft-graph-types';
import { useGraphClient } from './useGraphClient';
import { useProvider, useProviderState } from '../providers/ProviderContext';
import {
  isPeopleSearchProvider,
  isPersonDataProvider,
} from '../providers/IPersonDataProvider';
import type {
  PeoplePerson,
  PeopleSortDirection,
  PeopleSortField,
} from '../components/People/People.types';
import { encodeGraphPathSegment, photoResponseToDataUrl } from '../utils/graph';

const DEFAULT_PEOPLE_SELECT_FIELDS = [
  'id',
  'displayName',
  'mail',
  'userPrincipalName',
  'jobTitle',
  'department',
] as const;
const DEFAULT_PEOPLE_SELECT_FIELD_SET = new Set<string>(DEFAULT_PEOPLE_SELECT_FIELDS);
const DEFAULT_MAX_PEOPLE = 10;
const VALID_SELECT_FIELD_PATTERN = /^[a-zA-Z0-9_./]+$/;
const DEFAULT_SORT_DIRECTION: PeopleSortDirection = 'asc';

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
   * Additional Graph user fields to request while resolving people.
   */
  selectFields?: string[];
  /**
   * Field used to sort the resolved people collection.
   */
  sortBy?: PeopleSortField;
  /**
   * Direction used when {@link sortBy} is provided.
   */
  sortDirection?: PeopleSortDirection;
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

const mapGraphUser = (user: User): PeoplePerson => ({
  id: user.id ?? user.userPrincipalName ?? user.mail ?? 'unknown-user',
  givenName: user.givenName ?? null,
  surname: user.surname ?? null,
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

/**
 * Resolve the best identifier for Graph-backed people where a stable Graph `id` is preferred.
 *
 * @param person - Person data originating from Graph or already enriched with a Graph ID
 * @returns A Graph identifier, preferring `id` over UPN/mail
 */
const resolveIdentifier = (person: Pick<PeoplePerson, 'id' | 'userPrincipalName' | 'mail'>): string | undefined =>
  person.id ?? person.userPrincipalName ?? person.mail ?? undefined;

/**
 * Resolve the best identifier for app-supplied direct people where `id` may be a local key.
 *
 * @param person - Directly supplied person data from application code
 * @returns A Graph-resolvable identifier, preferring UPN/mail before a local `id`
 */
const resolveDirectPersonIdentifier = (
  person: Pick<PeoplePerson, 'id' | 'userPrincipalName' | 'mail'>
): string | undefined =>
  person.userPrincipalName ?? person.mail ?? person.id ?? undefined;

const uniqueNonEmpty = (values?: string[]): string[] =>
  Array.from(new Set((values ?? []).map(value => value.trim()).filter(Boolean)));

const toSelectableFields = (fields?: string[]): string[] =>
  Array.from(
    new Set(
      (fields ?? [])
        .map(field => field.trim())
        .filter(field => field.length > 0 && VALID_SELECT_FIELD_PATTERN.test(field))
    )
  );

const buildSelectFields = (selectFields?: string[], sortBy?: PeopleSortField): string[] => {
  const resolvedFields = [...DEFAULT_PEOPLE_SELECT_FIELDS, ...toSelectableFields(selectFields)];

  if (sortBy === 'givenName' || sortBy === 'surname') {
    resolvedFields.push(sortBy);
  }

  return Array.from(new Set(resolvedFields));
};

const getProviderSelectFields = (selectFields: string[]): string[] | undefined => {
  const customFields = selectFields.filter(field => !DEFAULT_PEOPLE_SELECT_FIELD_SET.has(field));

  return customFields.length > 0 ? customFields : undefined;
};

const getSortValue = (person: PeoplePerson, sortBy: PeopleSortField): string => {
  const primary = person[sortBy];

  if (typeof primary === 'string' && primary.trim().length > 0) {
    return primary;
  }

  return person.displayName ?? person.mail ?? person.userPrincipalName ?? person.id;
};

const sortPeople = (
  people: PeoplePerson[],
  sortBy?: PeopleSortField,
  sortDirection: PeopleSortDirection = DEFAULT_SORT_DIRECTION,
): PeoplePerson[] => {
  if (!sortBy) {
    return people;
  }

  const collator = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true });
  const direction = sortDirection === 'desc' ? -1 : 1;

  return people
    .map((person, index) => ({ person, index }))
    .sort((left, right) => {
      const comparison = collator.compare(
        getSortValue(left.person, sortBy),
        getSortValue(right.person, sortBy)
      );

      if (comparison !== 0) {
        return comparison * direction;
      }

      return left.index - right.index;
    })
    .map(entry => entry.person);
};

/**
 * Hook to load a compact people list for the {@link People} component.
 *
 * Resolution order matches the component inputs:
 * 1. `people` (render directly)
 * 2. `userIds` (resolve each identifier)
 * 3. `groupId` (load direct group members)
 * 4. default tenant directory users (`/users`)
 *
 * @param options - Configuration for how people should be resolved
 * @returns The resolved people, loading state, and any list-level error
 */
export const usePeopleList = (options?: UsePeopleListOptions): UsePeopleListResult => {
  const graphClient = useGraphClient();
  const provider = useProvider();
  const providerState = useProviderState();
  const directPeopleKey = JSON.stringify(options?.people ?? null);
  const userIdsKey = JSON.stringify(uniqueNonEmpty(options?.userIds));
  const customSelectFieldsKey = JSON.stringify(
    toSelectableFields(options?.selectFields).filter(f => !DEFAULT_PEOPLE_SELECT_FIELD_SET.has(f))
  );
  const directPeople = useMemo<PeoplePerson[] | undefined>(() => {
    if (directPeopleKey === 'null') {
      return undefined;
    }

    return JSON.parse(directPeopleKey) as PeoplePerson[];
  }, [directPeopleKey]);
  const userIds = useMemo<string[]>(() => JSON.parse(userIdsKey) as string[], [userIdsKey]);
  const customSelectFields = useMemo<string[]>(
    () => JSON.parse(customSelectFieldsKey) as string[],
    [customSelectFieldsKey]
  );
  const selectFields = useMemo(
    () => buildSelectFields(customSelectFields, options?.sortBy),
    [customSelectFields, options?.sortBy]
  );
  const providerSelectFields = useMemo(() => getProviderSelectFields(selectFields), [selectFields]);
  const groupId = useMemo(() => options?.groupId?.trim(), [options?.groupId]);
  const maxPeople = options?.maxPeople ?? DEFAULT_MAX_PEOPLE;
  const showPresence = options?.showPresence ?? false;
  const sortBy = options?.sortBy;
  const sortDirection = options?.sortDirection ?? DEFAULT_SORT_DIRECTION;

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
          selectFields: providerSelectFields,
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
        .api(isCurrentUserQuery ? '/me' : `/users/${encodeGraphPathSegment(identifier)}`)
        .select(selectFields.join(','))
        .get()) as User;

      let presence: Presence | null = null;
      let photoUrl: string | null = null;

      if (showPresence && user.id) {
        try {
          presence = (await graphClient
            .api(
              isCurrentUserQuery
                ? '/me/presence'
                : `/users/${encodeGraphPathSegment(user.id)}/presence`
            )
            .get()) as Presence;
        } catch {
          presence = null;
        }
      }

      if (user.id) {
        try {
          const photoResponse = await graphClient
            .api(
              isCurrentUserQuery
                ? '/me/photo/$value'
                : `/users/${encodeGraphPathSegment(user.id)}/photo/$value`
            )
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

    const enrichResolvedPeople = async (
      people: PeoplePerson[],
      resolvePersonIdentifier = resolveIdentifier
    ): Promise<PeoplePerson[]> => {
      const enriched = await Promise.all(
        people.map(async person => {
          const identifier = resolvePersonIdentifier(person);

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
      if (!cancelled) {
        setState(previous => ({ ...previous, loading: true, error: null }));
      }

      if (directPeople) {
        const shouldEnrichResolvedPeople =
          showPresence || directPeople.some(person => !person.photoUrl);
        const nextPeople = shouldEnrichResolvedPeople
          ? await enrichResolvedPeople(directPeople, resolveDirectPersonIdentifier)
          : directPeople;
        if (!cancelled) {
          setState({ people: sortPeople(nextPeople, sortBy, sortDirection), loading: false, error: null });
        }
        return;
      }

      if (userIds.length > 0) {
        const results = await Promise.allSettled(userIds.map(identifier => loadPersonByIdentifier(identifier)));
        const nextPeople = results
          .flatMap(result => (result.status === 'fulfilled' && result.value ? [result.value] : []));

        if (!cancelled) {
          setState({ people: sortPeople(nextPeople, sortBy, sortDirection), loading: false, error: null });
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
              .api(`/groups/${encodeGraphPathSegment(groupId)}/members/microsoft.graph.user`)
              .select(selectFields.join(','))
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
            .api('/users')
            .select(selectFields.join(','))
            .top(maxPeople)
            .get()) as { value?: User[] };
          nextPeople = (response.value ?? []).map(mapGraphUser);
        }

        if (showPresence || nextPeople.some(person => !person.photoUrl)) {
          nextPeople = await enrichResolvedPeople(nextPeople);
        }

        if (!cancelled) {
          setState({ people: sortPeople(nextPeople, sortBy, sortDirection), loading: false, error: null });
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
  }, [
    directPeople,
    directPeopleKey,
    graphClient,
    groupId,
    maxPeople,
    provider,
    providerSelectFields,
    providerState,
    selectFields,
    showPresence,
    sortBy,
    sortDirection,
    userIds,
  ]);

  return state;
};
