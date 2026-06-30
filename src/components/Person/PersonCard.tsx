import React from 'react';
import { PersonDetails } from './Person.types';

/**
 * Props for the {@link PersonCard} component.
 */
export interface PersonCardProps {
  /**
   * Resolved person details displayed by the card.
   */
  person: PersonDetails;
  /**
   * Display name shown in the card header.
   */
  displayName: string;
  /**
   * Invoked when users press Escape while focused in the card.
   */
  onEscape?: () => void;
}

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

const getFirstBusinessPhone = (person: PersonDetails): string | undefined => {
  const businessPhones = person.businessPhones;

  if (!businessPhones || businessPhones.length === 0) {
    return undefined;
  }

  return toDisplayText(businessPhones[0]);
};

const toPhoneHref = (value: string): string => `tel:${value.replace(/\s+/g, '')}`;

export const PersonCard: React.FC<PersonCardProps> = ({ person, displayName, onEscape }) => {
  const resolvedPersonEmail = getEmailFromPerson(person);
  const resolvedMobilePhone = toDisplayText(person.mobilePhone);
  const resolvedBusinessPhone = getFirstBusinessPhone(person);
  const teamsChatRecipient = resolvedPersonEmail ? encodeURIComponent(resolvedPersonEmail) : undefined;
  const officeLocation = toDisplayText(person.officeLocation);
  const personCardSubtitle = [toDisplayText(person.jobTitle), toDisplayText(person.department)]
    .filter((item): item is string => Boolean(item))
    .join(' · ');

  return (
    <div
      style={{ minWidth: '18rem', maxWidth: '24rem', display: 'grid', gap: '0.5rem' }}
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
          onEscape?.();
        }
      }}
    >
      <div style={{ fontWeight: 600 }}>{displayName}</div>
      {personCardSubtitle ? <div style={{ opacity: 0.85 }}>{personCardSubtitle}</div> : null}
      {officeLocation ? <div>Office: {officeLocation}</div> : null}
      {resolvedPersonEmail ? <div>Email: {resolvedPersonEmail}</div> : null}
      {resolvedMobilePhone ? <div>Mobile: {resolvedMobilePhone}</div> : null}
      {resolvedBusinessPhone ? <div>Business Phone: {resolvedBusinessPhone}</div> : null}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
        {resolvedPersonEmail
          ? (
            <a href={`mailto:${resolvedPersonEmail}`} target="_self" rel="noreferrer">
              Email
            </a>
          )
          : null}
        {teamsChatRecipient
          ? (
            <a
              href={`https://teams.microsoft.com/l/chat/0/0?users=${teamsChatRecipient}`}
              target="_blank"
              rel="noreferrer"
            >
              Chat
            </a>
          )
          : null}
        {resolvedMobilePhone
          ? (
            <a href={toPhoneHref(resolvedMobilePhone)} target="_self" rel="noreferrer">
              Call
            </a>
          )
          : resolvedBusinessPhone
            ? (
              <a href={toPhoneHref(resolvedBusinessPhone)} target="_self" rel="noreferrer">
                Call
              </a>
            )
            : null}
      </div>
    </div>
  );
};
