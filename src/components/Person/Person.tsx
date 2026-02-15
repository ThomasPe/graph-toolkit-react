/**
 * Person component - Display a person using Fluent UI Persona
 */

import React from 'react';
import { Persona, PresenceBadgeStatus } from '@fluentui/react-components';
import { usePersonData } from '../../hooks/usePersonData';
import { getInitials } from '../../utils/graph';
import { PersonProps } from './Person.types';

/**
 * Map component size to Fluent UI Persona size
 */
const mapSize = (
  size?: string
): 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | 'huge' => {
  switch (size) {
    case 'small':
      return 'small';
    case 'large':
      return 'large';
    case 'extra-large':
      return 'extra-large';
    case 'medium':
    default:
      return 'medium';
  }
};

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
  avatarSize = 'medium',
  textAlignment,
  textPosition,
  numericSize,
  fetchImage = true,
  onClick,
  className,
  style,
}) => {
  // Fetch data if not provided directly
  const { user, presence, photoUrl, loading } = usePersonData({
    userId: personDetails ? undefined : userId || userPrincipalName || email,
    fetchPresence: showPresence,
    fetchPhoto: fetchImage,
  });

  // Use provided details or fetched user
  const person = personDetails || user;
  const size = (numericSize ?? mapSize(avatarSize)) as React.ComponentProps<typeof Persona>['size'];

  if (loading) {
    return (
      <Persona
        size={size}
        name="Loading..."
        textAlignment={textAlignment}
        textPosition={textPosition}
        className={className}
        style={style}
      />
    );
  }

  if (!person) {
    return null;
  }

  const displayName = person.displayName || 'Unknown User';
  const initials = getInitials(displayName);

  // Build persona props based on view
  const personaProps: React.ComponentProps<typeof Persona> = {
    size,
    name: displayName,
    textAlignment,
    textPosition,
    avatar: {
      image: photoUrl ? { src: photoUrl } : undefined,
      initials: photoUrl ? undefined : initials,
    },
    className,
    style,
  };

  if (showPresence && presence) {
    personaProps.presence = {
      status: mapPresence(presence.availability as string | null),
    };
  }

  // Only show secondary/tertiary text for non-avatar views
  if (view !== 'avatar') {
    if (view === 'twolines' || view === 'threelines') {
      personaProps.secondaryText = person.jobTitle ?? undefined;
    }

    if (view === 'threelines') {
      personaProps.tertiaryText = person.department ?? undefined;
    }
  }

  if (onClick) {
    personaProps.onClick = () => {
      if (user) {
        onClick(user);
      }
    };
  }

  return <Persona {...personaProps} />;
};
