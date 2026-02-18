import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { User, Presence } from '@microsoft/microsoft-graph-types';
import { usePersonData } from '../hooks/usePersonData';
import { useGraphClient } from '../hooks/useGraphClient';
import { usePersonCacheOptions, useProvider, useProviderState } from '../providers/ProviderContext';
import * as personCache from '../utils/personCache';
import { IProvider } from '../providers/IProvider';
import { IPersonDataProvider } from '../providers/IPersonDataProvider';

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

describe('usePersonData with IPersonDataProvider', () => {
  const mockedUseGraphClient = vi.mocked(useGraphClient);
  const mockedUseProvider = vi.mocked(useProvider);
  const mockedUseProviderState = vi.mocked(useProviderState);
  const mockedUsePersonCacheOptions = vi.mocked(usePersonCacheOptions);

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseProviderState.mockReturnValue('SignedIn');
    mockedUsePersonCacheOptions.mockReturnValue({
      enabled: true,
      userTtlMs: 60 * 60 * 1000,
      photoTtlMs: 60 * 60 * 1000,
      presenceTtlMs: 5 * 60 * 1000,
    });
  });

  it('delegates to provider.getPersonData when provider implements IPersonDataProvider', async () => {
    const mockUser: User = {
      id: 'provider-user-1',
      displayName: 'Provider User',
      userPrincipalName: 'provider@contoso.com',
    } as User;

    const mockPresence: Presence = {
      id: 'provider-user-1',
      availability: 'Busy',
      activity: 'InACall',
    } as Presence;

    const getPersonDataMock = vi.fn().mockResolvedValue({
      user: mockUser,
      presence: mockPresence,
      photoUrl: 'data:image/png;base64,MOCK',
    });

    const providerWithData: IProvider & IPersonDataProvider = {
      getAccessToken: vi.fn().mockResolvedValue('token'),
      login: vi.fn(),
      logout: vi.fn(),
      getState: vi.fn().mockReturnValue('SignedIn'),
      getPersonData: getPersonDataMock,
    };

    mockedUseProvider.mockReturnValue(providerWithData);
    mockedUseGraphClient.mockReturnValue(null);

    const { result } = renderHook(() =>
      usePersonData({
        userId: 'provider-user-1',
        fetchPresence: true,
        fetchPhoto: true,
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(getPersonDataMock).toHaveBeenCalledWith({
      identifier: 'provider-user-1',
      fetchPresence: true,
      fetchPhoto: true,
    });
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.presence).toEqual(mockPresence);
    expect(result.current.photoUrl).toBe('data:image/png;base64,MOCK');
    expect(result.current.error).toBeNull();
  });

  it('does not delegate to provider.getPersonData when provider does not implement IPersonDataProvider', async () => {
    const mockedReadPersonCache = vi.mocked(personCache.readPersonCache);
    const mockedWritePersonCache = vi.mocked(personCache.writePersonCache);

    mockedReadPersonCache.mockResolvedValue(null);
    mockedWritePersonCache.mockResolvedValue();

    const provider: IProvider = {
      getAccessToken: vi.fn().mockResolvedValue('token'),
      login: vi.fn(),
      logout: vi.fn(),
      getState: vi.fn().mockReturnValue('SignedIn'),
    };

    mockedUseProvider.mockReturnValue(provider);

    const userGetMock = vi.fn().mockResolvedValue({
      id: 'user-1',
      displayName: 'Graph User',
      userPrincipalName: 'graph@contoso.com',
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

    // Should fall through to Graph API calls instead of using provider
    expect(apiMock).toHaveBeenCalledWith('/users/user-1');
    expect(result.current.user?.displayName).toBe('Graph User');
  });

  it('uses provider.getPersonData with correct parameters for userPrincipalName', async () => {
    const mockUser: User = {
      id: 'upn-user-1',
      displayName: 'UPN User',
      userPrincipalName: 'upn@contoso.com',
    } as User;

    const getPersonDataMock = vi.fn().mockResolvedValue({
      user: mockUser,
      presence: null,
      photoUrl: null,
    });

    const providerWithData: IProvider & IPersonDataProvider = {
      getAccessToken: vi.fn().mockResolvedValue('token'),
      login: vi.fn(),
      logout: vi.fn(),
      getState: vi.fn().mockReturnValue('SignedIn'),
      getPersonData: getPersonDataMock,
    };

    mockedUseProvider.mockReturnValue(providerWithData);
    mockedUseGraphClient.mockReturnValue(null);

    const { result } = renderHook(() =>
      usePersonData({
        userPrincipalName: 'upn@contoso.com',
        fetchPresence: false,
        fetchPhoto: false,
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(getPersonDataMock).toHaveBeenCalledWith({
      identifier: 'upn@contoso.com',
      fetchPresence: false,
      fetchPhoto: false,
    });
    expect(result.current.user).toEqual(mockUser);
  });

  it('handles provider.getPersonData returning null values gracefully', async () => {
    const getPersonDataMock = vi.fn().mockResolvedValue({
      user: null,
      presence: null,
      photoUrl: null,
    });

    const providerWithData: IProvider & IPersonDataProvider = {
      getAccessToken: vi.fn().mockResolvedValue('token'),
      login: vi.fn(),
      logout: vi.fn(),
      getState: vi.fn().mockReturnValue('SignedIn'),
      getPersonData: getPersonDataMock,
    };

    mockedUseProvider.mockReturnValue(providerWithData);
    mockedUseGraphClient.mockReturnValue(null);

    const { result } = renderHook(() =>
      usePersonData({
        userId: 'nonexistent',
        fetchPresence: true,
        fetchPhoto: true,
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.presence).toBeNull();
    expect(result.current.photoUrl).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
