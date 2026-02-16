import { IProvider, ProviderState } from './IProvider';

type StateListener = () => void;

export interface ExchangeForGraphTokenParams {
  ssoToken: string;
  scopes: string[];
}

export interface ExchangedGraphToken {
  accessToken: string;
  expiresAt?: number | Date;
}

export interface TeamsHostedProviderOptions {
  defaultScopes: string[];
  getTeamsSsoToken: (scopes: string[]) => Promise<string>;
  exchangeForGraphToken: (
    params: ExchangeForGraphTokenParams
  ) => Promise<string | ExchangedGraphToken>;
  refreshSkewMs?: number;
}

export interface BackendTokenExchangeResponse extends ExchangedGraphToken {
  accessToken: string;
}

export interface CreateBackendTokenExchangeOptions {
  endpoint: string;
  fetchFn?: typeof fetch;
}

interface CachedToken {
  accessToken: string;
  expiresAtMs?: number;
}

const DEFAULT_REFRESH_SKEW_MS = 60_000;

/**
 * Creates a typed callback for exchanging a Teams SSO token with a backend
 * endpoint that performs OBO and returns a Graph token.
 */
export function createBackendTokenExchange(options: CreateBackendTokenExchangeOptions) {
  const fetchFn = options.fetchFn ?? fetch;

  return async ({
    ssoToken,
    scopes,
  }: ExchangeForGraphTokenParams): Promise<BackendTokenExchangeResponse> => {
    const response = await fetchFn(options.endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ssoToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ scopes }),
    });

    const payload = await response
      .json()
      .catch(() => ({ error: response.statusText || 'Token exchange failed' }));

    if (!response.ok) {
      const message = payload?.error || payload?.message || response.statusText;
      throw new Error(`Backend token exchange failed: ${message}`);
    }

    if (!payload?.accessToken) {
      throw new Error('Backend token exchange response did not include accessToken.');
    }

    return {
      accessToken: payload.accessToken,
      expiresAt: payload.expiresAt,
    };
  };
}

/**
 * Teams-hosted auth provider for Graph Toolkit React.
 *
 * This provider does not perform Teams interactive login itself.
 * The consumer application must handle TeamsJS login/token acquisition and
 * provide callbacks for SSO token retrieval and backend Graph token exchange.
 */
export class TeamsHostedProvider implements IProvider {
  private readonly defaultScopes: string[];
  private readonly getTeamsSsoTokenFn: (scopes: string[]) => Promise<string>;
  private readonly exchangeForGraphTokenFn: (
    params: ExchangeForGraphTokenParams
  ) => Promise<string | ExchangedGraphToken>;
  private readonly refreshSkewMs: number;
  private state: ProviderState = 'SignedOut';
  private listeners: StateListener[] = [];
  private readonly tokenCache = new Map<string, CachedToken>();

  constructor(options: TeamsHostedProviderOptions) {
    if (!options.defaultScopes || options.defaultScopes.length === 0) {
      throw new Error('TeamsHostedProvider requires at least one default scope.');
    }

    this.defaultScopes = [...new Set(options.defaultScopes)];
    this.getTeamsSsoTokenFn = options.getTeamsSsoToken;
    this.exchangeForGraphTokenFn = options.exchangeForGraphToken;
    this.refreshSkewMs = options.refreshSkewMs ?? DEFAULT_REFRESH_SKEW_MS;
  }

  async login(): Promise<void> {
    try {
      await this.getAccessToken();
      this.setState('SignedIn');
    } catch (error) {
      this.clearCache();
      this.setState('SignedOut');
      throw error;
    }
  }

  async logout(): Promise<void> {
    this.clearCache();
    this.setState('SignedOut');
  }

  async getAccessToken(scopes?: string[]): Promise<string> {
    const targetScopes = this.normalizeScopes(scopes);
    const cacheKey = this.buildScopeKey(targetScopes);
    const cached = this.tokenCache.get(cacheKey);

    if (cached && this.isTokenValid(cached)) {
      return cached.accessToken;
    }

    const ssoToken = await this.getTeamsSsoTokenFn(targetScopes);
    if (!ssoToken) {
      throw new Error('Teams SSO token acquisition returned empty token.');
    }

    const exchanged = await this.exchangeForGraphTokenFn({
      ssoToken,
      scopes: targetScopes,
    });

    const normalized = this.normalizeExchangedToken(exchanged);
    this.tokenCache.set(cacheKey, normalized);
    this.setState('SignedIn');

    return normalized.accessToken;
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

  private normalizeScopes(scopes?: string[]): string[] {
    const source = scopes && scopes.length > 0 ? scopes : this.defaultScopes;
    const deduplicated = [...new Set(source.filter(Boolean))];

    if (deduplicated.length === 0) {
      throw new Error('At least one scope is required to request a Graph token.');
    }

    return deduplicated;
  }

  private buildScopeKey(scopes: string[]): string {
    return [...scopes].sort().join(' ');
  }

  private isTokenValid(token: CachedToken): boolean {
    if (!token.expiresAtMs) {
      return true;
    }

    return Date.now() + this.refreshSkewMs < token.expiresAtMs;
  }

  private normalizeExchangedToken(token: string | ExchangedGraphToken): CachedToken {
    if (typeof token === 'string') {
      if (!token) {
        throw new Error('Graph token exchange returned empty access token.');
      }

      return { accessToken: token };
    }

    if (!token.accessToken) {
      throw new Error('Graph token exchange returned empty access token.');
    }

    return {
      accessToken: token.accessToken,
      expiresAtMs: this.toEpochMs(token.expiresAt),
    };
  }

  private toEpochMs(expiresAt?: number | Date): number | undefined {
    if (!expiresAt) {
      return undefined;
    }

    if (expiresAt instanceof Date) {
      return expiresAt.getTime();
    }

    return expiresAt;
  }

  private clearCache(): void {
    this.tokenCache.clear();
  }

  private setState(nextState: ProviderState): void {
    if (this.state === nextState) {
      return;
    }

    this.state = nextState;
    this.emit();
  }

  private emit(): void {
    for (const listener of this.listeners) {
      try {
        listener();
      } catch {
        // ignore listener errors
      }
    }
  }
}
