/**
 * Native MSAL browser provider for Graph Toolkit React
 */

import type { AccountInfo, IPublicClientApplication, RedirectRequest, SilentRequest } from '@azure/msal-browser';
import { IProvider, ProviderState } from './IProvider';
import { clearPersonCache } from '../utils/personCache';

/**
 * Detects MSAL's `InteractionRequiredAuthError` without importing the class.
 *
 * An `instanceof` check only works when this library and the consuming app share the
 * exact same copy of `@azure/msal-browser`. Matching on the error name works across
 * copies and keeps `@azure/msal-browser` a types-only (truly optional) dependency.
 *
 * @param error - The error thrown by `acquireTokenSilent`
 * @returns True when MSAL requires user interaction to issue the token
 */
const isInteractionRequiredError = (error: unknown): boolean =>
  typeof error === 'object' &&
  error !== null &&
  (error as { name?: unknown }).name === 'InteractionRequiredAuthError';

/**
 * Error indicating that an interactive redirect has been initiated and token acquisition
 * will continue after navigation completes.
 */
export class RedirectInProgressError extends Error {
  /**
   * Creates a new instance of RedirectInProgressError.
   *
   * @param message - A human-readable description of the redirect state.
   */
  constructor(message: string) {
    super(message);
    this.name = 'RedirectInProgressError';
  }
}

export class MsalBrowserProvider implements IProvider {
  private readonly msalInstance: IPublicClientApplication;
  private readonly defaultScopes: string[];
  private account: AccountInfo | null = null;
  private state: ProviderState = 'Loading';
  private listeners: Array<() => void> = [];

  constructor(msalInstance: IPublicClientApplication, defaultScopes: string[]) {
    this.msalInstance = msalInstance;
    this.defaultScopes = defaultScopes;
  }

  /**
   * Initializes MSAL, completes a pending redirect and resolves the signed-in account.
   *
   * The provider always leaves the `Loading` state. If MSAL initialization or redirect
   * handling fails, the state is resolved from any cached account (otherwise `SignedOut`)
   * and the original error is rethrown so the app can surface it.
   */
  async initialize(): Promise<void> {
    try {
      await this.msalInstance.initialize();
    } catch (error) {
      this.account = null;
      this.setState('SignedOut');
      throw error;
    }

    let redirectError: unknown;
    let hasRedirectError = false;

    try {
      const response = await this.msalInstance.handleRedirectPromise();
      if (response?.account) {
        this.account = response.account;
        this.msalInstance.setActiveAccount(this.account);
        this.setState('SignedIn');
        return;
      }
    } catch (error) {
      redirectError = error;
      hasRedirectError = true;
    }

    try {
      const active = this.msalInstance.getActiveAccount();
      const accounts = this.msalInstance.getAllAccounts();

      this.account = active ?? accounts[0] ?? null;
      if (this.account) {
        this.msalInstance.setActiveAccount(this.account);
      }
    } catch (error) {
      this.account = null;
      if (!hasRedirectError) {
        redirectError = error;
        hasRedirectError = true;
      }
    }

    this.setState(this.account ? 'SignedIn' : 'SignedOut');

    if (hasRedirectError) {
      throw redirectError;
    }
  }

  async login(): Promise<void> {
    const request: RedirectRequest = { scopes: this.defaultScopes };
    await this.msalInstance.loginRedirect(request);
  }

  async logout(): Promise<void> {
    const account = this.msalInstance.getActiveAccount() ?? this.account ?? undefined;

    // Clear cached account and update provider state before starting logout redirect
    this.account = null;
    this.msalInstance.setActiveAccount(null);
    this.setState('SignedOut');

    // The redirect navigates away, so remove cached person data before starting it
    await clearPersonCache();

    await this.msalInstance.logoutRedirect({ account });
  }

  async getAccessToken(scopes?: string[]): Promise<string> {
    const targetScopes = scopes && scopes.length > 0 ? scopes : this.defaultScopes;
    const account = this.msalInstance.getActiveAccount() ?? this.account;

    if (!account) {
      throw new Error('No active account. User must sign in first.');
    }

    const silentRequest: SilentRequest = {
      scopes: targetScopes,
      account,
    };

    try {
      const response = await this.msalInstance.acquireTokenSilent(silentRequest);
      return response.accessToken;
    } catch (error) {
      if (isInteractionRequiredError(error)) {
        const redirectRequest: RedirectRequest = {
          scopes: targetScopes,
          account,
        };
        await this.msalInstance.acquireTokenRedirect(redirectRequest);
        throw new RedirectInProgressError('Redirecting for interactive token acquisition.');
      }

      throw error;
    }
  }

  getState(): ProviderState {
    return this.state;
  }

  /**
   * Returns the MSAL home account ID of the signed-in account, used to keep cached
   * person data separate per account.
   */
  getAccountId(): string | null {
    const account = this.msalInstance.getActiveAccount() ?? this.account;
    return account?.homeAccountId ?? null;
  }

  onStateChanged(handler: () => void): void {
    this.listeners.push(handler);
  }

  removeStateChangedHandler(handler: () => void): void {
    this.listeners = this.listeners.filter((listener) => listener !== handler);
  }

  private setState(next: ProviderState): void {
    this.state = next;
    this.emit();
  }

  private emit(): void {
    for (const listener of this.listeners) {
      try {
        listener();
      } catch {
        // Ignore listener errors
      }
    }
  }
}
