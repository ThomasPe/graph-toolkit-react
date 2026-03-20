import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { usePeopleList } from '../hooks/usePeopleList';
import { useGraphClient } from '../hooks/useGraphClient';
import { useProvider, useProviderState } from '../providers/ProviderContext';
import type { IProvider } from '../providers/IProvider';
import type { IPersonDataProvider } from '../providers/IPersonDataProvider';

type GraphPeopleSuggestionsResponse = {
  value: Array<{
    id: string;
    displayName: string;
    scoredEmailAddresses?: Array<{ address?: string | null }>;
  }>;
};

vi.mock('../hooks/useGraphClient', () => ({
  useGraphClient: vi.fn(),
}));

vi.mock('../providers/ProviderContext', () => ({
  useProvider: vi.fn(),
  useProviderState: vi.fn(),
}));

describe('usePeopleList', () => {
  const mockedUseGraphClient = vi.mocked(useGraphClient);
  const mockedUseProvider = vi.mocked(useProvider);
  const mockedUseProviderState = vi.mocked(useProviderState);

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseGraphClient.mockReturnValue(null);
    mockedUseProvider.mockReturnValue(null);
    mockedUseProviderState.mockReturnValue('SignedIn');
  });

  it('enriches supplied people that are missing photos even when presence is disabled', async () => {
    const getPersonData = vi.fn().mockResolvedValue({
      user: {
        id: 'user-1',
        displayName: 'Adele Vance',
        mail: 'adelev@contoso.com',
        userPrincipalName: 'adelev@contoso.com',
        jobTitle: 'Product Manager',
        department: 'Marketing',
      },
      presence: null,
      photoUrl: 'data:image/png;base64,AAAA',
    });

    mockedUseProvider.mockReturnValue({
      getPersonData,
    } as IProvider & IPersonDataProvider as never);

    const { result } = renderHook(() =>
      usePeopleList({
        people: [
          {
            id: 'user-1',
            displayName: 'Adele Vance',
          },
        ],
        showPresence: false,
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(getPersonData).toHaveBeenCalledWith({
      identifier: 'user-1',
      fetchPresence: false,
      fetchPhoto: true,
    });
    expect(result.current.people[0]?.photoUrl).toBe('data:image/png;base64,AAAA');
  });

  it('returns loading=true when a new fetch starts after provider state changes', async () => {
    let providerState: 'SignedOut' | 'SignedIn' = 'SignedOut';
    mockedUseProviderState.mockImplementation(() => providerState);
    mockedUseProvider.mockReturnValue({
      getPersonData: vi.fn().mockResolvedValue({
        user: null,
        presence: null,
        photoUrl: null,
      }),
    } as IProvider & IPersonDataProvider as never);

    let resolveGraphResponse: ((value: GraphPeopleSuggestionsResponse) => void) | undefined;
    const getMock = vi.fn().mockImplementation(
      () =>
        new Promise<GraphPeopleSuggestionsResponse>(resolve => {
          resolveGraphResponse = resolve;
        })
    );
    const topMock = vi.fn().mockReturnValue({ get: getMock });
    const selectMock = vi.fn().mockReturnValue({ top: topMock });
    const apiMock = vi.fn().mockReturnValue({ select: selectMock });
    mockedUseGraphClient.mockReturnValue({ api: apiMock } as never);

    const { result, rerender } = renderHook(() => usePeopleList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    providerState = 'SignedIn';
    rerender();
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(true);
    expect(apiMock).toHaveBeenCalledWith('/me/people');

    resolveGraphResponse?.({
      value: [
        {
          id: 'user-1',
          displayName: 'Test User',
          scoredEmailAddresses: [{ address: 'test.user@contoso.com' }],
        },
      ],
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('does not refetch userIds when rerendered with the same userIds array reference', async () => {
    const getPersonData = vi.fn().mockResolvedValue({
      user: {
        id: 'user-1',
        displayName: 'Adele Vance',
        mail: 'adelev@contoso.com',
        userPrincipalName: 'adelev@contoso.com',
      },
      presence: null,
      photoUrl: null,
    });

    mockedUseProvider.mockReturnValue({
      getPersonData,
    } as IProvider & IPersonDataProvider as never);

    const userIds = ['user-1'];
    const { result, rerender } = renderHook(
      ({ ids }) => usePeopleList({ userIds: ids }),
      {
        initialProps: { ids: userIds },
      }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    rerender({ ids: userIds });

    await act(async () => {
      await Promise.resolve();
    });

    expect(getPersonData).toHaveBeenCalledTimes(1);
  });

  it('loads group members from Graph when groupId is provided', async () => {
    mockedUseProvider.mockReturnValue({
      getPersonData: vi.fn().mockResolvedValue({
        user: null,
        presence: null,
        photoUrl: null,
      }),
    } as IProvider & IPersonDataProvider as never);

    const getMock = vi.fn().mockResolvedValue({
      value: [
        {
          id: 'user-1',
          displayName: 'Adele Vance',
          mail: 'adelev@contoso.com',
          userPrincipalName: 'adelev@contoso.com',
          jobTitle: 'Product Manager',
          department: 'Marketing',
        },
      ],
    });
    const topMock = vi.fn().mockReturnValue({ get: getMock });
    const selectMock = vi.fn().mockReturnValue({ top: topMock });
    const apiMock = vi.fn().mockReturnValue({ select: selectMock });

    mockedUseGraphClient.mockReturnValue({ api: apiMock } as never);

    const { result } = renderHook(() => usePeopleList({ groupId: 'group-1', maxPeople: 4 }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(apiMock).toHaveBeenCalledWith('/groups/group-1/members/microsoft.graph.user');
    expect(topMock).toHaveBeenCalledWith(4);
    expect(result.current.people).toEqual([
      {
        id: 'user-1',
        displayName: 'Adele Vance',
        mail: 'adelev@contoso.com',
        userPrincipalName: 'adelev@contoso.com',
        jobTitle: 'Product Manager',
        department: 'Marketing',
      },
    ]);
  });

  it('assigns stable unique fallback ids to Graph suggestions without ids or emails', async () => {
    mockedUseProvider.mockReturnValue({
      getPersonData: vi.fn().mockResolvedValue({
        user: null,
        presence: null,
        photoUrl: null,
      }),
    } as IProvider & IPersonDataProvider as never);

    const getMock = vi.fn().mockResolvedValue({
      value: [
        {
          displayName: 'Unknown Person',
        },
        {
          displayName: 'Unknown Person',
        },
      ],
    });
    const topMock = vi.fn().mockReturnValue({ get: getMock });
    const selectMock = vi.fn().mockReturnValue({ top: topMock });
    const apiMock = vi.fn().mockReturnValue({ select: selectMock });

    mockedUseGraphClient.mockReturnValue({ api: apiMock } as never);

    const { result } = renderHook(() => usePeopleList({ maxPeople: 2 }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.people).toHaveLength(2);
    expect(result.current.people[0]?.id).toBe('person-suggestion:Unknown Person:no-identity:0');
    expect(result.current.people[1]?.id).toBe('person-suggestion:Unknown Person:no-identity:1');
  });
});
