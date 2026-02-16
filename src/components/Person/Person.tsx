/**
 * Person component - Display a person using Fluent UI Persona
 */

import React from 'react';
import { Persona, PresenceBadgeStatus } from '@fluentui/react-components';
import { usePersonData } from '../../hooks/usePersonData';
import { getInitials } from '../../utils/graph';
import { PersonProps } from './Person.types';

/**
 * Map Graph presence to Fluent UI presence status
 */
const mapPresence = (availability?: string | null): PresenceBadgeStatus => {
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
    default:
      return 'offline';
  }
};

export const Person: React.FC<PersonProps> = ({
  userId,
  userPrincipalName,
  email,
  personDetails,
  view = 'oneline',
  showPresence = false,
  fetchImage = true,
  ...personaProps
}) => {
  // Fetch data if not provided directly
  const { user, presence: graphPresence, photoUrl, loading } = usePersonData({
    userId: personDetails ? undefined : userId || userPrincipalName || email,
    fetchPresence: showPresence,
    fetchPhoto: fetchImage,
  });

  // Use provided details or fetched user
  const person = personDetails || user;

  if (loading) {
    return (
      <Persona
        {...personaProps}
        name={personaProps.name ?? 'Loading...'}
      />
    );
  }

  if (!person) {
    return null;
  }

  const displayName = person.displayName || 'Unknown User';
  const initials = getInitials(displayName);

  const defaultSecondaryText =
    view !== 'avatar' && (view === 'twolines' || view === 'threelines' || view === 'fourlines')
      ? person.jobTitle ?? undefined
      : undefined;
  const defaultTertiaryText =
    view !== 'avatar' && (view === 'threelines' || view === 'fourlines')
      ? person.department ?? undefined
      : undefined;
  const defaultQuaternaryText =
    view !== 'avatar' && view === 'fourlines'
      ? person.officeLocation ?? person.mail ?? undefined
      : undefined;

  const defaultPresence = showPresence && graphPresence
    ? {
      status: mapPresence(graphPresence.availability as string | null),
    }
    : undefined;

  const resolvedPresence = personaProps.presence ?? defaultPresence;

  const resolvedAvatar = personaProps.avatar ?? {
    image: photoUrl ? { src: photoUrl } : undefined,
    initials: photoUrl ? undefined : initials,
  };

  const resolvedName = personaProps.name ?? displayName;

  const resolvedSecondaryText =
    personaProps.secondaryText ?? defaultSecondaryText;
  const resolvedTertiaryText =
    personaProps.tertiaryText ?? defaultTertiaryText;
  const resolvedQuaternaryText =
    personaProps.quaternaryText ?? defaultQuaternaryText;

  return (
    <Persona
      {...personaProps}
      name={resolvedName}
      avatar={resolvedAvatar}
      presence={resolvedPresence}
      secondaryText={resolvedSecondaryText}
      tertiaryText={resolvedTertiaryText}
      quaternaryText={resolvedQuaternaryText}
    />
  );
};
