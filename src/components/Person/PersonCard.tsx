import React from 'react';
import { Avatar, Button, Card, Divider, Text, tokens } from '@fluentui/react-components';
import {
  Chat24Regular,
  CheckmarkCircle16Filled,
  Location24Regular,
  Mail24Regular,
  Phone24Regular,
} from '@fluentui/react-icons';
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

const renderActionButton = (
  label: string,
  icon: React.ReactElement,
  href: string,
): React.ReactElement => {
  return <Button appearance="subtle" icon={icon} aria-label={label} as="a" href={href} />;
};

export const PersonCard: React.FC<PersonCardProps> = ({ person, displayName, onEscape }) => {
  const resolvedPersonEmail = getEmailFromPerson(person);
  const resolvedMobilePhone = toDisplayText(person.mobilePhone);
  const resolvedBusinessPhone = getFirstBusinessPhone(person);
  const teamsChatRecipient = resolvedPersonEmail ? encodeURIComponent(resolvedPersonEmail) : undefined;
  const officeLocation = toDisplayText(person.officeLocation);
  const presenceAvailability = toDisplayText(person.presenceAvailability);
  const presenceActivity = toDisplayText(person.presenceActivity);
  const personCardSubtitle = [toDisplayText(person.jobTitle), toDisplayText(person.department)]
    .filter((item): item is string => Boolean(item))
    .join(' · ');
  const callHref = resolvedMobilePhone
    ? toPhoneHref(resolvedMobilePhone)
    : resolvedBusinessPhone
      ? toPhoneHref(resolvedBusinessPhone)
      : undefined;

  return (
    <Card
      appearance="filled-alternative"
      style={{
        width: '24rem',
        maxWidth: 'calc(100vw - 2rem)',
        padding: 0,
        gap: 0,
        overflow: 'hidden',
        boxShadow: tokens.shadow16,
      }}
      tabIndex={0}
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
          onEscape?.();
        }
      }}
    >
      <div style={{ padding: '24px 28px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{ position: 'relative', flex: '0 0 auto' }}>
            <Avatar
              image={person.photoUrl ? { src: person.photoUrl } : undefined}
              name={displayName}
              size={72}
              color="colorful"
            />
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: 1,
                bottom: 1,
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: '#13a10e',
                border: '3px solid white',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <Text weight="semibold" size={400} title={displayName}>
                {displayName}
              </Text>
            </div>
            {personCardSubtitle
              ? (
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <Text size={300} title={personCardSubtitle} style={{ color: tokens.colorNeutralForeground3 }}>
                    {personCardSubtitle}
                  </Text>
                </div>
              )
              : null}
          </div>
        </div>
        {resolvedPersonEmail || callHref
          ? (
            <div style={{ display: 'flex', gap: 16, marginTop: 18 }}>
              {teamsChatRecipient
                ? renderActionButton('Chat', <Chat24Regular />, `https://teams.microsoft.com/l/chat/0/0?users=${teamsChatRecipient}`)
                : null}
              {callHref ? renderActionButton('Call', <Phone24Regular />, callHref) : null}
              {resolvedPersonEmail ? renderActionButton('Email', <Mail24Regular />, `mailto:${resolvedPersonEmail}`) : null}
            </div>
          )
          : null}
      </div>
      {presenceAvailability || presenceActivity
        ? (
          <div style={{ padding: '0 16px 16px' }}>
            <div
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
                padding: '12px 14px',
                border: `1px solid ${tokens.colorNeutralStroke2}`,
                borderRadius: tokens.borderRadiusMedium,
                background: tokens.colorNeutralBackground1,
              }}
            >
              <CheckmarkCircle16Filled style={{ color: '#13a10e', flex: '0 0 auto', marginTop: 2 }} />
              <div>
                <Text weight="semibold" size={300}>
                  {presenceAvailability ?? presenceActivity}
                  {presenceAvailability && presenceActivity && presenceActivity !== presenceAvailability
                    ? ` · ${presenceActivity}`
                    : null}
                </Text>
              </div>
            </div>
          </div>
        )
        : null}
      <Divider />
      <div style={{ display: 'grid', gap: 14, padding: '18px 28px 24px' }}>
        <Text weight="semibold">Contact</Text>
        {resolvedPersonEmail
          ? (
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Mail24Regular style={{ color: tokens.colorNeutralForeground3 }} />
              <a href={`mailto:${resolvedPersonEmail}`} target="_self" rel="noreferrer">
                {resolvedPersonEmail}
              </a>
            </div>
          )
          : null}
        {resolvedMobilePhone
          ? (
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Phone24Regular style={{ color: tokens.colorNeutralForeground3 }} />
              <a href={toPhoneHref(resolvedMobilePhone)} target="_self" rel="noreferrer">
                {resolvedMobilePhone}
              </a>
            </div>
          )
          : null}
        {resolvedBusinessPhone && !resolvedMobilePhone
          ? (
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Phone24Regular style={{ color: tokens.colorNeutralForeground3 }} />
              <a href={toPhoneHref(resolvedBusinessPhone)} target="_self" rel="noreferrer">
                {resolvedBusinessPhone}
              </a>
            </div>
          )
          : null}
        {officeLocation
          ? (
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Location24Regular style={{ color: tokens.colorNeutralForeground3 }} />
              <Text style={{ color: tokens.colorNeutralForeground3 }}>Office: {officeLocation}</Text>
            </div>
          )
          : null}
      </div>
    </Card>
  );
};
