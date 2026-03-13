/**
 * Person component - Display a person using Fluent UI Persona
 */

import React from 'react';
import { Persona, PresenceBadgeStatus } from '@fluentui/react-components';
import { usePersonData } from '../../hooks/usePersonData';
import { getInitials } from '../../utils/graph';
import { PersonDetails, PersonLineRenderContext, PersonLineRenderer, PersonProps, PersonView } from './Person.types';

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

const DEFAULT_LINE_PROPERTIES: Record<PersonView, [string | undefined, string | undefined, string | undefined, string | undefined]> = {
  avatar: [undefined, undefined, undefined, undefined],
  oneline: ['displayName', undefined, undefined, undefined],
  twolines: ['displayName', 'jobTitle', undefined, undefined],
  threelines: ['displayName', 'jobTitle', 'department', undefined],
  fourlines: ['displayName', 'jobTitle', 'department', 'officeLocation,mail'],
};

const PRESENCE_PROPERTIES = new Set(['presenceActivity', 'presenceAvailability']);
const USER_SELECT_EXCLUSIONS = new Set(['email', ...PRESENCE_PROPERTIES]);

const parsePropertyList = (value?: string): string[] =>
  value
    ?.split(',')
    .map(property => property.trim())
    .filter(Boolean) ?? [];

const toDisplayText = (value: unknown): string | undefined => {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === 'string') {
    return value || undefined;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (Array.isArray(value)) {
    const items = value.map(item => toDisplayText(item)).filter((item): item is string => Boolean(item));
    return items.length > 0 ? items.join(', ') : undefined;
  }

  return undefined;
};

const getEmailFromPerson = (person: PersonDetails): string | undefined =>
  toDisplayText(person.mail) ?? toDisplayText(person.email) ?? toDisplayText(person.userPrincipalName);

const getTextFromProperty = (person: PersonDetails, property?: string): string | undefined => {
  const properties = parsePropertyList(property);

  for (const currentProperty of properties) {
    switch (currentProperty) {
      case 'mail':
      case 'email': {
        const email = getEmailFromPerson(person);
        if (email) {
          return email;
        }
        break;
      }
      default: {
        const text = toDisplayText(person[currentProperty]);
        if (text) {
          return text;
        }
      }
    }
  }

  return undefined;
};

const buildLineContext = (
  line: 1 | 2 | 3 | 4,
  person: PersonDetails,
  text?: string,
): PersonLineRenderContext => ({ line, person, text });

type PersonLineSlotValue = ReturnType<PersonLineRenderer> | string | undefined;

const renderLine = (
  line: 1 | 2 | 3 | 4,
  person: PersonDetails,
  text: string | undefined,
  renderer?: PersonLineRenderer,
): PersonLineSlotValue => {
  if (!renderer) {
    return text;
  }

  return renderer(buildLineContext(line, person, text));
};

const getLineProperty = (view: PersonView, line: 1 | 2 | 3 | 4, override?: string): string | undefined =>
  override ?? DEFAULT_LINE_PROPERTIES[view][line - 1];

const getSelectFields = (properties: Array<string | undefined>): string[] =>
  [...new Set(properties.flatMap(property => parsePropertyList(property)))]
    .filter(property => !USER_SELECT_EXCLUSIONS.has(property));

export const Person: React.FC<PersonProps> = ({
  userId,
  userPrincipalName,
  email,
  personDetails,
  view = 'oneline',
  showPresence = false,
  line1Property,
  line2Property,
  line3Property,
  line4Property,
  renderLine1,
  renderLine2,
  renderLine3,
  renderLine4,
  fetchImage = true,
  ...personaProps
}) => {
  const resolvedLine1Property = view === 'avatar' ? undefined : getLineProperty(view, 1, line1Property);
  const resolvedLine2Property = view === 'avatar' ? undefined : getLineProperty(view, 2, line2Property);
  const resolvedLine3Property = view === 'threelines' || view === 'fourlines'
    ? getLineProperty(view, 3, line3Property)
    : undefined;
  const resolvedLine4Property = view === 'fourlines'
    ? getLineProperty(view, 4, line4Property)
    : undefined;

  const usesPresenceLine = [resolvedLine1Property, resolvedLine2Property, resolvedLine3Property, resolvedLine4Property]
    .some(property => parsePropertyList(property).some(item => PRESENCE_PROPERTIES.has(item)));

  // Fetch data if not provided directly
  const { user, presence: graphPresence, photoUrl, loading } = usePersonData({
    userId: personDetails
      ? (personDetails.id ?? personDetails.userPrincipalName ?? personDetails.email)
      : userId || userPrincipalName || email,
    fetchPresence: showPresence || usesPresenceLine,
    fetchPhoto: fetchImage,
    selectFields: getSelectFields([
      resolvedLine1Property,
      resolvedLine2Property,
      resolvedLine3Property,
      resolvedLine4Property,
    ]),
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
  const personRecord = person as PersonDetails;
  const personWithPresence: PersonDetails = {
    ...personRecord,
    email: email ?? toDisplayText(personRecord.email),
    presenceActivity: graphPresence?.activity ?? toDisplayText(personRecord.presenceActivity),
    presenceAvailability: graphPresence?.availability ?? toDisplayText(personRecord.presenceAvailability),
  };

  const resolvedLine1Text = getTextFromProperty(personWithPresence, resolvedLine1Property);
  const resolvedLine2Text = getTextFromProperty(personWithPresence, resolvedLine2Property);
  const resolvedLine3Text = getTextFromProperty(personWithPresence, resolvedLine3Property);
  const resolvedLine4Text = getTextFromProperty(personWithPresence, resolvedLine4Property);

  const defaultPrimaryText =
    resolvedLine1Property && resolvedLine1Text !== displayName
      ? renderLine(1, personWithPresence, resolvedLine1Text, renderLine1)
      : renderLine1
        ? renderLine(1, personWithPresence, resolvedLine1Text, renderLine1)
        : personaProps.primaryText;
  const defaultSecondaryText = renderLine(2, personWithPresence, resolvedLine2Text, renderLine2);
  const defaultTertiaryText = renderLine(3, personWithPresence, resolvedLine3Text, renderLine3);
  const defaultQuaternaryText = renderLine(4, personWithPresence, resolvedLine4Text, renderLine4);

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
  const resolvedPrimaryText = personaProps.primaryText ?? defaultPrimaryText;

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
      primaryText={resolvedPrimaryText}
      avatar={resolvedAvatar}
      presence={resolvedPresence}
      secondaryText={resolvedSecondaryText}
      tertiaryText={resolvedTertiaryText}
      quaternaryText={resolvedQuaternaryText}
    />
  );
};
