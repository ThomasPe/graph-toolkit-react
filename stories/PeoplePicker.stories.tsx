import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useMemo, useState } from 'react';
import { fn } from 'storybook/test';
import {
  Caption1,
  Card,
  FluentProvider,
  Spinner,
  Text,
  tokens,
  webLightTheme,
} from '@fluentui/react-components';
import { PeoplePicker } from '../src/components/PeoplePicker';
import { Person } from '../src/components/Person';
import { GraphProvider } from '../src/providers/ProviderContext';
import { MockProvider } from '../src/providers/MockProvider';
import type { PeoplePickerPerson } from '../src/components/PeoplePicker';
import { usePeopleList } from '../src/hooks/usePeopleList';

const provider = new MockProvider({ autoSignIn: true });

type PeoplePickerStoryProps = React.ComponentProps<typeof PeoplePicker>;

const SelectedUsersListDemo: React.FC<PeoplePickerStoryProps> = (args) => {
  const [selectedPeople, setSelectedPeople] = useState<PeoplePickerPerson[]>([]);
  const selectedUserIds = useMemo(() => selectedPeople.map(person => person.id), [selectedPeople]);
  const peopleListOptions = useMemo(
    () => (selectedUserIds.length > 0
      ? {
        userIds: selectedUserIds,
        sortBy: 'surname' as const,
        selectFields: ['givenName', 'surname'],
      }
      : {
        people: [],
        sortBy: 'surname' as const,
        selectFields: ['givenName', 'surname'],
      }),
    [selectedUserIds]
  );
  const { people, loading } = usePeopleList(peopleListOptions);
  const handleSelectionChange = (nextSelectedPeople: PeoplePickerPerson[]) => {
    setSelectedPeople(nextSelectedPeople);
    args.onSelectionChange?.(nextSelectedPeople);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PeoplePicker
        {...args}
        selectedPeople={selectedPeople}
        onSelectionChange={handleSelectionChange}
      />

      <Card
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          padding: 16,
          backgroundColor: tokens.colorNeutralBackground2,
        }}
      >
        <Text weight="semibold">Stored object IDs</Text>
        <Caption1>
          This mirrors the common app pattern where the picker drives selection, but persistence only
          stores Microsoft Entra object IDs.
        </Caption1>
        <code style={{ whiteSpace: 'pre-wrap' }}>
          {selectedUserIds.length > 0 ? JSON.stringify(selectedUserIds, null, 2) : '[]'}
        </code>
      </Card>

      <Card
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          padding: 16,
        }}
      >
        <Text weight="semibold">Selected users sorted by surname</Text>
        <Caption1>
          The list is resolved with <code>usePeopleList</code> using the stored IDs, then sorted by
          <code>surname</code>.
        </Caption1>

        {selectedUserIds.length === 0 ? (
          <Text>Select a few people to populate the list.</Text>
        ) : loading ? (
          <Spinner label="Resolving selected users..." size="tiny" />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {people.map(person => (
              <Person
                key={person.id}
                personDetails={person}
                view="threelines"
                fetchImage={false}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

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

See the **Selected Users List** story for the recommended consumer pattern when your app stores
only object IDs from picker selections and later resolves a sorted list with \`usePeopleList\`.

When wrapping with a \`MockProvider\` (with \`autoSignIn: true\`), it uses built-in mock data so you can prototype without any auth configuration.`,
      },
    },
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
  args: {
    onSelectionChange: fn(),
    onUpdated: fn(),
  },
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
      options: ['medium', 'large'],
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

    const handleSelectionChange = (nextSelectedPeople: PeoplePickerPerson[]) => {
      setSelected(nextSelectedPeople);
      args.onSelectionChange?.(nextSelectedPeople);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <PeoplePicker
          {...args}
          selectedPeople={selected}
          onSelectionChange={handleSelectionChange}
        />
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
 * Demonstrates the common pattern where the app stores only selected object IDs,
 * then resolves a sorted user list with `usePeopleList`.
 */
export const SelectedUsersList: Story = {
  name: 'Selected Users List',
  render: (args) => <SelectedUsersListDemo {...args} />,
  args: {
    placeholder: 'Search and add people...',
    maxPeople: 5,
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
 * Medium size variant.
 */
export const MediumSize: Story = {
  name: 'Size: Medium',
  args: {
    placeholder: 'Search...',
    size: 'medium',
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
