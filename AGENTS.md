# AGENTS.md — Graph Toolkit React

This file is for coding agents that consume `@devsym/graph-toolkit-react`.
Use this as the primary quick reference for implementation choices.

## Package

- Package name: `@devsym/graph-toolkit-react`
- Peer deps: `react`, `react-dom`, `@fluentui/react-components`
- Optional peer dep: `@azure/msal-browser` (required only for `MsalBrowserProvider`)

Install:

```bash
npm install @devsym/graph-toolkit-react react react-dom @fluentui/react-components
```

If using browser MSAL auth:

```bash
npm install @azure/msal-browser
```

## Scenario Decision Matrix

Choose one provider and wire it into `GraphProvider`.

| Scenario | Use | Why |
| --- | --- | --- |
| Local development / UI prototyping | `MockProvider` | No auth setup; deterministic mock data |
| Browser-hosted app (SPA) with Entra/MSA sign-in | `MsalBrowserProvider` | Native browser MSAL flow |
| Microsoft Teams-hosted app with consumer-managed Teams auth | `TeamsHostedProvider` | Reuses existing Teams token acquisition + backend exchange |
| Existing custom auth stack | Custom `IProvider` implementation | Full control over token source and lifecycle |

## Minimal Patterns

### 1) MockProvider (fastest start)

```tsx
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { GraphProvider, MockProvider, Person } from '@devsym/graph-toolkit-react';

const provider = new MockProvider();

export function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <GraphProvider provider={provider}>
        <Person userId="AdeleV@contoso.com" view="twolines" showPresence />
      </GraphProvider>
    </FluentProvider>
  );
}
```

### 2) Browser SPA with MSAL (`MsalBrowserProvider`)

```tsx
import { PublicClientApplication } from '@azure/msal-browser';
import { GraphProvider, MsalBrowserProvider, Person } from '@devsym/graph-toolkit-react';

const msal = new PublicClientApplication({
  auth: {
    clientId: 'YOUR_CLIENT_ID',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: window.location.origin,
  },
});

const provider = new MsalBrowserProvider(msal, ['User.Read']);
await provider.initialize();

export function App() {
  return (
    <GraphProvider provider={provider}>
      <Person userId="me" view="threelines" />
    </GraphProvider>
  );
}
```

### 3) Teams-hosted app (`TeamsHostedProvider`)

```tsx
import {
  createBackendTokenExchange,
  GraphProvider,
  Person,
  TeamsHostedProvider,
} from '@devsym/graph-toolkit-react';
import { authentication } from '@microsoft/teams-js';

const exchangeForGraphToken = createBackendTokenExchange({
  endpoint: '/api/token/exchange',
});

const provider = new TeamsHostedProvider({
  defaultScopes: ['User.Read'],
  getTeamsSsoToken: async scopes => authentication.getAuthToken({ resources: scopes }),
  exchangeForGraphToken,
});

await provider.login();

export function App() {
  return (
    <GraphProvider provider={provider}>
      <Person userId="me" view="threelines" />
    </GraphProvider>
  );
}
```

### 4) Custom auth (`IProvider`)

```tsx
import { IProvider, ProviderState } from '@devsym/graph-toolkit-react';

export class MyProvider implements IProvider {
  state: ProviderState = 'SignedOut';

  async login(): Promise<void> {
    this.state = 'SignedIn';
  }

  async logout(): Promise<void> {
    this.state = 'SignedOut';
  }

  async getAccessToken(): Promise<string> {
    return 'ACCESS_TOKEN';
  }
}
```

## Scopes by Feature

| Feature | Minimum delegated scope | Notes |
| --- | --- | --- |
| Current user profile (`userId="me"`) | `User.Read` | Required for basic profile fields |
| Other user profile (`userId="{id/upn}"`) | `User.ReadBasic.All` | May require admin consent |
| Presence (`showPresence`) | `Presence.Read` | UI still renders without presence |
| Profile photo (`fetchImage`) | `User.Read` | Falls back to initials if unavailable |

## Common Failures and Fixes

| Symptom | Likely Cause | Action |
| --- | --- | --- |
| Redirect URI mismatch / `AADSTS50011` | App registration redirect URI does not match dev URL | Add exact SPA redirect URI used by local dev server |
| Person stays loading | Provider not initialized / login not completed | Ensure `await provider.initialize()` (MSAL) or `await provider.login()` (Teams/custom) before rendering |
| Presence missing | `Presence.Read` not granted | Add and consent to `Presence.Read`; keep graceful fallback |
| `Cannot find module '@azure/msal-browser'` | Using `MsalBrowserProvider` without optional peer dependency installed | Install `@azure/msal-browser` |

## Agent Rules

- Choose the simplest provider that fits the host environment.
- Keep scopes minimal and feature-driven.
- Prefer `userId="me"` for first implementation; expand to other users only when needed.
- Wrap components with `GraphProvider`; avoid direct token handling in UI components.
- If uncertain, default to `MockProvider` for local iteration, then switch to real auth provider.

## Source of Truth

- Primary docs: `README.md`
- Migration guide: `docs/MGT_MIGRATION.md`
- MSAL sample: `samples/react-msal-sample/README.md`
- API exports and types: package root `dist/index.d.ts` in published artifact
