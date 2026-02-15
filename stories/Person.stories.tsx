import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Person } from '../src/components/Person';
import { GraphProvider } from '../src/providers/ProviderContext';
import { MockProvider } from '../src/providers/MockProvider';

/**
 * The Person component displays user information from Microsoft Graph using Fluent UI Persona.
 *
 * Features:
 * - Multiple view modes (avatar, oneline, twolines, threelines)
 * - Presence badge support
 * - Customizable avatar size (preset or numeric)
 * - Photo loading from Microsoft Graph
 * - Mock provider for development/testing
 * - Text alignment options (start, center)
 * - Text position options (before, after, below)
 * - Full Fluent UI Persona configuration support
 */
const meta = {
  title: 'Components/Person',
  component: Person,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Display a person with avatar, name, job title, and presence information from Microsoft Graph.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const mockProvider = new MockProvider({ autoSignIn: true });
      return (
        <GraphProvider provider={mockProvider}>
          <Story />
        </GraphProvider>
      );
    },
  ],
  argTypes: {
    view: {
      control: 'select',
      options: ['avatar', 'oneline', 'twolines', 'threelines'],
      description: 'Display mode for the person component',
      table: {
        defaultValue: { summary: 'oneline' },
      },
    },
    avatarSize: {
      control: 'select',
      options: ['small', 'medium', 'large', 'extra-large'],
      description: 'Size of the avatar',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    numericSize: {
      control: 'number',
      description: 'Numeric size of the avatar (overrides avatarSize if provided)',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    textAlignment: {
      control: 'radio',
      options: ['start', 'center'],
      description: 'Horizontal alignment of the text',
      table: {
        defaultValue: { summary: 'start' },
      },
    },
    textPosition: {
      control: 'radio',
      options: ['before', 'after', 'below'],
      description: 'Position of text relative to avatar',
      table: {
        defaultValue: { summary: 'after' },
      },
    },
    showPresence: {
      control: 'boolean',
      description: 'Show presence badge on avatar',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fetchImage: {
      control: 'boolean',
      description: 'Fetch user photo from Microsoft Graph',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    userId: {
      control: 'text',
      description: 'User ID to fetch from Microsoft Graph',
    },
    userPrincipalName: {
      control: 'text',
      description: 'User Principal Name (UPN) to fetch from Microsoft Graph',
    },
  },
} satisfies Meta<typeof Person>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default person view with one line of text (name only)
 */
export const Default: Story = {
  args: {
    userId: 'test-user',
    view: 'oneline',
    showPresence: false,
    avatarSize: 'medium',
    fetchImage: true,
  },
};

/**
 * Avatar only - no text displayed
 */
export const AvatarOnly: Story = {
  args: {
    userId: 'test-user',
    view: 'avatar',
    avatarSize: 'large',
  },
};

/**
 * One line view - displays name only
 */
export const OneLine: Story = {
  args: {
    userId: 'test-user',
    view: 'oneline',
    avatarSize: 'medium',
  },
};

/**
 * Two lines view - displays name and job title
 */
export const TwoLines: Story = {
  args: {
    userId: 'test-user',
    view: 'twolines',
    avatarSize: 'medium',
  },
};

/**
 * Three lines view - displays name, job title, and department
 */
export const ThreeLines: Story = {
  args: {
    userId: 'test-user',
    view: 'threelines',
    avatarSize: 'medium',
  },
};

/**
 * With presence badge showing user availability
 */
export const WithPresence: Story = {
  args: {
    userId: 'test-user',
    view: 'twolines',
    showPresence: true,
    avatarSize: 'medium',
  },
};

/**
 * Small avatar size
 */
export const SmallSize: Story = {
  args: {
    userId: 'test-user',
    view: 'oneline',
    avatarSize: 'small',
  },
};

/**
 * Large avatar size
 */
export const LargeSize: Story = {
  args: {
    userId: 'test-user',
    view: 'twolines',
    avatarSize: 'large',
  },
};

/**
 * Extra large avatar size
 */
export const ExtraLargeSize: Story = {
  args: {
    userId: 'test-user',
    view: 'threelines',
    avatarSize: 'extra-large',
    showPresence: true,
  },
};

/**
 * Using personDetails prop to provide data directly (no Graph fetch)
 */
export const WithDirectData: Story = {
  args: {
    personDetails: {
      displayName: 'John Doe',
      jobTitle: 'Software Engineer',
      department: 'Engineering',
      mail: 'john.doe@contoso.com',
    },
    view: 'threelines',
    avatarSize: 'medium',
  },
};

/**
 * Clickable person card
 */
export const Clickable: Story = {
  args: {
    userId: 'test-user',
    view: 'twolines',
    avatarSize: 'medium',
    onClick: (person) => {
      alert(`Clicked on ${person.displayName}`);
    },
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  decorators: [
    (Story) => {
      // Use a provider that's not signed in to show loading
      const loadingProvider = new MockProvider({ autoSignIn: false });
      return (
        <GraphProvider provider={loadingProvider}>
          <Story />
        </GraphProvider>
      );
    },
  ],
  args: {
    userId: 'test-user',
    view: 'twolines',
  },
};

/**
 * Text centered alignment
 */
export const TextCentered: Story = {
  args: {
    userId: 'test-user',
    view: 'twolines',
    avatarSize: 'large',
    textAlignment: 'center',
  },
};

/**
 * Text positioned before avatar
 */
export const TextBefore: Story = {
  args: {
    userId: 'test-user',
    view: 'twolines',
    avatarSize: 'medium',
    textPosition: 'before',
  },
};

/**
 * Text positioned below avatar
 */
export const TextBelow: Story = {
  args: {
    userId: 'test-user',
    view: 'threelines',
    avatarSize: 'large',
    textPosition: 'below',
    textAlignment: 'center',
  },
};

/**
 * Custom numeric size
 */
export const CustomNumericSize: Story = {
  args: {
    userId: 'test-user',
    view: 'twolines',
    numericSize: 72,
    showPresence: true,
  },
};

/**
 * Inline layout with text before
 */
export const InlineReversed: Story = {
  args: {
    userId: 'test-user',
    view: 'oneline',
    avatarSize: 'small',
    textPosition: 'before',
  },
};

/**
 * Card-like layout with centered text below
 */
export const CardLayout: Story = {
  args: {
    userId: 'test-user',
    view: 'threelines',
    avatarSize: 'extra-large',
    textPosition: 'below',
    textAlignment: 'center',
    showPresence: true,
  },
};
