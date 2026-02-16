import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Person } from '../src/components/Person';
import { GraphProvider } from '../src/providers/ProviderContext';
import { MockProvider } from '../src/providers/MockProvider';

/**
 * Person stories are organized to mirror Fluent UI Persona story groups:
 * - Default
 * - Lines
 * - Size
 * - Text Alignment
 * - Text Position
 * - Presence
 *
 * Graph-specific differences are captured in dedicated stories:
 * - Graph: Direct Data (personDetails)
 * - Graph: Image Fallback (fetchImage=false)
 * - Graph: Loading State
 */
const meta = {
  title: 'Components/Person',
  component: Person,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Display a person with avatar, text lines, and presence by composing Fluent UI Persona with Microsoft Graph data.

Story organization follows Fluent Persona docs, while Graph-specific stories focus on:
- identity resolution (userId / userPrincipalName / email)
- direct data mode (personDetails)
- Graph photo fetching and initials fallback
- Graph presence mapping through showPresence`,
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
      options: ['avatar', 'oneline', 'twolines', 'threelines', 'fourlines'],
      description: 'Display mode for the person component',
      table: {
        defaultValue: { summary: 'oneline' },
      },
    },
    size: {
      control: 'select',
      options: ['extra-small', 'small', 'medium', 'large', 'extra-large', 'huge'],
      description: 'Fluent UI Persona size token',
      table: {
        defaultValue: { summary: 'medium' },
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
    presenceOnly: {
      control: 'boolean',
      description: 'Render PresenceBadge only instead of avatar',
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
    email: {
      control: 'text',
      description: 'Email used as identity fallback to fetch from Microsoft Graph',
    },
    personDetails: {
      control: 'object',
      description: 'Provide details directly and skip Graph user fetch',
    },
  },
} satisfies Meta<typeof Person>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  args: {
    userId: 'test-user',
    view: 'oneline',
    showPresence: false,
    size: 'medium',
    fetchImage: true,
  },
};

export const Lines: Story = {
  name: 'Lines',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Person {...args} view="avatar" />
      <Person {...args} view="oneline" />
      <Person {...args} view="twolines" />
      <Person {...args} view="threelines" />
      <Person {...args} view="fourlines" />
    </div>
  ),
  args: {
    userId: 'test-user',
    size: 'medium',
    showPresence: false,
  },
};

export const Size: Story = {
  name: 'Size',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Person {...args} size="extra-small" />
      <Person {...args} size="small" />
      <Person {...args} size="medium" />
      <Person {...args} size="large" />
      <Person {...args} size="extra-large" />
      <Person {...args} size="huge" />
    </div>
  ),
  args: {
    userId: 'test-user',
    view: 'twolines',
    showPresence: true,
    size: 'medium',
  },
};

export const TextAlignment: Story = {
  name: 'Text Alignment',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Person {...args} textAlignment="start" />
      <Person {...args} textAlignment="center" />
    </div>
  ),
  args: {
    userId: 'test-user',
    view: 'threelines',
    showPresence: true,
    size: 'large',
  },
};

export const TextPosition: Story = {
  name: 'Text Position',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Person {...args} textPosition="after" />
      <Person {...args} textPosition="before" />
      <Person {...args} textPosition="below" textAlignment="center" />
    </div>
  ),
  args: {
    userId: 'test-user',
    view: 'twolines',
    showPresence: true,
    size: 'medium',
  },
};

export const Presence: Story = {
  name: 'Presence',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Person {...args} showPresence />
      <Person {...args} showPresence presenceOnly />
    </div>
  ),
  args: {
    userId: 'test-user',
    view: 'twolines',
    size: 'large',
  },
};

export const GraphDirectData: Story = {
  name: 'Graph: Direct Data',
  args: {
    personDetails: {
      displayName: 'John Doe',
      jobTitle: 'Software Engineer',
      department: 'Engineering',
      officeLocation: 'Redmond',
      mail: 'john.doe@contoso.com',
    },
    view: 'fourlines',
    size: 'medium',
    showPresence: false,
  },
};

export const GraphImageFallback: Story = {
  name: 'Graph: Image Fallback',
  args: {
    userId: 'test-user',
    view: 'twolines',
    size: 'medium',
    fetchImage: false,
  },
};

export const GraphLoadingState: Story = {
  name: 'Graph: Loading State',
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
    size: 'medium',
  },
};
