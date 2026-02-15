import { describe, it, expect, vi } from 'vitest';
import { createBackendTokenExchange, TeamsHostedProvider } from '../providers/TeamsHostedProvider';

describe('TeamsHostedProvider', () => {
    it('logs in and transitions to SignedIn', async () => {
        const getTeamsSsoToken = vi.fn().mockResolvedValue('teams-sso-token');
        const exchangeForGraphToken = vi.fn().mockResolvedValue('graph-token');

        const provider = new TeamsHostedProvider({
            defaultScopes: ['User.Read'],
            getTeamsSsoToken,
            exchangeForGraphToken,
        });

        expect(provider.getState()).toBe('SignedOut');

        await provider.login();

        expect(provider.getState()).toBe('SignedIn');
        expect(getTeamsSsoToken).toHaveBeenCalledWith(['User.Read']);
        expect(exchangeForGraphToken).toHaveBeenCalledWith({
            ssoToken: 'teams-sso-token',
            scopes: ['User.Read'],
        });
    });

    it('returns cached token when still valid', async () => {
        const getTeamsSsoToken = vi.fn().mockResolvedValue('teams-sso-token');
        const exchangeForGraphToken = vi.fn().mockResolvedValue({
            accessToken: 'graph-token',
            expiresAt: Date.now() + 5 * 60_000,
        });

        const provider = new TeamsHostedProvider({
            defaultScopes: ['User.Read'],
            getTeamsSsoToken,
            exchangeForGraphToken,
        });

        const first = await provider.getAccessToken();
        const second = await provider.getAccessToken();

        expect(first).toBe('graph-token');
        expect(second).toBe('graph-token');
        expect(getTeamsSsoToken).toHaveBeenCalledTimes(1);
        expect(exchangeForGraphToken).toHaveBeenCalledTimes(1);
    });

    it('refreshes token when expired', async () => {
        const getTeamsSsoToken = vi
            .fn()
            .mockResolvedValueOnce('teams-sso-token-1')
            .mockResolvedValueOnce('teams-sso-token-2');
        const exchangeForGraphToken = vi
            .fn()
            .mockResolvedValueOnce({
                accessToken: 'graph-token-1',
                expiresAt: Date.now() - 1000,
            })
            .mockResolvedValueOnce({
                accessToken: 'graph-token-2',
                expiresAt: Date.now() + 5 * 60_000,
            });

        const provider = new TeamsHostedProvider({
            defaultScopes: ['User.Read'],
            getTeamsSsoToken,
            exchangeForGraphToken,
        });

        const first = await provider.getAccessToken();
        const second = await provider.getAccessToken();

        expect(first).toBe('graph-token-1');
        expect(second).toBe('graph-token-2');
        expect(getTeamsSsoToken).toHaveBeenCalledTimes(2);
        expect(exchangeForGraphToken).toHaveBeenCalledTimes(2);
    });

    it('sets SignedOut and rethrows on login failure', async () => {
        const provider = new TeamsHostedProvider({
            defaultScopes: ['User.Read'],
            getTeamsSsoToken: vi.fn().mockResolvedValue('teams-sso-token'),
            exchangeForGraphToken: vi.fn().mockRejectedValue(new Error('exchange failed')),
        });

        await expect(provider.login()).rejects.toThrow('exchange failed');
        expect(provider.getState()).toBe('SignedOut');
    });

    it('notifies and removes state listeners', async () => {
        const handler = vi.fn();
        const provider = new TeamsHostedProvider({
            defaultScopes: ['User.Read'],
            getTeamsSsoToken: vi.fn().mockResolvedValue('teams-sso-token'),
            exchangeForGraphToken: vi.fn().mockResolvedValue('graph-token'),
        });

        provider.onStateChanged(handler);
        await provider.login();

        expect(handler).toHaveBeenCalledTimes(1);

        provider.removeStateChangedHandler(handler);
        await provider.logout();

        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('creates a backend token exchange callback', async () => {
        const fetchFn = vi.fn().mockResolvedValue({
            ok: true,
            statusText: 'OK',
            json: async () => ({ accessToken: 'graph-token', expiresAt: 12345 }),
        });

        const exchange = createBackendTokenExchange({
            endpoint: '/api/token/exchange',
            fetchFn: fetchFn as unknown as typeof fetch,
        });

        const token = await exchange({
            ssoToken: 'teams-sso-token',
            scopes: ['User.Read'],
        });

        expect(token).toEqual({ accessToken: 'graph-token', expiresAt: 12345 });
        expect(fetchFn).toHaveBeenCalledWith('/api/token/exchange', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer teams-sso-token',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scopes: ['User.Read'] }),
        });
    });

    it('throws when backend token exchange fails', async () => {
        const fetchFn = vi.fn().mockResolvedValue({
            ok: false,
            statusText: 'Unauthorized',
            json: async () => ({ error: 'invalid token' }),
        });

        const exchange = createBackendTokenExchange({
            endpoint: '/api/token/exchange',
            fetchFn: fetchFn as unknown as typeof fetch,
        });

        await expect(
            exchange({
                ssoToken: 'teams-sso-token',
                scopes: ['User.Read'],
            })
        ).rejects.toThrow('Backend token exchange failed: invalid token');
    });
});