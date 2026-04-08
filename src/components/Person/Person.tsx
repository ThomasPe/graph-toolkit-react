/**
 * Person component - Display a person using Fluent UI Persona
 */

import React, { useEffect, useMemo } from 'react';
import { Persona, PresenceBadgeStatus, Skeleton, SkeletonItem } from '@fluentui/react-components';
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
const PRIMARY_LOADING_LINE_SIZE = 16;
const SECONDARY_LOADING_LINE_SIZE = 12;
/**
 * Widths are intentionally staggered to resemble typical person metadata lengths instead of
 * rendering every placeholder line at the same width. The numeric keys map directly to the
 * Persona text line numbers: 1 = primary, 2 = secondary, 3 = tertiary, 4 = quaternary.
 */
const LOADING_LINE_WIDTHS: Record<1 | 2 | 3 | 4, string> = {
  1: '8rem',
  2: '6rem',
  3: '5rem',
  4: '7rem',
};

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

/**
 * Render a single loading placeholder line for the Fluent UI Persona text slots.
 *
 * @param line - The logical Persona text line (1-4) being rendered.
 * @returns A Fluent UI skeleton sized to match the line's visual prominence.
 */
const renderLoadingLine = (line: 1 | 2 | 3 | 4): React.ReactElement => (
  <Skeleton>
    <SkeletonItem
      size={line === 1 ? PRIMARY_LOADING_LINE_SIZE : SECONDARY_LOADING_LINE_SIZE}
      style={{ width: LOADING_LINE_WIDTHS[line], maxWidth: '100%' }}
    />
  </Skeleton>
);

const getLineProperty = (view: PersonView, line: 1 | 2 | 3 | 4, override?: string): string | undefined =>
  override ?? DEFAULT_LINE_PROPERTIES[view][line - 1];

const getVisibleLineCount = (view: PersonView): 0 | 1 | 2 | 3 | 4 => {
  switch (view) {
    case 'avatar':
      return 0;
    case 'oneline':
      return 1;
    case 'twolines':
      return 2;
    case 'threelines':
      return 3;
    case 'fourlines':
    default:
      return 4;
  }
};

const isLineVisible = (view: PersonView, line: 1 | 2 | 3 | 4): boolean =>
  line <= getVisibleLineCount(view);

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
  onUpdated,
  ...personaProps
}) => {
  const isAvatarOnlyView = view === 'avatar';
  const resolvedLine1Property = isLineVisible(view, 1) ? getLineProperty(view, 1, line1Property) : undefined;
  const resolvedLine2Property = isLineVisible(view, 2) ? getLineProperty(view, 2, line2Property) : undefined;
  const resolvedLine3Property = isLineVisible(view, 3) ? getLineProperty(view, 3, line3Property) : undefined;
  const resolvedLine4Property = isLineVisible(view, 4) ? getLineProperty(view, 4, line4Property) : undefined;

  const usesPresenceLine = [resolvedLine1Property, resolvedLine2Property, resolvedLine3Property, resolvedLine4Property]
    .some(property => parsePropertyList(property).some(item => PRESENCE_PROPERTIES.has(item)));

  // Fetch data if not provided directly
  const { user, presence: graphPresence, photoUrl, loading, error } = usePersonData({
    userId: personDetails
      ? undefined
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
  const personRecord = person ? person as PersonDetails : null;
  const personWithPresence = useMemo<PersonDetails | null>(
    () => personRecord
      ? {
        ...personRecord,
        email: email ?? toDisplayText(personRecord.email),
        presenceActivity: graphPresence?.activity ?? toDisplayText(personRecord.presenceActivity),
        presenceAvailability: graphPresence?.availability ?? toDisplayText(personRecord.presenceAvailability),
      }
      : null,
    [email, graphPresence?.activity, graphPresence?.availability, personRecord]
  );

  useEffect(() => {
    if (!onUpdated || loading) {
      return;
    }

    if (personDetails && personWithPresence) {
      onUpdated({
        trigger: 'personDetailsChanged',
        person: personWithPresence,
        loading: false,
        error,
      });
      return;
    }

    if (error) {
      onUpdated({
        trigger: 'personLoadFailed',
        person: null,
        loading: false,
        error,
      });
      return;
    }

    if (personWithPresence) {
      onUpdated({
        trigger: 'personLoaded',
        person: personWithPresence,
        loading: false,
        error: null,
      });
    }
  }, [error, loading, onUpdated, personDetails, personWithPresence]);

  if (loading) {
    return (
      <Persona
        {...personaProps}
        name={undefined}
        primaryText={
          isAvatarOnlyView || !isLineVisible(view, 1)
            ? undefined
            : personaProps.primaryText ?? renderLoadingLine(1)
        }
        secondaryText={
          isAvatarOnlyView || !isLineVisible(view, 2)
            ? undefined
            : personaProps.secondaryText ?? renderLoadingLine(2)
        }
        tertiaryText={
          isAvatarOnlyView || !isLineVisible(view, 3)
            ? undefined
            : personaProps.tertiaryText ?? renderLoadingLine(3)
        }
        quaternaryText={
          isAvatarOnlyView || !isLineVisible(view, 4)
            ? undefined
            : personaProps.quaternaryText ?? renderLoadingLine(4)
        }
      />
    );
  }

  if (!person) {
    return null;
  }

  const resolvedPerson: PersonDetails = personWithPresence ?? personRecord!;
  const displayName = person.displayName || 'Unknown User';
  const initials = getInitials(displayName);

  const resolvedLine1Text = getTextFromProperty(resolvedPerson, resolvedLine1Property);
  const resolvedLine2Text = getTextFromProperty(resolvedPerson, resolvedLine2Property);
  const resolvedLine3Text = getTextFromProperty(resolvedPerson, resolvedLine3Property);
  const resolvedLine4Text = getTextFromProperty(resolvedPerson, resolvedLine4Property);

  const defaultPrimaryText =
    !isLineVisible(view, 1)
      ? undefined
      : resolvedLine1Property && resolvedLine1Text !== displayName
        ? renderLine(1, resolvedPerson, resolvedLine1Text, renderLine1)
        : renderLine1
          ? renderLine(1, resolvedPerson, resolvedLine1Text, renderLine1)
          : personaProps.primaryText;
  const defaultSecondaryText = isLineVisible(view, 2)
    ? renderLine(2, resolvedPerson, resolvedLine2Text, renderLine2)
    : undefined;
  const defaultTertiaryText = isLineVisible(view, 3)
    ? renderLine(3, resolvedPerson, resolvedLine3Text, renderLine3)
    : undefined;
  const defaultQuaternaryText = isLineVisible(view, 4)
    ? renderLine(4, resolvedPerson, resolvedLine4Text, renderLine4)
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
    name: displayName,
  };

  const resolvedName = isAvatarOnlyView ? undefined : personaProps.name ?? displayName;
  const resolvedPrimaryText = isAvatarOnlyView
    ? undefined
    : personaProps.primaryText ?? defaultPrimaryText;

  const resolvedSecondaryText =
    isAvatarOnlyView ? undefined : personaProps.secondaryText ?? defaultSecondaryText;
  const resolvedTertiaryText =
    isAvatarOnlyView ? undefined : personaProps.tertiaryText ?? defaultTertiaryText;
  const resolvedQuaternaryText =
    isAvatarOnlyView ? undefined : personaProps.quaternaryText ?? defaultQuaternaryText;

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
