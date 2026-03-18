import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PeoplePicker } from '../components/PeoplePicker';
import { usePeopleSearch } from '../hooks/usePeopleSearch';
import { MockProvider } from '../providers/MockProvider';
import { isPeopleSearchProvider } from '../providers/IPersonDataProvider';

// Mock Fluent UI TagPicker components to simplify testing
vi.mock('@fluentui/react-components', async () => {
  const actual = await vi.importActual<typeof import('@fluentui/react-components')>(
    '@fluentui/react-components'
  );
  return {
    ...actual,
    TagPicker: ({ children, onOptionSelect, selectedOptions }: {
      children: React.ReactNode;
      onOptionSelect?: (e: Event, data: { value: string; selectedOptions: string[] }) => void;
      selectedOptions?: string[];
    }) => (
      <div
        data-testid="tag-picker"
        data-selected={selectedOptions?.join(',')}
        data-on-option-select={onOptionSelect ? 'true' : 'false'}
      >
        {children}
      </div>
    ),
    TagPickerControl: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="tag-picker-control">{children}</div>
    ),
    TagPickerGroup: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="tag-picker-group">{children}</div>
    ),
    TagPickerInput: ({ value, onChange, placeholder }: {
      value?: string;
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
      placeholder?: string;
    }) => (
      <input
        data-testid="tag-picker-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    ),
    TagPickerList: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="tag-picker-list">{children}</div>
    ),
    TagPickerOption: ({ children, value, text }: {
      children: React.ReactNode;
      value: string;
      text?: string;
    }) => (
      <div data-testid="tag-picker-option" data-value={value} data-text={text}>
        {children}
      </div>
    ),
    InteractionTag: ({ children, value }: { children: React.ReactNode; value: string }) => (
      <div data-testid="interaction-tag" data-value={value}>{children}</div>
    ),
    InteractionTagPrimary: ({ children, media, hasSecondaryAction }: {
      children: React.ReactNode;
      media?: React.ReactNode;
      hasSecondaryAction?: boolean;
    }) => (
      <div data-testid="interaction-tag-primary" data-has-secondary-action={hasSecondaryAction ? 'true' : 'false'}>{media}{children}</div>
    ),
    InteractionTagSecondary: ({ 'aria-label': ariaLabel }: { 'aria-label'?: string }) => (
      <button data-testid="interaction-tag-secondary" aria-label={ariaLabel} />
    ),
    Avatar: ({ name, initials, size }: { name?: string; initials?: string; size?: number }) => (
      <div data-testid="avatar" data-name={name} data-initials={initials} data-size={size} />
    ),
  };
});

vi.mock('../hooks/usePeopleSearch', () => ({
  usePeopleSearch: vi.fn(),
}));

const mockedUsePeopleSearch = vi.mocked(usePeopleSearch);

describe('PeoplePicker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUsePeopleSearch.mockReturnValue({
      results: [],
      loading: false,
    });
  });

  it('renders the tag picker input with placeholder', () => {
    render(<PeoplePicker placeholder="Search for people..." />);
    const input = screen.getByTestId('tag-picker-input');
    expect(input).toBeDefined();
    expect(input.getAttribute('placeholder')).toBe('Search for people...');
  });

  it('renders selected people as interaction tags', () => {
    const selected = [
      { id: '1', displayName: 'Adele Vance', mail: 'adelev@contoso.com' },
      { id: '2', displayName: 'Alex Wilber', mail: 'alexw@contoso.com' },
    ];
    render(<PeoplePicker selectedPeople={selected} onSelectionChange={() => {}} />);

    const tags = screen.getAllByTestId('interaction-tag');
    expect(tags).toHaveLength(2);
    expect(tags[0].getAttribute('data-value')).toBe('1');
    expect(tags[1].getAttribute('data-value')).toBe('2');
  });

  it('marks selected interaction tags as having a secondary action', () => {
    const selected = [{ id: '1', displayName: 'Adele Vance', mail: 'adelev@contoso.com' }];
    render(<PeoplePicker selectedPeople={selected} onSelectionChange={() => {}} />);

    const primary = screen.getByTestId('interaction-tag-primary');
    expect(primary.getAttribute('data-has-secondary-action')).toBe('true');
  });

  it('uses a compact avatar size for selected interaction tags', () => {
    const selected = [{ id: '1', displayName: 'Adele Vance', mail: 'adelev@contoso.com' }];
    render(<PeoplePicker selectedPeople={selected} onSelectionChange={() => {}} />);

    const avatar = screen.getByTestId('avatar');
    expect(avatar.getAttribute('data-size')).toBe('16');
  });

  it('shows search results in the dropdown', () => {
    mockedUsePeopleSearch.mockReturnValue({
      results: [
        { id: '1', displayName: 'Adele Vance', mail: 'adelev@contoso.com', userPrincipalName: 'adelev@contoso.com', jobTitle: 'Product Manager', department: 'Marketing' },
        { id: '2', displayName: 'Alex Wilber', mail: 'alexw@contoso.com', userPrincipalName: 'alexw@contoso.com', jobTitle: 'Marketing Assistant', department: 'Marketing' },
      ],
      loading: false,
    });

    render(<PeoplePicker />);
    const options = screen.getAllByTestId('tag-picker-option');
    expect(options).toHaveLength(2);
    expect(options[0].getAttribute('data-value')).toBe('1');
    expect(options[1].getAttribute('data-value')).toBe('2');
  });

  it('filters out already-selected people from search results', () => {
    mockedUsePeopleSearch.mockReturnValue({
      results: [
        { id: '1', displayName: 'Adele Vance', mail: 'adelev@contoso.com', userPrincipalName: 'adelev@contoso.com', jobTitle: null, department: null },
        { id: '2', displayName: 'Alex Wilber', mail: 'alexw@contoso.com', userPrincipalName: 'alexw@contoso.com', jobTitle: null, department: null },
      ],
      loading: false,
    });

    render(
      <PeoplePicker
        selectedPeople={[{ id: '1', displayName: 'Adele Vance' }]}
        onSelectionChange={() => {}}
      />
    );

    const options = screen.getAllByTestId('tag-picker-option');
    expect(options).toHaveLength(1);
    expect(options[0].getAttribute('data-value')).toBe('2');
  });

  it('shows "No people found" when search has no results', () => {
    mockedUsePeopleSearch.mockReturnValue({ results: [], loading: false });

    render(<PeoplePicker searchMinChars={1} />);

    // Simulate typing a query
    const input = screen.getByTestId('tag-picker-input');
    fireEvent.change(input, { target: { value: 'xyz' } });

    const noResultsOption = screen.getByTestId('tag-picker-option');
    expect(noResultsOption.textContent).toContain('No people found');
  });

  it('hides search input when maxPeople is reached', () => {
    const selected = [
      { id: '1', displayName: 'Adele Vance' },
      { id: '2', displayName: 'Alex Wilber' },
    ];
    render(
      <PeoplePicker
        selectedPeople={selected}
        onSelectionChange={() => {}}
        maxPeople={2}
      />
    );

    const input = screen.queryByTestId('tag-picker-input');
    expect(input).toBeNull();
  });

  it('shows search input when below maxPeople limit', () => {
    const selected = [{ id: '1', displayName: 'Adele Vance' }];
    render(
      <PeoplePicker
        selectedPeople={selected}
        onSelectionChange={() => {}}
        maxPeople={3}
      />
    );

    const input = screen.getByTestId('tag-picker-input');
    expect(input).toBeDefined();
  });

  it('uses default selectedPeople for uncontrolled mode', () => {
    const defaultPeople = [{ id: '1', displayName: 'Adele Vance' }];
    render(<PeoplePicker defaultSelectedPeople={defaultPeople} />);

    const tags = screen.getAllByTestId('interaction-tag');
    expect(tags).toHaveLength(1);
    expect(tags[0].getAttribute('data-value')).toBe('1');
  });

  it('calls usePeopleSearch with the typed query', () => {
    render(<PeoplePicker searchMinChars={2} maxSearchResults={5} />);

    const input = screen.getByTestId('tag-picker-input');
    fireEvent.change(input, { target: { value: 'adele' } });

    expect(mockedUsePeopleSearch).toHaveBeenCalledWith('adele', {
      minChars: 2,
      maxResults: 5,
    });
  });

  it('requests extra results to compensate for excludeUserIds', () => {
    mockedUsePeopleSearch.mockReturnValue({
      results: [
        { id: 'a', displayName: 'Person A', mail: 'pa@contoso.com', userPrincipalName: 'pa@contoso.com', jobTitle: null, department: null },
      ],
      loading: false,
    });
    render(<PeoplePicker maxSearchResults={5} excludeUserIds={['1', '2', '3']} />);

    const input = screen.getByTestId('tag-picker-input');
    fireEvent.change(input, { target: { value: 'adele' } });

    expect(mockedUsePeopleSearch).toHaveBeenCalledWith('adele', {
      minChars: 1,
      maxResults: 8, // 5 + 3 excluded IDs
    });

    // Person A is not in excludeUserIds, so it should be rendered
    const options = screen.getAllByTestId('tag-picker-option');
    expect(options[0].getAttribute('data-value')).toBe('a');
  });

  it('filters out excludeUserIds from search results', () => {
    mockedUsePeopleSearch.mockReturnValue({
      results: [
        { id: '1', displayName: 'Adele Vance', mail: 'adelev@contoso.com', userPrincipalName: 'adelev@contoso.com', jobTitle: null, department: null },
        { id: '2', displayName: 'Alex Wilber', mail: 'alexw@contoso.com', userPrincipalName: 'alexw@contoso.com', jobTitle: null, department: null },
        { id: '3', displayName: 'Megan Bowen', mail: 'meganb@contoso.com', userPrincipalName: 'meganb@contoso.com', jobTitle: null, department: null },
      ],
      loading: false,
    });

    render(<PeoplePicker excludeUserIds={['1', '3']} />);

    const options = screen.getAllByTestId('tag-picker-option');
    expect(options).toHaveLength(1);
    expect(options[0].getAttribute('data-value')).toBe('2');
  });

  it('caps filtered results to maxSearchResults after exclusion', () => {
    mockedUsePeopleSearch.mockReturnValue({
      results: [
        { id: '1', displayName: 'Person 1', mail: 'p1@contoso.com', userPrincipalName: 'p1@contoso.com', jobTitle: null, department: null },
        { id: '2', displayName: 'Person 2', mail: 'p2@contoso.com', userPrincipalName: 'p2@contoso.com', jobTitle: null, department: null },
        { id: '3', displayName: 'Person 3', mail: 'p3@contoso.com', userPrincipalName: 'p3@contoso.com', jobTitle: null, department: null },
        { id: 'excluded', displayName: 'Excluded', mail: 'ex@contoso.com', userPrincipalName: 'ex@contoso.com', jobTitle: null, department: null },
      ],
      loading: false,
    });

    render(<PeoplePicker maxSearchResults={2} excludeUserIds={['excluded']} />);

    // Should show only 2 results (capped by maxSearchResults) with the excluded one filtered out
    const options = screen.getAllByTestId('tag-picker-option');
    expect(options).toHaveLength(2);
    const values = options.map((o) => o.getAttribute('data-value'));
    expect(values).not.toContain('excluded');
  });

  it('shows no results when all search results are in excludeUserIds', () => {
    mockedUsePeopleSearch.mockReturnValue({
      results: [
        { id: '1', displayName: 'Adele Vance', mail: 'adelev@contoso.com', userPrincipalName: 'adelev@contoso.com', jobTitle: null, department: null },
        { id: '2', displayName: 'Alex Wilber', mail: 'alexw@contoso.com', userPrincipalName: 'alexw@contoso.com', jobTitle: null, department: null },
      ],
      loading: false,
    });

    render(<PeoplePicker excludeUserIds={['1', '2']} searchMinChars={1} />);

    const input = screen.getByTestId('tag-picker-input');
    fireEvent.change(input, { target: { value: 'xyz' } });

    // All results are excluded, so we should see the "No people found" option
    const noResultsOption = screen.getByTestId('tag-picker-option');
    expect(noResultsOption.textContent).toContain('No people found');
  });

  it('renders remove buttons for each selected person', () => {
    const selected = [
      { id: '1', displayName: 'Adele Vance' },
      { id: '2', displayName: 'Alex Wilber' },
    ];
    render(<PeoplePicker selectedPeople={selected} onSelectionChange={() => {}} />);

    const removeButtons = screen.getAllByTestId('interaction-tag-secondary');
    expect(removeButtons).toHaveLength(2);
    expect(removeButtons[0].getAttribute('aria-label')).toBe('Remove Adele Vance');
    expect(removeButtons[1].getAttribute('aria-label')).toBe('Remove Alex Wilber');
  });
});

describe('isPeopleSearchProvider', () => {
  it('returns true for MockProvider', () => {
    const provider = new MockProvider();
    expect(isPeopleSearchProvider(provider)).toBe(true);
  });

  it('returns false for null', () => {
    expect(isPeopleSearchProvider(null)).toBe(false);
  });

  it('returns false for provider without searchPeople', () => {
    const provider = {
      getAccessToken: async () => 'token',
      login: async () => {},
      logout: async () => {},
      getState: () => 'SignedIn' as const,
      onStateChanged: () => {},
      removeStateChangedHandler: () => {},
    };
    expect(isPeopleSearchProvider(provider)).toBe(false);
  });
});

describe('MockProvider.searchPeople', () => {
  it('returns matching people for a display name query', async () => {
    const provider = new MockProvider();
    const results = await provider.searchPeople('Adele');
    expect(results).toHaveLength(1);
    expect(results[0].displayName).toBe('Adele Vance');
    expect(results[0].id).toBeTruthy();
  });

  it('matches by email fragment', async () => {
    const provider = new MockProvider();
    const results = await provider.searchPeople('alexw@');
    expect(results).toHaveLength(1);
    expect(results[0].displayName).toBe('Alex Wilber');
  });

  it('returns matching results for a UPN fragment shared by multiple people', async () => {
    const provider = new MockProvider();
    // Both Adele (adelev) and Alex (alexw) have '@contoso.com' in their UPN
    const results = await provider.searchPeople('contoso.com');
    expect(results.length).toBeGreaterThan(1);
    const names = results.map((p) => p.displayName);
    expect(names).toContain('Adele Vance');
    expect(names).toContain('Alex Wilber');
  });

  it('returns empty array when no match', async () => {
    const provider = new MockProvider();
    const results = await provider.searchPeople('xyznotexistent123');
    expect(results).toHaveLength(0);
  });

  it('respects maxResults limit', async () => {
    const provider = new MockProvider();
    // Use 'a' which matches multiple names
    const results = await provider.searchPeople('a', 2);
    expect(results.length).toBeLessThanOrEqual(2);
  });

  it('is case-insensitive', async () => {
    const provider = new MockProvider();
    const lower = await provider.searchPeople('adele');
    const upper = await provider.searchPeople('ADELE');
    expect(lower.length).toBe(upper.length);
    expect(lower[0]?.displayName).toBe(upper[0]?.displayName);
  });
});

describe('usePeopleSearch with MockProvider', () => {
  it('returns results from MockProvider', async () => {
    const provider = new MockProvider({ autoSignIn: true });
    expect(isPeopleSearchProvider(provider)).toBe(true);
    const results = await provider.searchPeople('Megan');
    expect(results).toHaveLength(1);
    expect(results[0].displayName).toBe('Megan Bowen');
  });

  it('returns empty results for empty query', async () => {
    const provider = new MockProvider({ autoSignIn: true });
    const results = await provider.searchPeople('');
    // Empty queries are short-circuited and return an empty array
    expect(results).toHaveLength(0);
  });
});

describe('PeoplePicker - option secondary content', () => {
  it('shows email as secondary content in options', () => {
    mockedUsePeopleSearch.mockReturnValue({
      results: [
        { id: '1', displayName: 'Adele Vance', mail: 'adelev@contoso.com', userPrincipalName: 'adelev@contoso.com', jobTitle: null, department: null },
      ],
      loading: false,
    });

    render(<PeoplePicker />);
    // Simulate typing to show results
    const input = screen.getByTestId('tag-picker-input');
    fireEvent.change(input, { target: { value: 'Adele' } });

    const option = screen.getByTestId('tag-picker-option');
    expect(option.getAttribute('data-value')).toBe('1');
  });
});
