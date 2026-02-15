/**
 * MockProvider - simple in-memory provider for development and tests
 */

import { IProvider, ProviderState } from './IProvider';

type StateListener = () => void;

export class MockProvider implements IProvider {
  private state: ProviderState = ProviderState.SignedOut;
  private listeners: StateListener[] = [];
  constructor(options?: { autoSignIn?: boolean; mockUserId?: string }) {
    if (options?.autoSignIn) {
      this.state = ProviderState.SignedIn;
    }
  }

  getAccessToken(): Promise<string> {
    if (this.state !== ProviderState.SignedIn) {
      return Promise.reject(new Error('Not signed in'));
    }
    // Return a dummy token string; callers should only use this in mock graph flows
    return Promise.resolve('mock-token');
  }

  async login(): Promise<void> {
    this.state = ProviderState.SignedIn;
    this.emit();
  }

  async logout(): Promise<void> {
    this.state = ProviderState.SignedOut;
    this.emit();
  }

  getState(): ProviderState {
    return this.state;
  }

  onStateChanged(handler: () => void): void {
    this.listeners.push(handler);
  }

  removeStateChangedHandler(handler: () => void): void {
    this.listeners = this.listeners.filter((h) => h !== handler);
  }

  private emit() {
    for (const l of this.listeners) {
      try {
        l();
      } catch {
        // swallow listener errors
      }
    }
  }
}

export const createMockSignedInProvider = () => new MockProvider({ autoSignIn: true });
