/**
 * People component - Display a compact group of people as overlapping avatars
 */

import React from 'react';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  PresenceBadgeStatus,
  Spinner,
} from '@fluentui/react-components';
import { usePeopleList } from '../../hooks/usePeopleList';
import { PeoplePerson, PeopleProps } from './People.types';

const DEFAULT_SHOW_MAX = 3;
const DEFAULT_FETCH_COUNT = 10;

const mapPresence = (availability?: string | null): PresenceBadgeStatus | undefined => {
  switch (availability?.toLowerCase()) {
    case 'available':
    case 'availableidle':
      return 'available';
    case 'away':
    case 'berightback':
      return 'away';
    case 'busy':
    case 'busyidle':
    case 'donotdisturb':
      return 'busy';
    case 'offline':
    case 'presenceunknown':
      return 'offline';
    default:
      return undefined;
  }
};

const getPersonLabel = (person: PeoplePerson): string =>
  person.displayName ?? person.mail ?? person.userPrincipalName ?? person.id;

const renderAvatarGroupItem = (person: PeoplePerson) => {
  const label = getPersonLabel(person);
  const presence = mapPresence(person.presenceAvailability);

  return (
    <AvatarGroupItem
      key={person.id}
      avatar={{
        name: label,
        image: person.photoUrl ? { src: person.photoUrl } : undefined,
        badge: presence ? { status: presence } : undefined,
        color: 'colorful',
      }}
    />
  );
};

/**
 * `People` renders a compact avatar strip similar to the MGT `mgt-people` control.
 *
 * The component can render a supplied list of people, resolve a list of `userIds`, load
 * group members, or default to tenant directory users from `/users`.
 *
 * @param props - Avatar group configuration and people-loading options
 * @returns A compact avatar group, a loading spinner, or `null` when no people are available
 */
export const People: React.FC<PeopleProps> = ({
  people,
  userIds,
  groupId,
  showMax = DEFAULT_SHOW_MAX,
  showPresence = false,
  layout = 'stack',
  size = 32,
  ...avatarGroupProps
}) => {
  const { people: resolvedPeople, loading } = usePeopleList({
    people,
    userIds,
    groupId,
    maxPeople: Math.max(DEFAULT_FETCH_COUNT, showMax + 5),
    showPresence,
  });

  if (loading) {
    return <Spinner size="tiny" />;
  }

  if (resolvedPeople.length === 0) {
    return null;
  }

  const clampedShowMax = Math.max(0, showMax);
  const visiblePeople = resolvedPeople.slice(0, clampedShowMax);
  const overflowPeople = resolvedPeople.slice(clampedShowMax);

  return (
    <AvatarGroup layout={layout} size={size} {...avatarGroupProps}>
      {visiblePeople.map(renderAvatarGroupItem)}
      {overflowPeople.length > 0 && (
        <AvatarGroupPopover count={overflowPeople.length}>
          {overflowPeople.map(renderAvatarGroupItem)}
        </AvatarGroupPopover>
      )}
    </AvatarGroup>
  );
};
