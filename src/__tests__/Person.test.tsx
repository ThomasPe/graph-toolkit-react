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
                jobTitle: 'Program Manager',
                department: 'Product',
                officeLocation: 'Building 1',
            },
            presence: {
                id: 'user-1',
                availability: 'Available',
            },
            photoUrl: undefined,
            loading: false,
        });
    });

    const getLastPersonaProps = (): Record<string, unknown> => {
        const call = personaMock.mock.calls.at(-1);
        if (!call) {
            throw new Error('Persona was not rendered');
        }

        return call[0] as Record<string, unknown>;
    };

    it('passes through advanced Fluent Persona props', () => {
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
        expect(personaProps.primaryText).toBe('Primary');
        expect(personaProps.quaternaryText).toBe('Quaternary');
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

});
