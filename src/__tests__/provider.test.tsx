import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { GraphProvider, useProvider, useProviderState } from '../providers/ProviderContext';
import { MockProvider } from '../providers/MockProvider';
import { isPersonDataProvider } from '../providers/IPersonDataProvider';
import { IProvider } from '../providers/IProvider';
import { MsalBrowserProvider, RedirectInProgressError } from '../providers/MsalBrowserProvider';
import * as personCache from '../utils/personCache';

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

describe('GraphProvider person cache', () => {
  it('clears cached person data when the user signs out', async () => {
    const clearSpy = vi.spyOn(personCache, 'clearPersonCache').mockResolvedValue();
    const mock = new MockProvider({ autoSignIn: true });

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <GraphProvider provider={mock}>{children}</GraphProvider>
    );

    renderHook(() => useProviderState(), { wrapper });
    expect(clearSpy).not.toHaveBeenCalled();

    await act(async () => {
      await mock.logout();
    });
    expect(clearSpy).toHaveBeenCalledTimes(1);

    await act(async () => {
      await mock.login();
    });
    expect(clearSpy).toHaveBeenCalledTimes(1);

    clearSpy.mockRestore();
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

  it('trims custom identifiers before using them as mock UPN fallbacks', async () => {
    const provider = new MockProvider();
    const result = await provider.getPersonData({
      identifier: '  john@contoso.com  ',
      fetchPresence: false,
      fetchPhoto: false,
    });

    expect(result.user?.userPrincipalName).toBe('john@contoso.com');
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

describe('MsalBrowserProvider.getAccessToken', () => {
  const account = {
    homeAccountId: 'home-account-id',
    environment: 'login.microsoftonline.com',
    tenantId: 'tenant-id',
    username: 'user@contoso.com',
    localAccountId: 'local-account-id',
    name: 'Test User',
  };

  it('returns access token when silent acquisition succeeds', async () => {
    const acquireTokenSilent = vi.fn().mockResolvedValue({ accessToken: 'silent-token' });
    const acquireTokenRedirect = vi.fn().mockResolvedValue(undefined);

    const provider = new MsalBrowserProvider(
      {
        initialize: vi.fn().mockResolvedValue(undefined),
        handleRedirectPromise: vi.fn().mockResolvedValue(null),
        getActiveAccount: vi.fn().mockReturnValue(account),
        getAllAccounts: vi.fn().mockReturnValue([account]),
        setActiveAccount: vi.fn(),
        acquireTokenSilent,
        acquireTokenRedirect,
      } as never,
      ['User.Read']
    );

    const token = await provider.getAccessToken();

    expect(token).toBe('silent-token');
    expect(acquireTokenSilent).toHaveBeenCalledWith({ scopes: ['User.Read'], account });
    expect(acquireTokenRedirect).not.toHaveBeenCalled();
  });

  it('invokes acquireTokenRedirect and throws RedirectInProgressError when InteractionRequiredAuthError is caught', async () => {
    const interactionError = new InteractionRequiredAuthError('interaction_required');
    const acquireTokenSilent = vi.fn().mockRejectedValue(interactionError);
    const acquireTokenRedirect = vi.fn().mockResolvedValue(undefined);

    const provider = new MsalBrowserProvider(
      {
        initialize: vi.fn().mockResolvedValue(undefined),
        handleRedirectPromise: vi.fn().mockResolvedValue(null),
        getActiveAccount: vi.fn().mockReturnValue(account),
        getAllAccounts: vi.fn().mockReturnValue([account]),
        setActiveAccount: vi.fn(),
        acquireTokenSilent,
        acquireTokenRedirect,
      } as never,
      ['User.Read']
    );

    let caughtError: unknown;
    try {
      await provider.getAccessToken();
    } catch (e) {
      caughtError = e;
    }

    expect(caughtError).toBeInstanceOf(RedirectInProgressError);
    expect((caughtError as RedirectInProgressError).message).toBe('Redirecting for interactive token acquisition.');
    expect(acquireTokenRedirect).toHaveBeenCalledWith({ scopes: ['User.Read'], account });
  });

  it('uses provided scopes for redirect request when InteractionRequiredAuthError is caught', async () => {
    const interactionError = new InteractionRequiredAuthError('interaction_required');
    const acquireTokenSilent = vi.fn().mockRejectedValue(interactionError);
    const acquireTokenRedirect = vi.fn().mockResolvedValue(undefined);

    const provider = new MsalBrowserProvider(
      {
        initialize: vi.fn().mockResolvedValue(undefined),
        handleRedirectPromise: vi.fn().mockResolvedValue(null),
        getActiveAccount: vi.fn().mockReturnValue(account),
        getAllAccounts: vi.fn().mockReturnValue([account]),
        setActiveAccount: vi.fn(),
        acquireTokenSilent,
        acquireTokenRedirect,
      } as never,
      ['User.Read']
    );

    let caughtError: unknown;
    try {
      await provider.getAccessToken(['Mail.Read']);
    } catch (e) {
      caughtError = e;
    }

    expect(caughtError).toBeInstanceOf(RedirectInProgressError);
    expect((caughtError as RedirectInProgressError).message).toBe('Redirecting for interactive token acquisition.');
    expect(acquireTokenRedirect).toHaveBeenCalledWith({ scopes: ['Mail.Read'], account });
  });

  it('rethrows non-InteractionRequiredAuthError errors', async () => {
    const networkError = new Error('network failure');
    const acquireTokenSilent = vi.fn().mockRejectedValue(networkError);
    const acquireTokenRedirect = vi.fn();

    const provider = new MsalBrowserProvider(
      {
        initialize: vi.fn().mockResolvedValue(undefined),
        handleRedirectPromise: vi.fn().mockResolvedValue(null),
        getActiveAccount: vi.fn().mockReturnValue(account),
        getAllAccounts: vi.fn().mockReturnValue([account]),
        setActiveAccount: vi.fn(),
        acquireTokenSilent,
        acquireTokenRedirect,
      } as never,
      ['User.Read']
    );

    await expect(provider.getAccessToken()).rejects.toThrow('network failure');
    expect(acquireTokenRedirect).not.toHaveBeenCalled();
  });

  it('throws when there is no active account', async () => {
    const provider = new MsalBrowserProvider(
      {
        initialize: vi.fn().mockResolvedValue(undefined),
        handleRedirectPromise: vi.fn().mockResolvedValue(null),
        getActiveAccount: vi.fn().mockReturnValue(null),
        getAllAccounts: vi.fn().mockReturnValue([]),
        setActiveAccount: vi.fn(),
        acquireTokenSilent: vi.fn(),
        acquireTokenRedirect: vi.fn(),
      } as never,
      ['User.Read']
    );

    await expect(provider.getAccessToken()).rejects.toThrow(
      'No active account. User must sign in first.'
    );
  });
});

describe('MsalBrowserProvider.logout', () => {
  const account = {
    homeAccountId: 'home-account-id',
    environment: 'login.microsoftonline.com',
    tenantId: 'tenant-id',
    username: 'user@contoso.com',
    localAccountId: 'local-account-id',
    name: 'Test User',
  };

  it('clears account and sets SignedOut state before calling logoutRedirect', async () => {
    const setActiveAccount = vi.fn();
    let stateAtLogoutTime: string | undefined;
    let activeAccountAtLogoutTime: unknown;

    const logoutRedirect = vi.fn().mockImplementation(() => {
      // Capture state and account at the moment logoutRedirect is called
      stateAtLogoutTime = provider.getState();
      activeAccountAtLogoutTime = setActiveAccount.mock.calls.at(-1)?.[0];
      return Promise.resolve();
    });

    const provider = new MsalBrowserProvider(
      {
        initialize: vi.fn().mockResolvedValue(undefined),
        handleRedirectPromise: vi.fn().mockResolvedValue({ account }),
        getActiveAccount: vi.fn().mockReturnValue(account),
        getAllAccounts: vi.fn().mockReturnValue([account]),
        setActiveAccount,
        logoutRedirect,
      } as never,
      ['User.Read']
    );

    await provider.initialize();
    expect(provider.getState()).toBe('SignedIn');

    await provider.logout();

    expect(stateAtLogoutTime).toBe('SignedOut');
    expect(activeAccountAtLogoutTime).toBeNull();
    expect(logoutRedirect).toHaveBeenCalledTimes(1);
  });

  it('calls logoutRedirect with the active account', async () => {
    const logoutRedirect = vi.fn().mockResolvedValue(undefined);

    const provider = new MsalBrowserProvider(
      {
        initialize: vi.fn().mockResolvedValue(undefined),
        handleRedirectPromise: vi.fn().mockResolvedValue({ account }),
        getActiveAccount: vi.fn().mockReturnValue(account),
        getAllAccounts: vi.fn().mockReturnValue([account]),
        setActiveAccount: vi.fn(),
        logoutRedirect,
      } as never,
      ['User.Read']
    );

    await provider.initialize();
    await provider.logout();

    expect(logoutRedirect).toHaveBeenCalledWith({ account });
  });

  it('notifies state listeners when logout is called', async () => {
    const handler = vi.fn();
    const logoutRedirect = vi.fn().mockResolvedValue(undefined);

    const provider = new MsalBrowserProvider(
      {
        initialize: vi.fn().mockResolvedValue(undefined),
        handleRedirectPromise: vi.fn().mockResolvedValue({ account }),
        getActiveAccount: vi.fn().mockReturnValue(account),
        getAllAccounts: vi.fn().mockReturnValue([account]),
        setActiveAccount: vi.fn(),
        logoutRedirect,
      } as never,
      ['User.Read']
    );

    await provider.initialize();
    provider.onStateChanged(handler);

    await provider.logout();

    expect(handler).toHaveBeenCalledTimes(1);
    expect(provider.getState()).toBe('SignedOut');
  });

  it('uses cached account when getActiveAccount returns null', async () => {
    const logoutRedirect = vi.fn().mockResolvedValue(undefined);

    const provider = new MsalBrowserProvider(
      {
        initialize: vi.fn().mockResolvedValue(undefined),
        // Redirect response sets the cached account
        handleRedirectPromise: vi.fn().mockResolvedValue({ account }),
        // getActiveAccount always returns null (e.g. after another tab cleared it)
        getActiveAccount: vi.fn().mockReturnValue(null),
        getAllAccounts: vi.fn().mockReturnValue([]),
        setActiveAccount: vi.fn(),
        logoutRedirect,
      } as never,
      ['User.Read']
    );

    await provider.initialize();
    await provider.logout();

    expect(logoutRedirect).toHaveBeenCalledWith({ account });
  });

  it('calls logoutRedirect with undefined account when no account is available', async () => {
    const logoutRedirect = vi.fn().mockResolvedValue(undefined);

    const provider = new MsalBrowserProvider(
      {
        initialize: vi.fn().mockResolvedValue(undefined),
        handleRedirectPromise: vi.fn().mockResolvedValue(null),
        getActiveAccount: vi.fn().mockReturnValue(null),
        getAllAccounts: vi.fn().mockReturnValue([]),
        setActiveAccount: vi.fn(),
        logoutRedirect,
      } as never,
      ['User.Read']
    );

    await provider.initialize();
    await provider.logout();

    expect(logoutRedirect).toHaveBeenCalledWith({ account: undefined });
  });
});

describe('MsalBrowserProvider.initialize failures', () => {
  const account = {
    homeAccountId: 'home-account-id',
    environment: 'login.microsoftonline.com',
    tenantId: 'tenant-id',
    username: 'user@contoso.com',
    localAccountId: 'local-account-id',
    name: 'Test User',
  };

  it('leaves Loading and rethrows when redirect handling fails without a cached account', async () => {
    const redirectError = new Error('redirect failed');
    const provider = new MsalBrowserProvider(
      {
        initialize: vi.fn().mockResolvedValue(undefined),
        handleRedirectPromise: vi.fn().mockRejectedValue(redirectError),
        getActiveAccount: vi.fn().mockReturnValue(null),
        getAllAccounts: vi.fn().mockReturnValue([]),
        setActiveAccount: vi.fn(),
      } as never,
      ['User.Read']
    );
    const listener = vi.fn();
    provider.onStateChanged(listener);

    await expect(provider.initialize()).rejects.toBe(redirectError);

    expect(provider.getState()).toBe('SignedOut');
    expect(listener).toHaveBeenCalled();
  });

  it('keeps a cached account signed in when redirect handling fails', async () => {
    const redirectError = new Error('redirect failed');
    const setActiveAccount = vi.fn();
    const provider = new MsalBrowserProvider(
      {
        initialize: vi.fn().mockResolvedValue(undefined),
        handleRedirectPromise: vi.fn().mockRejectedValue(redirectError),
        getActiveAccount: vi.fn().mockReturnValue(null),
        getAllAccounts: vi.fn().mockReturnValue([account]),
        setActiveAccount,
      } as never,
      ['User.Read']
    );

    await expect(provider.initialize()).rejects.toBe(redirectError);

    expect(provider.getState()).toBe('SignedIn');
    expect(setActiveAccount).toHaveBeenCalledWith(account);
  });

  it('sets SignedOut and rethrows when MSAL initialization fails', async () => {
    const initError = new Error('init failed');
    const handleRedirectPromise = vi.fn();
    const provider = new MsalBrowserProvider(
      {
        initialize: vi.fn().mockRejectedValue(initError),
        handleRedirectPromise,
      } as never,
      ['User.Read']
    );

    await expect(provider.initialize()).rejects.toBe(initError);

    expect(provider.getState()).toBe('SignedOut');
    expect(handleRedirectPromise).not.toHaveBeenCalled();
  });
});

describe('MsalBrowserProvider interaction-required detection', () => {
  it('redirects for an interaction-required error from a different copy of MSAL', async () => {
    // Simulates the app and this library resolving separate copies of @azure/msal-browser,
    // where an `instanceof` check against our copy of the class would fail.
    class InteractionRequiredAuthError extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'InteractionRequiredAuthError';
      }
    }

    const account = { homeAccountId: 'home-account-id' };
    const acquireTokenRedirect = vi.fn().mockResolvedValue(undefined);
    const provider = new MsalBrowserProvider(
      {
        getActiveAccount: vi.fn().mockReturnValue(account),
        acquireTokenSilent: vi
          .fn()
          .mockRejectedValue(new InteractionRequiredAuthError('interaction_required')),
        acquireTokenRedirect,
      } as never,
      ['User.Read']
    );

    await expect(provider.getAccessToken()).rejects.toBeInstanceOf(RedirectInProgressError);
    expect(acquireTokenRedirect).toHaveBeenCalledWith({ scopes: ['User.Read'], account });
  });
});

describe('MsalBrowserProvider.getAccountId', () => {
  it('returns the home account ID of the active account', () => {
    const provider = new MsalBrowserProvider(
      {
        getActiveAccount: vi.fn().mockReturnValue({ homeAccountId: 'home-account-id' }),
      } as never,
      ['User.Read']
    );

    expect(provider.getAccountId()).toBe('home-account-id');
  });

  it('returns null when no account is signed in', () => {
    const provider = new MsalBrowserProvider(
      { getActiveAccount: vi.fn().mockReturnValue(null) } as never,
      ['User.Read']
    );

    expect(provider.getAccountId()).toBeNull();
  });
});
