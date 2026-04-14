import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { fn } from 'storybook/test';
import { FluentProvider, Text, webLightTheme } from '@fluentui/react-components';
import { People } from '../src/components/People';
import { GraphProvider } from '../src/providers/ProviderContext';
import { MockProvider } from '../src/providers/MockProvider';

const provider = new MockProvider({ autoSignIn: true });

const meta: Meta<typeof People> = {
  title: 'Components/People',
  component: People,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Display a compact avatar strip similar to MGT \
\`mgt-people\` using Fluent UI \
\`AvatarGroup\`.

The component can render a supplied list of people, resolve specific \
\`userIds\`, load a group's direct members, or default to the current user's people suggestions.`,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <FluentProvider theme={webLightTheme}>
        <GraphProvider provider={provider}>
          <div style={{ display: 'grid', gap: 16 }}>
            <Story />
          </div>
        </GraphProvider>
      </FluentProvider>
    ),
  ],
  args: {
    onUpdated: fn(),
  },
  argTypes: {
    showMax: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Maximum number of visible avatars before overflow is shown.',
    },
    showPresence: {
      control: 'boolean',
      description: 'Show presence badges on each avatar when available.',
    },
    layout: {
      control: 'radio',
      options: ['spread', 'stack', 'pie'],
      description: 'Fluent UI AvatarGroup layout.',
    },
    size: {
      control: 'select',
      options: [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128],
      description: 'Avatar size in pixels.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showMax: 3,
    layout: 'stack',
    size: 32,
  },
};

export const WithPresence: Story = {
  args: {
    showMax: 4,
    layout: 'stack',
    size: 40,
    showPresence: true,
  },
};

export const FromUserIds: Story = {
  args: {
    userIds: [
      '00000000-0000-0000-0000-000000000001',
      '00000000-0000-0000-0000-000000000002',
      '00000000-0000-0000-0000-000000000003',
      '00000000-0000-0000-0000-000000000010',
    ],
    showMax: 3,
    layout: 'stack',
    size: 32,
  },
};

export const DirectPeople: Story = {
  render: args => (
    <>
      <People
        {...args}
        people={[
          {
            id: 'adele',
            displayName: 'Adele Vance',
            mail: 'adelev@contoso.com',
            jobTitle: 'Product Manager',
          },
          {
            id: 'alex',
            displayName: 'Alex Wilber',
            mail: 'alexw@contoso.com',
            jobTitle: 'Marketing Assistant',
          },
          {
            id: 'megan',
            displayName: 'Megan Bowen',
            mail: 'meganb@contoso.com',
            jobTitle: 'Marketing Manager',
          },
          {
            id: 'lee',
            displayName: 'Lee Gu',
            mail: 'leeg@contoso.com',
            jobTitle: 'Director',
          },
        ]}
      />
      <Text size={200}>Rendering supplied people skips list discovery and still uses overflow.</Text>
    </>
  ),
  args: {
    showMax: 2,
    layout: 'stack',
    size: 32,
  },
};
