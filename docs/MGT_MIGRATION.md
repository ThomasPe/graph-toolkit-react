# Migrating from Microsoft Graph Toolkit (MGT)

This guide helps you migrate from MGT to `@devsym/graph-toolkit-react`.

This project is a React-first library with Fluent UI v9 components and a provider pattern centered on `GraphProvider`.

## Who this is for

- You currently use MGT web components (or MGT React wrappers)
- You want to move to React components in this package
- You need a clear path for browser-hosted and Teams-hosted apps

## Migration at a glance

1. Replace MGT components with React components from this package.
2. Replace MGT provider setup with one package provider (`MockProvider`, `MsalBrowserProvider`, `TeamsHostedProvider`, or custom `IProvider`).
3. Wrap your app with `GraphProvider`.
4. Map required Graph scopes by feature (`User.Read`, `Presence.Read`, etc.).
5. Validate behavior (loading, presence, photo fallback, sign-in flow).

## Concept mapping

| MGT concept | Graph Toolkit React concept |
| --- | --- |
| Global provider state | App-level provider instance passed to `GraphProvider` |
| `mgt-person` / MGT person UI | `Person` React component |
| Provider configured outside React tree | Provider explicitly created in app code |
| Implicit token usage in MGT elements | Token access encapsulated by provider implementation |

## Step-by-step migration

### 1) Install package and peer dependencies

```bash
npm install @devsym/graph-toolkit-react react react-dom @fluentui/react-components
```

If you need browser MSAL auth:

```bash
npm install @azure/msal-browser
```

### 2) Pick provider by host scenario

- Local/mock: `MockProvider`
- Browser SPA: `MsalBrowserProvider`
- Teams-hosted app with consumer-managed Teams auth: `TeamsHostedProvider`
- Existing custom auth: custom `IProvider`

### 3) Wrap app with `GraphProvider`

```tsx
import { GraphProvider, MockProvider, Person } from '@devsym/graph-toolkit-react';

const provider = new MockProvider();

export function App() {
  return (
    <GraphProvider provider={provider}>
      <Person userId="me" view="twolines" showPresence />
    </GraphProvider>
  );
}
```

### 4) Scope mapping by feature

| Feature | Minimum delegated scope |
| --- | --- |
| Current user profile (`userId="me"`) | `User.Read` |
| Other user profile (`userId="{id/upn}"`) | `User.ReadBasic.All` |
| Presence (`showPresence`) | `Presence.Read` |
| Profile photo (`fetchImage`) | `User.Read` |

### 5) Validate after migration

- User profile renders with expected fields
- Presence badge behavior is correct when `Presence.Read` is granted/missing
- Photo fallback to initials is acceptable
- Sign-in and sign-out paths work for your host environment

## Teams migration (specific guidance)

Use this section when migrating Teams-hosted apps that previously used MGT in tabs/personal apps.

### Teams architecture change

In this package, Teams auth ownership stays in your app. `TeamsHostedProvider` does not open Teams login UI itself; it consumes callbacks you supply.

You provide:

- `getTeamsSsoToken(scopes)` to get a Teams token (for example via TeamsJS)
- `exchangeForGraphToken` to exchange that token in your backend for a Graph token

### Teams migration checklist

1. Keep your existing Teams sign-in bootstrap in app code.
2. Add a backend token-exchange endpoint (or reuse existing one).
3. Initialize `TeamsHostedProvider` with callbacks.
4. Call `await provider.login()` before rendering Graph-dependent UI.
5. Wrap app (or relevant subtree) with `GraphProvider`.
6. Replace MGT person UI usage with `Person` component.

### Teams minimal pattern

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
      <Person userId="me" view="threelines" showPresence />
    </GraphProvider>
  );
}
```

### Teams pitfalls to watch

- `Person` remains loading: ensure `await provider.login()` runs before render.
- Presence missing: add and consent `Presence.Read`.
- Token exchange failures: verify backend endpoint, audience, and consented scopes.
- Redirect mismatch/AAD errors in hybrid scenarios: confirm app registration URIs for your active environment.

## Recommended migration order for larger apps

1. Introduce provider + `GraphProvider` in one feature area.
2. Migrate one UI surface (for example profile card) to `Person`.
3. Verify scopes/consent in each tenant environment.
4. Continue replacing MGT-based surfaces incrementally.

## Related docs

- Root usage docs: [`../readme.md`](../readme.md)
- Agent quick reference: [`../AGENTS.md`](../AGENTS.md)
- Browser MSAL sample: [`../samples/react-msal-sample/README.md`](../samples/react-msal-sample/README.md)
- Historical migration notes: [`archive/MIGRATION_PLAN.md`](archive/MIGRATION_PLAN.md)
