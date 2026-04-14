import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { usePeopleList } from '../hooks/usePeopleList';
import { useGraphClient } from '../hooks/useGraphClient';
import { useProvider, useProviderState } from '../providers/ProviderContext';
import type { IProvider } from '../providers/IProvider';
import type { IPersonDataProvider } from '../providers/IPersonDataProvider';

type GraphUsersResponse = {
  value: Array<{
    id: string;
    givenName?: string | null;
    surname?: string | null;
    displayName: string;
    mail?: string | null;
    userPrincipalName?: string | null;
    jobTitle?: string | null;
    department?: string | null;
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

  it('prefers userPrincipalName or mail over a local id when enriching supplied people', async () => {
    const getPersonData = vi.fn().mockResolvedValue({
      user: {
        id: 'user-1',
        displayName: 'Adele Vance',
        mail: 'adelev@contoso.com',
        userPrincipalName: 'adelev@contoso.com',
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
            id: 'adele',
            displayName: 'Adele Vance',
            mail: 'adelev@contoso.com',
          },
        ],
        showPresence: false,
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(getPersonData).toHaveBeenCalledTimes(1);
    expect(getPersonData).toHaveBeenNthCalledWith(1, {
      identifier: 'adelev@contoso.com',
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

    let resolveGraphResponse: ((value: GraphUsersResponse) => void) | undefined;
    const getMock = vi.fn().mockImplementation(
      () =>
        new Promise<GraphUsersResponse>(resolve => {
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
    expect(apiMock).toHaveBeenCalledWith('/users');

    resolveGraphResponse?.({
      value: [
        {
          id: 'user-1',
          displayName: 'Test User',
          mail: 'test.user@contoso.com',
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

  it('does not refetch when rerendered with equivalent selectFields values', async () => {
    const getPersonData = vi.fn().mockResolvedValue({
      user: {
        id: 'user-1',
        displayName: 'Adele Vance',
        givenName: 'Adele',
        surname: 'Vance',
        mail: 'adelev@contoso.com',
        userPrincipalName: 'adelev@contoso.com',
      },
      presence: null,
      photoUrl: null,
    });

    mockedUseProvider.mockReturnValue({
      getPersonData,
    } as IProvider & IPersonDataProvider as never);

    const { result, rerender } = renderHook(
      ({ fields }) => usePeopleList({ userIds: ['user-1'], sortBy: 'surname', selectFields: fields }),
      {
        initialProps: { fields: ['givenName', 'surname'] },
      }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    rerender({ fields: ['givenName', 'surname'] });

    await act(async () => {
      await Promise.resolve();
    });

    expect(getPersonData).toHaveBeenCalledTimes(1);
  });

  it('sorts resolved userIds by surname and forwards normalized custom fields to the provider', async () => {
    const directory = new Map([
      ['user-3', { id: 'user-3', displayName: 'Charlie Adams', givenName: 'Charlie', surname: 'Adams' }],
      ['user-1', { id: 'user-1', displayName: 'Adele Zane', givenName: 'Adele', surname: 'Zane' }],
      ['user-2', { id: 'user-2', displayName: 'Ben Cooper', givenName: 'Ben', surname: 'Cooper' }],
    ]);

    const getPersonData = vi.fn().mockImplementation(async ({ identifier }) => ({
      user: directory.get(identifier),
      presence: null,
      photoUrl: null,
    }));

    mockedUseProvider.mockReturnValue({
      getPersonData,
    } as IProvider & IPersonDataProvider as never);

    const { result } = renderHook(() =>
      usePeopleList({
        userIds: ['user-3', 'user-1', 'user-2'],
        sortBy: 'surname',
        selectFields: ['  givenName  ', '', 'bad&field', 'surname'],
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.people.map(person => person.id)).toEqual(['user-3', 'user-2', 'user-1']);
    expect(getPersonData).toHaveBeenNthCalledWith(1, {
      identifier: 'user-3',
      fetchPresence: false,
      fetchPhoto: true,
      selectFields: ['givenName', 'surname'],
    });
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

    const { result } = renderHook(() => usePeopleList({ groupId: 'group#1', maxPeople: 4 }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(apiMock).toHaveBeenCalledWith('/groups/group%231/members/microsoft.graph.user');
    expect(topMock).toHaveBeenCalledWith(4);
    expect(result.current.people).toEqual([
      {
        id: 'user-1',
        givenName: null,
        surname: null,
        displayName: 'Adele Vance',
        mail: 'adelev@contoso.com',
        userPrincipalName: 'adelev@contoso.com',
        jobTitle: 'Product Manager',
        department: 'Marketing',
      },
    ]);
  });

  it('adds the requested sort field to Graph select queries and sorts the result', async () => {
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
          id: 'user-2',
          givenName: 'Zoe',
          displayName: 'Zoe Hall',
          mail: 'zoe.hall@contoso.com',
        },
        {
          id: 'user-1',
          givenName: 'Adele',
          displayName: 'Adele Vance',
          mail: 'adele.vance@contoso.com',
        },
      ],
    });
    const topMock = vi.fn().mockReturnValue({ get: getMock });
    const selectMock = vi.fn().mockReturnValue({ top: topMock });
    const apiMock = vi.fn().mockReturnValue({ select: selectMock });

    mockedUseGraphClient.mockReturnValue({ api: apiMock } as never);

    const { result } = renderHook(() => usePeopleList({ maxPeople: 2, sortBy: 'givenName' }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(selectMock).toHaveBeenCalledWith('id,displayName,mail,userPrincipalName,jobTitle,department,givenName');
    expect(result.current.people.map(person => person.id)).toEqual(['user-1', 'user-2']);
  });

  it('loads default tenant users from Graph when no explicit source is provided', async () => {
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
          displayName: 'Unknown Person',
          mail: 'unknown.person@contoso.com',
          userPrincipalName: 'unknown.person@contoso.com',
          jobTitle: 'Designer',
          department: 'Marketing',
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

    expect(apiMock).toHaveBeenCalledWith('/users');
    expect(result.current.people).toEqual([
      {
        id: 'user-1',
        givenName: null,
        surname: null,
        displayName: 'Unknown Person',
        mail: 'unknown.person@contoso.com',
        userPrincipalName: 'unknown.person@contoso.com',
        jobTitle: 'Designer',
        department: 'Marketing',
      },
    ]);
  });
});
