import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { Person } from '../components/Person';
import { usePersonData } from '../hooks/usePersonData';

const personaMock = vi.fn();

vi.mock('@fluentui/react-components', async () => {
    const actual = await vi.importActual<typeof import('@fluentui/react-components')>(
        '@fluentui/react-components'
    );

    return {
        ...actual,
        Persona: (props: unknown) => {
            personaMock(props);
            return <div data-testid="persona" />;
        },
    };
});

vi.mock('../hooks/usePersonData', () => ({
    usePersonData: vi.fn(),
}));

describe('Person', () => {
    const mockedUsePersonData = vi.mocked(usePersonData);

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUsePersonData.mockReturnValue({
            user: {
                id: 'user-1',
                displayName: 'Adele Vance',
                givenName: 'Adele',
                jobTitle: 'Program Manager',
                department: 'Product',
                officeLocation: 'Building 1',
                userPrincipalName: 'adelev@contoso.com',
            },
            presence: {
                id: 'user-1',
                availability: 'Available',
                activity: 'Available',
            },
            photoUrl: null,
            loading: false,
            error: null,
        });
    });

    const getLastPersonaProps = (): Record<string, unknown> => {
        const call = personaMock.mock.calls.at(-1);
        if (!call) {
            throw new Error('Persona was not rendered');
        }

        return call[0] as Record<string, unknown>;
    };

    it('passes through non-text Persona props and suppresses text slots in avatar view', () => {
        render(
            <Person
                personDetails={{
                    displayName: 'Contoso User',
                    officeLocation: 'HQ',
                }}
                view="avatar"
                size="huge"
                presenceOnly
                primaryText="Primary"
                quaternaryText="Quaternary"
            />
        );

        const personaProps = getLastPersonaProps();
        expect(personaProps.size).toBe('huge');
        expect(personaProps.presenceOnly).toBe(true);
        expect(personaProps.primaryText).toBeUndefined();
        expect(personaProps.quaternaryText).toBeUndefined();
    });

    it('suppresses name and text slots in avatar view while loading', () => {
        mockedUsePersonData.mockReturnValue({
            user: null,
            presence: null,
            photoUrl: null,
            loading: true,
            error: null,
        });

        render(
            <Person
                userId="user-1"
                view="avatar"
                primaryText="Should not render"
                secondaryText="Should not render"
            />
        );

        const personaProps = getLastPersonaProps();
        expect(personaProps.name).toBeUndefined();
        expect(personaProps.primaryText).toBeUndefined();
        expect(personaProps.secondaryText).toBeUndefined();
        expect(personaProps.tertiaryText).toBeUndefined();
        expect(personaProps.quaternaryText).toBeUndefined();
    });

    it('shows Loading... name while loading in non-avatar view', () => {
        mockedUsePersonData.mockReturnValue({
            user: null,
            presence: null,
            photoUrl: null,
            loading: true,
            error: null,
        });

        render(<Person userId="user-1" view="oneline" />);

        const personaProps = getLastPersonaProps();
        expect(personaProps.name).toBe('Loading...');
    });


    it('suppresses all text slots in avatar view', () => {
        render(
            <Person
                personDetails={{
                    displayName: 'Adele Vance',
                    jobTitle: 'Program Manager',
                    department: 'Product',
                }}
                view="avatar"
                primaryText="Should not render"
                secondaryText="Should not render"
                tertiaryText="Should not render"
                quaternaryText="Should not render"
            />
        );

        const personaProps = getLastPersonaProps();
        expect(personaProps.name).toBeUndefined();
        expect(personaProps.primaryText).toBeUndefined();
        expect(personaProps.secondaryText).toBeUndefined();
        expect(personaProps.tertiaryText).toBeUndefined();
        expect(personaProps.quaternaryText).toBeUndefined();

        const avatar = personaProps.avatar as { initials?: string; name?: string };
        expect(avatar.initials).toBeTruthy();
        expect(avatar.name).toBe('Adele Vance');
    });

    it('passes through Persona onClick handler directly', () => {
        const onClick = vi.fn();

        render(<Person userId="user-1" onClick={onClick} />);

        const personaProps = getLastPersonaProps() as {
            onClick?: (event: unknown) => void;
        };

        const event = { type: 'click' };
        personaProps.onClick?.(event);

        expect(onClick).toHaveBeenCalledWith(event);
    });

    it('calls onUpdated after person data loads', () => {
        const onUpdated = vi.fn();

        render(<Person userId="user-1" onUpdated={onUpdated} />);

        expect(onUpdated).toHaveBeenCalledWith({
            trigger: 'personLoaded',
            person: expect.objectContaining({
                id: 'user-1',
                displayName: 'Adele Vance',
                presenceAvailability: 'Available',
            }),
            loading: false,
            error: null,
        });
    });

    it('maps fourlines view and Graph presence by default', () => {
        render(<Person userId="user-1" view="fourlines" showPresence fetchImage={false} />);

        const personaProps = getLastPersonaProps();
        expect(personaProps.secondaryText).toBe('Program Manager');
        expect(personaProps.tertiaryText).toBe('Product');
        expect(personaProps.quaternaryText).toBe('Building 1');
        expect(personaProps.presence).toEqual({ status: 'available' });

        const avatar = personaProps.avatar as { image?: unknown; initials?: string };
        expect(avatar.image).toBeUndefined();
        expect(avatar.initials).toBeTruthy();
    });

    it('supports MGT-style line property mapping with fallbacks and presence fields', () => {
        render(
            <Person
                userId="user-1"
                view="threelines"
                line1Property="givenName"
                line2Property="mail,userPrincipalName"
                line3Property="presenceAvailability"
                fetchImage={false}
            />
        );

        expect(mockedUsePersonData).toHaveBeenCalledWith({
            userId: 'user-1',
            fetchPresence: true,
            fetchPhoto: false,
            selectFields: ['givenName', 'mail', 'userPrincipalName'],
        });

        const personaProps = getLastPersonaProps();
        expect(personaProps.primaryText).toBe('Adele');
        expect(personaProps.secondaryText).toBe('adelev@contoso.com');
        expect(personaProps.tertiaryText).toBe('Available');
    });

    it('keeps hidden lines suppressed when line properties target lines outside the selected view', () => {
        render(
            <Person
                userId="user-1"
                view="oneline"
                line1Property="givenName"
                line2Property="mail,userPrincipalName"
                fetchImage={false}
            />
        );

        expect(mockedUsePersonData).toHaveBeenCalledWith({
            userId: 'user-1',
            fetchPresence: false,
            fetchPhoto: false,
            selectFields: ['givenName'],
        });

        const personaProps = getLastPersonaProps();
        expect(personaProps.primaryText).toBe('Adele');
        expect(personaProps.secondaryText).toBeUndefined();
        expect(personaProps.tertiaryText).toBeUndefined();
        expect(personaProps.quaternaryText).toBeUndefined();
    });

    it('renders custom line content through React line render callbacks', () => {
        render(
            <Person
                personDetails={{
                    displayName: 'Megan Bowen',
                    jobTitle: 'CEO',
                    department: 'Leadership',
                    officeLocation: 'HQ',
                }}
                view="fourlines"
                renderLine1={({ text }) => <span data-line="1">Name: {text}</span>}
                renderLine2={({ text }) => <span data-line="2">Role: {text}</span>}
                renderLine4={({ text }) => <span data-line="4">Place: {text}</span>}
            />
        );

        const personaProps = getLastPersonaProps() as {
            primaryText?: React.ReactElement;
            secondaryText?: React.ReactElement;
            quaternaryText?: React.ReactElement;
        };

        expect(React.isValidElement(personaProps.primaryText)).toBe(true);
        expect(React.isValidElement(personaProps.secondaryText)).toBe(true);
        expect(React.isValidElement(personaProps.quaternaryText)).toBe(true);
        expect(personaProps.primaryText?.props.children).toContain('Megan Bowen');
        expect(personaProps.secondaryText?.props.children).toContain('CEO');
        expect(personaProps.quaternaryText?.props.children).toContain('HQ');
    });

});
