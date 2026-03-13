import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { GraphProvider, useProvider, useProviderState } from '../providers/ProviderContext';
import { MockProvider } from '../providers/MockProvider';
import { isPersonDataProvider } from '../providers/IPersonDataProvider';
import { IProvider } from '../providers/IProvider';
import { MsalBrowserProvider } from '../providers/MsalBrowserProvider';

describe('ProviderContext', () => {
  it('exposes provider and state transitions', async () => {
    const mock = new MockProvider();

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <GraphProvider provider={mock}>{children}</GraphProvider>
    );

    const { result: providerResult } = renderHook(() => useProvider(), { wrapper });
    const { result: stateResult } = renderHook(() => useProviderState(), { wrapper });

    expect(providerResult.current).toBe(mock);
    expect(stateResult.current).toBe('SignedOut');

    await act(async () => {
      await mock.login();
    });

    expect(stateResult.current).toBe('SignedIn');

    await act(async () => {
      await mock.logout();
    });
    expect(stateResult.current).toBe('SignedOut');
  });
});

describe('isPersonDataProvider', () => {
  it('returns true for MockProvider which implements IPersonDataProvider', () => {
    const provider = new MockProvider();
    expect(isPersonDataProvider(provider)).toBe(true);
  });

  it('returns false for null provider', () => {
    expect(isPersonDataProvider(null)).toBe(false);
  });

  it('returns false for provider without getPersonData method', () => {
    const provider: IProvider = {
      getAccessToken: async () => 'token',
      login: async () => {},
      logout: async () => {},
      getState: () => 'SignedIn',
    };
    expect(isPersonDataProvider(provider)).toBe(false);
  });

  it('returns false for provider with non-function getPersonData', () => {
    const provider = {
      getAccessToken: async () => 'token',
      login: async () => {},
      logout: async () => {},
      getState: () => 'SignedIn',
      getPersonData: 'not-a-function',
    } as unknown as IProvider;
    expect(isPersonDataProvider(provider)).toBe(false);
  });
});

describe('MockProvider.getPersonData', () => {
  it('returns mock user data with default values', async () => {
    const provider = new MockProvider();
    const result = await provider.getPersonData({
      identifier: 'me',
      fetchPresence: false,
      fetchPhoto: false,
    });

    expect(result.user).toBeDefined();
    expect(result.user?.displayName).toBe('Adele Vance');
    expect(result.user?.userPrincipalName).toBe('adelev@contoso.com');
    expect(result.user?.jobTitle).toBe('Product Manager');
    expect(result.user?.department).toBe('Marketing');
    expect(result.presence).toBeNull();
    expect(result.photoUrl).toBeNull();
  });

  it('returns mock presence when fetchPresence is true', async () => {
    const provider = new MockProvider();
    const result = await provider.getPersonData({
      identifier: 'me',
      fetchPresence: true,
      fetchPhoto: false,
    });

    expect(result.presence).toBeDefined();
    expect(result.presence?.availability).toBe('Available');
    expect(result.presence?.activity).toBe('Available');
  });

  it('returns mock photo when fetchPhoto is true', async () => {
    const provider = new MockProvider();
    const result = await provider.getPersonData({
      identifier: 'me',
      fetchPresence: false,
      fetchPhoto: true,
    });

    expect(result.photoUrl).toBeDefined();
    expect(result.photoUrl).toMatch(/^data:image/);
  });

  it('uses custom identifier when provided', async () => {
    const provider = new MockProvider();
    const customIdentifier = 'john@contoso.com';
    const result = await provider.getPersonData({
      identifier: customIdentifier,
      fetchPresence: false,
      fetchPhoto: false,
    });

    expect(result.user?.userPrincipalName).toBe(customIdentifier);
  });

  it('returns all data when all fetch options are true', async () => {
    const provider = new MockProvider();
    const result = await provider.getPersonData({
      identifier: 'me',
      fetchPresence: true,
      fetchPhoto: true,
    });

    expect(result.user).toBeDefined();
    expect(result.presence).toBeDefined();
    expect(result.photoUrl).toBeDefined();
    expect(result.user?.displayName).toBe('Adele Vance');
    expect(result.presence?.availability).toBe('Available');
    expect(result.photoUrl).toMatch(/^data:image/);
  });
});

describe('MsalBrowserProvider.initialize', () => {
  it('processes redirect response and signs in when account is returned', async () => {
    const account = {
      homeAccountId: 'home-account-id',
      environment: 'login.microsoftonline.com',
      tenantId: 'tenant-id',
      username: 'user@contoso.com',
      localAccountId: 'local-account-id',
      name: 'Test User',
    };

    const initialize = vi.fn().mockResolvedValue(undefined);
    const handleRedirectPromise = vi.fn().mockResolvedValue({ account });
    const getActiveAccount = vi.fn().mockReturnValue(null);
    const getAllAccounts = vi.fn().mockReturnValue([]);
    const setActiveAccount = vi.fn();

    const provider = new MsalBrowserProvider(
      {
        initialize,
        handleRedirectPromise,
        getActiveAccount,
        getAllAccounts,
        setActiveAccount,
      } as never,
      ['User.Read']
    );

    await provider.initialize();

    expect(initialize).toHaveBeenCalledTimes(1);
    expect(handleRedirectPromise).toHaveBeenCalledTimes(1);
    expect(setActiveAccount).toHaveBeenCalledWith(account);
    expect(provider.getState()).toBe('SignedIn');
  });

  it('falls back to cached account when no redirect response', async () => {
    const account = {
      homeAccountId: 'home-account-id',
      environment: 'login.microsoftonline.com',
      tenantId: 'tenant-id',
      username: 'user@contoso.com',
      localAccountId: 'local-account-id',
      name: 'Test User',
    };

    const initialize = vi.fn().mockResolvedValue(undefined);
    const handleRedirectPromise = vi.fn().mockResolvedValue(null);
    const getActiveAccount = vi.fn().mockReturnValue(null);
    const getAllAccounts = vi.fn().mockReturnValue([account]);
    const setActiveAccount = vi.fn();

    const provider = new MsalBrowserProvider(
      {
        initialize,
        handleRedirectPromise,
        getActiveAccount,
        getAllAccounts,
        setActiveAccount,
      } as never,
      ['User.Read']
    );

    await provider.initialize();

    expect(handleRedirectPromise).toHaveBeenCalledTimes(1);
    expect(setActiveAccount).toHaveBeenCalledWith(account);
    expect(provider.getState()).toBe('SignedIn');
  });

  it('sets SignedOut when there is no cached account', async () => {
    const provider = new MsalBrowserProvider(
      {
        initialize: vi.fn().mockResolvedValue(undefined),
        handleRedirectPromise: vi.fn().mockResolvedValue(null),
        getActiveAccount: vi.fn().mockReturnValue(null),
        getAllAccounts: vi.fn().mockReturnValue([]),
        setActiveAccount: vi.fn(),
      } as never,
      ['User.Read']
    );

    await provider.initialize();

    expect(provider.getState()).toBe('SignedOut');
  });
});
