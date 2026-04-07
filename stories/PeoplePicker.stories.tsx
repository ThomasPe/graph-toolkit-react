import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import React, { useState } from 'react';
import { FluentProvider, webLightTheme, Text } from '@fluentui/react-components';
import { PeoplePicker } from '../src/components/PeoplePicker';
import { GraphProvider } from '../src/providers/ProviderContext';
import { MockProvider } from '../src/providers/MockProvider';
import type { PeoplePickerPerson } from '../src/components/PeoplePicker';

const provider = new MockProvider({ autoSignIn: true });

const meta: Meta<typeof PeoplePicker> = {
  title: 'Components/PeoplePicker',
  component: PeoplePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Search and select one or more people from Microsoft Graph using the Fluent UI TagPicker.

The \`PeoplePicker\` supports both **controlled** and **uncontrolled** usage patterns.

When wrapping with a \`MockProvider\` (with \`autoSignIn: true\`), it uses built-in mock data so you can prototype without any auth configuration.`,
      },
    },
  },
  args: {
    onSelectionChange: fn(),
    onUpdated: fn(),
  },
  decorators: [
    (Story) => (
      <FluentProvider theme={webLightTheme}>
        <GraphProvider provider={provider}>
          <div style={{ width: 400 }}>
            <Story />
          </div>
        </GraphProvider>
      </FluentProvider>
    ),
  ],
  argTypes: {
    placeholder: { control: 'text' },
    maxPeople: { control: { type: 'number', min: 1 } },
    searchMinChars: { control: { type: 'number', min: 1 } },
    maxSearchResults: { control: { type: 'number', min: 1 } },
    appearance: {
      control: 'select',
      options: ['outline', 'underline', 'filled-darker', 'filled-lighter'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof PeoplePicker>;

/**
 * Default uncontrolled usage — start typing to search for people.
 * Try "adele", "megan", or "alex" to see results.
 */
export const Default: Story = {
  args: {
    placeholder: 'Search for people...',
  },
};

/**
 * Shows how to pre-select people in uncontrolled mode.
 */
export const WithDefaultSelected: Story = {
  name: 'With Default Selected',
  args: {
    placeholder: 'Search for people...',
    defaultSelectedPeople: [
      {
        id: '00000000-0000-0000-0000-000000000001',
        displayName: 'Adele Vance',
        mail: 'adelev@contoso.com',
        userPrincipalName: 'adelev@contoso.com',
        jobTitle: 'Product Manager',
      },
    ],
  },
};

/**
 * Controlled PeoplePicker that logs selection changes.
 */
export const Controlled: Story = {
  name: 'Controlled',
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<PeoplePickerPerson[]>([
      {
        id: '00000000-0000-0000-0000-000000000010',
        displayName: 'Megan Bowen',
        mail: 'meganb@contoso.com',
        userPrincipalName: 'meganb@contoso.com',
        jobTitle: 'Marketing Manager',
      },
    ]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <PeoplePicker {...args} selectedPeople={selected} onSelectionChange={setSelected} />
        <Text size={200}>
          Selected: {selected.map((p) => p.displayName).join(', ') || '(none)'}
        </Text>
      </div>
    );
  },
  args: {
    placeholder: 'Search for people...',
  },
};

/**
 * Limits selection to a maximum of 3 people.
 * The input field hides once the limit is reached.
 */
export const MaxThreePeople: Story = {
  name: 'Max 3 People',
  args: {
    placeholder: 'Search for up to 3 people...',
    maxPeople: 3,
  },
};

/**
 * Requires at least 2 characters before searching.
 */
export const MinTwoChars: Story = {
  name: 'Min 2 Characters',
  args: {
    placeholder: 'Type 2+ characters to search...',
    searchMinChars: 2,
  },
};

/**
 * Compact small size variant.
 */
export const SmallSize: Story = {
  name: 'Size: Small',
  args: {
    placeholder: 'Search...',
    size: 'small',
  },
};

/**
 * Large size variant.
 */
export const LargeSize: Story = {
  name: 'Size: Large',
  args: {
    placeholder: 'Search...',
    size: 'large',
  },
};

/**
 * Disabled state — the picker cannot be interacted with.
 */
export const Disabled: Story = {
  args: {
    placeholder: 'Search for people...',
    disabled: true,
    defaultSelectedPeople: [
      {
        id: '00000000-0000-0000-0000-000000000001',
        displayName: 'Adele Vance',
        mail: 'adelev@contoso.com',
      },
    ],
  },
};

/**
 * Underline appearance variant.
 */
export const UnderlineAppearance: Story = {
  name: 'Appearance: Underline',
  args: {
    placeholder: 'Search for people...',
    appearance: 'underline',
  },
};

/**
 * Filled appearance with a darker background.
 */
export const FilledDarkerAppearance: Story = {
  name: 'Appearance: Filled Darker',
  args: {
    placeholder: 'Search for people...',
    appearance: 'filled-darker',
  },
  decorators: [
    (Story) => (
      <FluentProvider theme={webLightTheme}>
        <GraphProvider provider={provider}>
          <div style={{ width: 400, padding: 16, background: 'var(--colorNeutralBackground1)' }}>
            <Story />
          </div>
        </GraphProvider>
      </FluentProvider>
    ),
  ],
};
