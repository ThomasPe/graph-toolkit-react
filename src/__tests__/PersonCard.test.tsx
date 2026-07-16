import { beforeEach, describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { PersonCard } from '../components/Person/PersonCard';

const avatarMock = vi.fn();

vi.mock('@fluentui/react-components', async () => {
  const actual = await vi.importActual<typeof import('@fluentui/react-components')>(
    '@fluentui/react-components'
  );

  return {
    ...actual,
    Avatar: (props: unknown) => {
      avatarMock(props);
      return <div data-testid="avatar" />;
    },
  };
});

describe('PersonCard', () => {
  beforeEach(() => {
    avatarMock.mockClear();
  });

  it('renders person details and contact actions when data is available', () => {
    render(
      <PersonCard
        displayName="Adele Vance"
        person={{
          displayName: 'Adele Vance',
          jobTitle: 'Program Manager',
          department: 'Product',
          officeLocation: 'Building 1',
          mail: 'adele@contoso.com',
          mobilePhone: '+1 555 000 1111',
          businessPhones: ['+1 555 000 2222'],
        }}
      />
    );

    expect(screen.getByText('Adele Vance')).toBeTruthy();
    expect(screen.getByText('Program Manager · Product')).toBeTruthy();
    expect(screen.getByText('Office: Building 1')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'adele@contoso.com' }).getAttribute('href')).toBe('mailto:adele@contoso.com');
    expect(screen.getByRole('link', { name: 'Email' }).getAttribute('href')).toBe('mailto:adele@contoso.com');
    expect(screen.getByRole('link', { name: 'Chat' }).getAttribute('href')).toBe(
      'https://teams.microsoft.com/l/chat/0/0?users=adele%40contoso.com'
    );
    expect(screen.getByRole('link', { name: 'Call' }).getAttribute('href')).toBe('tel:+15550001111');
  });

  it('omits actions that require unavailable contact data', () => {
    render(
      <PersonCard
        displayName="No Contact"
        person={{
          displayName: 'No Contact',
          department: 'Finance',
        }}
      />
    );

    expect(screen.queryByRole('link', { name: 'Email' })).toBeNull();
    expect(screen.queryByRole('link', { name: 'Chat' })).toBeNull();
    expect(screen.queryByRole('link', { name: 'Call' })).toBeNull();
  });

  it('uses shared initials logic for the avatar when no photo is available', () => {
    render(
      <PersonCard
        displayName="Contoso User"
        person={{
          displayName: 'Contoso User',
          givenName: 'Adele',
          surname: 'Vance',
        }}
      />
    );

    const avatarProps = avatarMock.mock.calls[0]?.[0] as { initials?: string };
    expect(avatarProps.initials).toBe('AV');
  });
});
