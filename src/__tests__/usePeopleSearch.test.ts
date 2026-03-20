import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { usePeopleSearch } from '../hooks/usePeopleSearch';
import { useGraphClient } from '../hooks/useGraphClient';
import { useProvider, useProviderState } from '../providers/ProviderContext';
import type { IProvider } from '../providers/IProvider';
import type { IPeopleSearchProvider } from '../providers/IPersonDataProvider';

vi.mock('../hooks/useGraphClient', () => ({
  useGraphClient: vi.fn(),
}));

vi.mock('../providers/ProviderContext', () => ({
  useProvider: vi.fn(),
  useProviderState: vi.fn(),
}));

describe('usePeopleSearch', () => {
  const mockedUseGraphClient = vi.mocked(useGraphClient);
  const mockedUseProvider = vi.mocked(useProvider);
  const mockedUseProviderState = vi.mocked(useProviderState);

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseGraphClient.mockReturnValue(null);
    mockedUseProvider.mockReturnValue(null);
    mockedUseProviderState.mockReturnValue('SignedIn');
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('loads initial Graph suggestions immediately from /users', async () => {
    const getMock = vi.fn().mockResolvedValue({
      value: [
        {
          id: 'graph-person-1',
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
    const apiMock = vi.fn((path: string) => {
      if (path === '/users') {
        return {
          select: selectMock,
        };
      }

      return {
        header: vi.fn(),
        search: vi.fn(),
        select: vi.fn(),
        top: vi.fn(),
        get: vi.fn(),
      };
    });

    mockedUseGraphClient.mockReturnValue({ api: apiMock } as never);
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');

    const { result } = renderHook(() => usePeopleSearch('', { loadInitialResults: true, maxResults: 5 }));

    expect(apiMock).toHaveBeenCalledWith('/users');
    expect(setTimeoutSpy).not.toHaveBeenCalled();
    expect(selectMock).toHaveBeenCalledWith('id,displayName,mail,userPrincipalName,jobTitle,department');
    expect(topMock).toHaveBeenCalledWith(5);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    setTimeoutSpy.mockRestore();

    expect(result.current.results).toEqual([
      {
        id: 'graph-person-1',
        displayName: 'Adele Vance',
        mail: 'adelev@contoso.com',
        userPrincipalName: 'adelev@contoso.com',
        jobTitle: 'Product Manager',
        department: 'Marketing',
      },
    ]);
  });

  it('does not turn a quotes-only query into initial suggestions', async () => {
    const apiMock = vi.fn();
    mockedUseGraphClient.mockReturnValue({ api: apiMock } as never);

    const { result } = renderHook(() =>
      usePeopleSearch('""', { loadInitialResults: true, minChars: 1 })
    );

    expect(apiMock).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.results).toEqual([]);
  });

  it('normalizes quoted provider queries before calling searchPeople', async () => {
    const searchPeople = vi.fn().mockResolvedValue([
      {
        id: '1',
        displayName: 'Adele Vance',
        mail: 'adelev@contoso.com',
        userPrincipalName: 'adelev@contoso.com',
        jobTitle: null,
        department: null,
      },
    ]);

    mockedUseProvider.mockReturnValue({
      searchPeople,
    } as IProvider & IPeopleSearchProvider as never);

    const { result } = renderHook(() =>
      usePeopleSearch('  "Adele"  ', { minChars: 1, maxResults: 3 })
    );

    await waitFor(() => {
      expect(searchPeople).toHaveBeenCalledWith('Adele', 3);
    });

    expect(result.current.results).toHaveLength(1);
  });
});
