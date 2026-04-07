import { beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { People } from '../components/People';
import { usePeopleList } from '../hooks/usePeopleList';

const avatarGroupItemMock = vi.fn();
const avatarGroupPopoverMock = vi.fn();

vi.mock('@fluentui/react-components', async () => {
  const actual = await vi.importActual<typeof import('@fluentui/react-components')>(
    '@fluentui/react-components'
  );

  return {
    ...actual,
    AvatarGroup: ({ children }: { children: React.ReactNode }) => <div data-testid="avatar-group">{children}</div>,
    AvatarGroupItem: (props: unknown) => {
      avatarGroupItemMock(props);
      const avatar = (props as { avatar?: { name?: string } }).avatar;
      return <div data-testid="avatar-group-item">{avatar?.name ?? 'unknown'}</div>;
    },
    AvatarGroupPopover: ({ children, count }: { children: React.ReactNode; count?: number }) => {
      avatarGroupPopoverMock({ count });
      return (
        <div data-testid="avatar-group-popover">
          <span data-testid="avatar-group-popover-count">+{count ?? 0}</span>
          {children}
        </div>
      );
    },
    Spinner: ({ size }: { size?: string }) => <div data-testid="spinner">spinner:{size}</div>,
  };
});

vi.mock('../hooks/usePeopleList', () => ({
  usePeopleList: vi.fn(),
}));

describe('People', () => {
  const mockedUsePeopleList = vi.mocked(usePeopleList);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('passes list-loading options through to the hook', () => {
    mockedUsePeopleList.mockReturnValue({
      people: [],
      loading: false,
      error: null,
    });

    render(
      <People
        userIds={['me', 'user-2']}
        groupId="group-1"
        showMax={4}
        showPresence
      />
    );

    expect(mockedUsePeopleList).toHaveBeenCalledWith({
      people: undefined,
      userIds: ['me', 'user-2'],
      groupId: 'group-1',
      maxPeople: 10,
      showPresence: true,
    });
  });

  it('renders a loading spinner while the list is loading', () => {
    mockedUsePeopleList.mockReturnValue({
      people: [],
      loading: true,
      error: null,
    });

    render(<People />);

    expect(screen.getByTestId('spinner').textContent).toBe('spinner:tiny');
  });

  it('renders visible avatars and overflows the remainder', () => {
    mockedUsePeopleList.mockReturnValue({
      people: [
        {
          id: '1',
          displayName: 'Adele Vance',
          photoUrl: 'photo-1',
          presenceAvailability: 'Available',
        },
        {
          id: '2',
          displayName: 'Megan Bowen',
        },
        {
          id: '3',
          displayName: 'Alex Wilber',
        },
      ],
      loading: false,
      error: null,
    });

    render(<People showMax={2} showPresence />);

    expect(screen.getByTestId('avatar-group')).toBeTruthy();
    expect(screen.getAllByTestId('avatar-group-item')).toHaveLength(3);
    expect(screen.getByTestId('avatar-group-popover-count').textContent).toBe('+1');

    const firstCallAvatar = (avatarGroupItemMock.mock.calls[0]?.[0] as {
      avatar?: { badge?: { status?: string }; image?: { src?: string } };
    }).avatar;
    expect(firstCallAvatar?.badge).toEqual({ status: 'available' });
    expect(firstCallAvatar?.image).toEqual({ src: 'photo-1' });

    expect(avatarGroupPopoverMock).toHaveBeenCalledWith({ count: 1 });
  });

  it('returns null when there are no people to render', () => {
    mockedUsePeopleList.mockReturnValue({
      people: [],
      loading: false,
      error: null,
    });

    const { container } = render(<People />);

    expect(container.innerHTML).toBe('');
  });

  it('calls onUpdated with the resolved people and trigger metadata', () => {
    const onUpdated = vi.fn();
    mockedUsePeopleList.mockReturnValue({
      people: [
        {
          id: '1',
          displayName: 'Adele Vance',
        },
      ],
      loading: false,
      error: null,
    });

    render(<People onUpdated={onUpdated} />);

    expect(onUpdated).toHaveBeenCalledWith({
      trigger: 'peopleLoaded',
      people: [
        {
          id: '1',
          displayName: 'Adele Vance',
        },
      ],
      loading: false,
      error: null,
    });
  });
});
