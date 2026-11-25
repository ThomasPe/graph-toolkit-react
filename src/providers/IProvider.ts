/**
 * Provider interface for Microsoft Graph authentication
 */

export type ProviderState = 'Loading' | 'SignedOut' | 'SignedIn';

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
   * Event handler for state changes.
   *
   * Providers that implement {@link IProvider.getAccountId} should also notify these
   * handlers when the signed-in account changes without a state change.
   */
  onStateChanged?: (handler: () => void) => void;

  /**
   * Get a stable identifier for the signed-in account (for example the Entra object ID
   * or the MSAL home account ID).
   *
   * It scopes the persisted person cache so one account never reads data cached for
   * another. The value is treated as an opaque, case-sensitive string. Providers that do not implement it still cache other users, but data for
   * the current user (`userId="me"`) is not persisted.
   */
  getAccountId?: () => string | null | undefined;
}
