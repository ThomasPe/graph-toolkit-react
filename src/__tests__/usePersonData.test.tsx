import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { User } from '@microsoft/microsoft-graph-types';
import { usePersonData } from '../hooks/usePersonData';
import { useGraphClient } from '../hooks/useGraphClient';
import { usePersonCacheOptions, useProvider, useProviderState } from '../providers/ProviderContext';
import * as personCache from '../utils/personCache';

vi.mock('../hooks/useGraphClient', () => ({
  useGraphClient: vi.fn(),
}));

vi.mock('../providers/ProviderContext', () => ({
  useProvider: vi.fn(),
  useProviderState: vi.fn(),
  usePersonCacheOptions: vi.fn(),
}));

vi.mock('../utils/personCache', () => ({
  USER_CACHE_TTL_MS: 60 * 60 * 1000,
  PHOTO_CACHE_TTL_MS: 60 * 60 * 1000,
  PRESENCE_CACHE_TTL_MS: 5 * 60 * 1000,
  getPersonCacheKey: vi.fn((identifier: string) => `person:${identifier.trim().toLowerCase()}`),
  isTimestampFresh: vi.fn((timestamp: number | undefined, ttlMs: number) => {
    if (!timestamp) {
      return false;
    }
    return Date.now() - timestamp < ttlMs;
  }),
  readPersonCache: vi.fn(),
  writePersonCache: vi.fn(),
}));

describe('usePersonData caching', () => {
  const mockedUseGraphClient = vi.mocked(useGraphClient);
  const mockedUseProvider = vi.mocked(useProvider);
  const mockedUseProviderState = vi.mocked(useProviderState);
  const mockedUsePersonCacheOptions = vi.mocked(usePersonCacheOptions);
  const mockedReadPersonCache = vi.mocked(personCache.readPersonCache);
  const mockedWritePersonCache = vi.mocked(personCache.writePersonCache);

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseProvider.mockReturnValue({} as never);
    mockedUseProviderState.mockReturnValue('SignedIn');
    mockedUsePersonCacheOptions.mockReturnValue({
      enabled: true,
      userTtlMs: 60 * 60 * 1000,
      photoTtlMs: 60 * 60 * 1000,
      presenceTtlMs: 5 * 60 * 1000,
    });
    mockedReadPersonCache.mockResolvedValue(null);
    mockedWritePersonCache.mockResolvedValue();
  });

  it('returns fully cached data without calling Graph', async () => {
    const now = Date.now();
    const cachedUser = {
      id: 'user-1',
      displayName: 'Cached User',
      userPrincipalName: 'cached@contoso.com',
    } as User;

    mockedReadPersonCache.mockResolvedValue({
      user: cachedUser,
      userCachedAt: now,
      presence: {
        id: 'user-1',
        availability: 'Available',
      },
      presenceCachedAt: now,
      photoUrl: 'data:image/png;base64,AAAA',
      photoCachedAt: now,
    });

    const apiMock = vi.fn();
    mockedUseGraphClient.mockReturnValue({ api: apiMock } as never);

    const { result } = renderHook(() =>
      usePersonData({
        userId: 'user-1',
        fetchPresence: true,
        fetchPhoto: true,
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user?.displayName).toBe('Cached User');
    expect(result.current.presence?.availability).toBe('Available');
    expect(result.current.photoUrl).toBe('data:image/png;base64,AAAA');
    expect(apiMock).not.toHaveBeenCalled();
    expect(mockedWritePersonCache).not.toHaveBeenCalled();
  });

  it('reuses cached user and refreshes stale presence only', async () => {
    const now = Date.now();
    const stale = now - 10 * 60 * 1000;
    const cachedUser = {
      id: 'user-1',
      displayName: 'Cached User',
      userPrincipalName: 'cached@contoso.com',
    } as User;

    mockedReadPersonCache.mockResolvedValue({
      user: cachedUser,
      userCachedAt: now,
      presence: {
        id: 'user-1',
        availability: 'Offline',
      },
      presenceCachedAt: stale,
    });

    const presenceGetMock = vi.fn().mockResolvedValue({
      id: 'user-1',
      availability: 'Available',
    });

    const apiMock = vi.fn((path: string) => {
      if (path === '/users/user-1/presence') {
        return {
          get: presenceGetMock,
        };
      }

      return {
        select: () => ({
          get: vi.fn(),
        }),
      };
    });

    mockedUseGraphClient.mockReturnValue({ api: apiMock } as never);

    const { result } = renderHook(() =>
      usePersonData({
        userId: 'user-1',
        fetchPresence: true,
        fetchPhoto: false,
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user?.displayName).toBe('Cached User');
    expect(result.current.presence?.availability).toBe('Available');
    expect(apiMock).toHaveBeenCalledWith('/users/user-1/presence');
    expect(apiMock).not.toHaveBeenCalledWith('/users/user-1');
    expect(mockedWritePersonCache).toHaveBeenCalledTimes(1);
  });

  it('bypasses cache when disabled and fetches from Graph', async () => {
    mockedUsePersonCacheOptions.mockReturnValue({
      enabled: false,
      userTtlMs: 60 * 60 * 1000,
      photoTtlMs: 60 * 60 * 1000,
      presenceTtlMs: 5 * 60 * 1000,
    });

    mockedReadPersonCache.mockResolvedValue({
      user: {
        id: 'user-1',
        displayName: 'Should Not Use Cache',
      } as User,
      userCachedAt: Date.now(),
    });

    const userGetMock = vi.fn().mockResolvedValue({
      id: 'user-1',
      displayName: 'Fetched User',
      userPrincipalName: 'fetched@contoso.com',
    });

    const apiMock = vi.fn((path: string) => {
      if (path === '/users/user-1') {
        return {
          select: () => ({
            get: userGetMock,
          }),
        };
      }

      return {
        get: vi.fn().mockResolvedValue(null),
      };
    });

    mockedUseGraphClient.mockReturnValue({ api: apiMock } as never);

    const { result } = renderHook(() =>
      usePersonData({
        userId: 'user-1',
        fetchPresence: false,
        fetchPhoto: false,
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user?.displayName).toBe('Fetched User');
    expect(mockedReadPersonCache).not.toHaveBeenCalled();
    expect(mockedWritePersonCache).not.toHaveBeenCalled();
    expect(apiMock).toHaveBeenCalledWith('/users/user-1');
  });
});
