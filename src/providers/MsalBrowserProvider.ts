/**
 * Native MSAL browser provider for Graph Toolkit React
 */

import {
  AccountInfo,
  InteractionRequiredAuthError,
  PopupRequest,
  PublicClientApplication,
  SilentRequest,
} from '@azure/msal-browser';
import { IProvider, ProviderState } from './IProvider';

export class MsalBrowserProvider implements IProvider {
  private readonly msalInstance: PublicClientApplication;
  private readonly defaultScopes: string[];
  private account: AccountInfo | null = null;
  private state: ProviderState = 'Loading';
  private listeners: Array<() => void> = [];

  constructor(msalInstance: PublicClientApplication, defaultScopes: string[]) {
    this.msalInstance = msalInstance;
    this.defaultScopes = defaultScopes;
  }

  async initialize(): Promise<void> {
    await this.msalInstance.initialize();
    await this.msalInstance.handleRedirectPromise();

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
    const request: PopupRequest = { scopes: this.defaultScopes };
    const response = await this.msalInstance.loginPopup(request);
    this.account = response.account;

    if (this.account) {
      this.msalInstance.setActiveAccount(this.account);
    }

    this.setState('SignedIn');
  }

  async logout(): Promise<void> {
    const account = this.msalInstance.getActiveAccount() ?? this.account ?? undefined;
    await this.msalInstance.logoutPopup({ account });
    this.account = null;
    this.setState('SignedOut');
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
        const popupRequest: PopupRequest = {
          scopes: targetScopes,
          account,
        };
        const response = await this.msalInstance.acquireTokenPopup(popupRequest);
        return response.accessToken;
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
