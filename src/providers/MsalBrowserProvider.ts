/**
 * Native MSAL browser provider for Graph Toolkit React
 */

import { InteractionRequiredAuthError } from '@azure/msal-browser';
import type { AccountInfo, IPublicClientApplication, RedirectRequest, SilentRequest } from '@azure/msal-browser';
import { IProvider, ProviderState } from './IProvider';

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

  async initialize(): Promise<void> {
    await this.msalInstance.initialize();

    const response = await this.msalInstance.handleRedirectPromise();
    if (response?.account) {
      this.account = response.account;
      this.msalInstance.setActiveAccount(this.account);
      this.setState('SignedIn');
      return;
    }

    const active = this.msalInstance.getActiveAccount();
    const accounts = this.msalInstance.getAllAccounts();

    this.account = active ?? accounts[0] ?? null;
    if (this.account) {
      this.msalInstance.setActiveAccount(this.account);
      this.setState('SignedIn');
    } else {
      this.setState('SignedOut');
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
      if (error instanceof InteractionRequiredAuthError) {
        const redirectRequest: RedirectRequest = {
          scopes: targetScopes,
          account,
        };
        await this.msalInstance.acquireTokenRedirect(redirectRequest);
        throw new Error('Redirecting for interactive token acquisition.');
      }

      throw error;
    }
  }

  getState(): ProviderState {
    return this.state;
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
