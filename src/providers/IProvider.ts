/**
 * Provider interface for Microsoft Graph authentication
 */

export enum ProviderState {
  Loading = 'Loading',
  SignedOut = 'SignedOut',
  SignedIn = 'SignedIn',
}

export interface IProvider {
  /**
   * Get an access token for the specified scopes
   */
  getAccessToken(scopes?: string[]): Promise<string>;

  /**
   * Initiate login flow
   */
  login(): Promise<void>;

  /**
   * Initiate logout flow
   */
  logout(): Promise<void>;

  /**
   * Get the current provider state
   */
  getState(): ProviderState;

  /**
   * Event handler for state changes
   */
  onStateChanged?: (handler: () => void) => void;
}
