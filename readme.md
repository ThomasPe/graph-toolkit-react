# Graph Toolkit React

Modern React Components for [Microsoft Graph](https://graph.microsoft.com) powered by [Fluent UI](https://react.fluentui.dev/)

[![Alpha Release](https://img.shields.io/badge/alpha-0.1.0-orange)](https://www.npmjs.com/package/@devsym/graph-toolkit-react)
![React 18/19](https://img.shields.io/badge/React-18%2F19-blue)
![Fluent UI 9](https://img.shields.io/badge/Fluent_UI-9.72-purple)
![TypeScript 5.9](https://img.shields.io/badge/TypeScript-5.9-blue)

[Get Started](#getting-started) • [Migration](#migration-from-mgt) • [Agent Quick Reference](#agent-quick-reference) • [Storybook](#storybook) • [Contribute](#contribute)

## 🎯 Project Vision

This project provides a **modern, React-first component library** built on top of Fluent UI to help React developers integrate with Microsoft Graph quickly and consistently.

> Note: This project is a spiritual successor to Microsoft Graph Toolkit, redesigned as a React-first library.

### Key Principles

- **React-First**: Built specifically for React applications, not framework-agnostic web components
- **Fluent UI Native**: Uses official Fluent UI v9 components instead of custom implementations
- **Single Package**: One cohesive npm package instead of a complex monorepo
- **Modern Stack**: TypeScript 5, Vite, Vitest, and Storybook
- **Developer Experience**: Simple API, excellent TypeScript support, comprehensive documentation

### Design Philosophy

Instead of maintaining the original web component approach, this fork:

1. **Leverages Fluent UI**: Uses the official `Persona` component from Fluent UI instead of custom Avatar/Text components
2. **Embraces React Patterns**: Components designed for React's patterns (hooks, context) from the ground up
3. **Reduces Complexity**: Smaller codebase enables quicker development and easier maintenance
4. **Focuses on Quality**: Fewer components, better implementation, comprehensive documentation

## 📦 Package

```bash
npm install @devsym/graph-toolkit-react
```

| Package | Version | Description |
| ------- | ------- | ----------- |
| `@devsym/graph-toolkit-react` | `0.1.0-alpha.1` | React components for Microsoft Graph powered by Fluent UI |

## 🔄 Migration from MGT

For migration from Microsoft Graph Toolkit (including Teams-hosted scenarios), use [`docs/MGT_MIGRATION.md`](./docs/MGT_MIGRATION.md).

The guide includes:

- Concept mapping (MGT patterns to this package)
- Step-by-step migration checklist
- Teams-specific migration section (`TeamsHostedProvider` + backend token exchange)
- Common migration pitfalls and validation checklist

## 🤖 Agent Quick Reference

If you are using a coding agent (Copilot/Codex/Claude/etc.), use the scenario-first reference in [`AGENTS.md`](./AGENTS.md).

It includes:

- Provider decision matrix by hosting scenario
- Minimal copy-ready snippets for `MockProvider`, `MsalBrowserProvider`, `TeamsHostedProvider`, and custom `IProvider`
- Scopes-by-feature mapping
- Common failures and exact remediation steps

For end-to-end browser-hosted setup with MSAL, also see [`samples/react-msal-sample/README.md`](./samples/react-msal-sample/README.md).

## 🎨 Components

Currently available in alpha:

### Person Component
A flexible component for displaying user information from Microsoft Graph.

```tsx
import { Person } from '@devsym/graph-toolkit-react';

<Person 
  userId="user@contoso.com"
  view="twolines"
  showPresence
  presenceOnly={false}
  size="large"
  textAlignment="center"
  onClick={() => console.log('Persona clicked!')}
/>
```

`Person` supports Fluent UI Persona props directly.

MGT-style line customization is also supported:

```tsx
<Person
  userId="me"
  view="threelines"
  line1Property="givenName"
  line2Property="mail,userPrincipalName"
  line3Property="presenceAvailability"
/>
```

For full manual override, use React render callbacks as the replacement for MGT line templates:

```tsx
<Person
  personDetails={{
    displayName: 'Megan Bowen',
    jobTitle: 'CEO',
    department: 'Leadership',
    officeLocation: 'Seattle',
  }}
  view="fourlines"
  renderLine1={({ text }) => <span>Name: {text}</span>}
  renderLine2={({ text }) => <span>Role: {text}</span>}
  renderLine3={({ text }) => <span>Org: {text}</span>}
  renderLine4={({ text }) => <span>Location: {text}</span>}
/>
```


## 🚀 Getting Started

### Prerequisites

```json
{
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0",
  "@fluentui/react-components": "^9.0.0"
}
```

### Installation

```bash
npm install --save @devsym/graph-toolkit-react
```

Also install required peer dependencies in your app if they are not already present:

```bash
npm install --save react react-dom @fluentui/react-components
```

If you plan to use `MsalBrowserProvider`, also install:

```bash
npm install --save @azure/msal-browser
```

If you only use `TeamsHostedProvider` (Teams-hosted app with consumer-managed Teams auth), `@azure/msal-browser` is not required.

### Quick Start

```tsx
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { GraphProvider, MockProvider, Person } from '@devsym/graph-toolkit-react';

function App() {
  const provider = new MockProvider(); // Use MockProvider for development
  
  return (
    <FluentProvider theme={webLightTheme}>
      <GraphProvider provider={provider}>
        <Person userId="AdeleV@contoso.com" view="twolines" showPresence />
      </GraphProvider>
    </FluentProvider>
  );
}
```

### Authentication Providers

The library uses a provider pattern for authentication:

- **MockProvider**: Returns mock data (Adele Vance) without API calls - perfect for development
- **MsalBrowserProvider**: Native MSAL browser provider included in this package
- **TeamsHostedProvider**: For Teams-hosted apps using consumer-managed Teams login + backend Graph token exchange
- **Custom Providers**: Implement `IProvider` interface to integrate with other auth systems

#### `MsalBrowserProvider` quick start

```tsx
import { PublicClientApplication } from '@azure/msal-browser';
import {
  GraphProvider,
  MsalBrowserProvider,
  Person,
  ProviderState,
} from '@devsym/graph-toolkit-react';

const msal = new PublicClientApplication({
  auth: {
    clientId: 'YOUR_CLIENT_ID',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: window.location.origin,
  },
});

const provider = new MsalBrowserProvider(msal, ['User.Read']);
await provider.initialize();

function App() {
  return (
    <GraphProvider provider={provider}>
      <Person userId="me" view="threelines" />
    </GraphProvider>
  );
}
```

#### `TeamsHostedProvider` quick start (consumer-managed Teams login)

Use this when your app is hosted in Microsoft Teams and your app code already handles TeamsJS auth for multiple APIs.
The provider does not open Teams login popups itself; it uses callbacks you provide.

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
  getTeamsSsoToken: async (scopes) => {
    // Consumer app owns Teams auth and can reuse token for other APIs
    return authentication.getAuthToken({ resources: scopes });
  },
  exchangeForGraphToken,
});

await provider.login();

function App() {
  return (
    <GraphProvider provider={provider}>
      <Person userId="me" view="threelines" />
    </GraphProvider>
  );
}
```

Use explicit mode selection in your app:

- Browser-hosted app: instantiate `MsalBrowserProvider`
- Teams-hosted app: instantiate `TeamsHostedProvider`

#### Scopes by feature

| Feature | Minimum delegated scope | Notes |
| ------- | ------------------------ | ----- |
| Load current user profile (`userId="me"`) | `User.Read` | Required for basic person data (`displayName`, `mail`, etc.) |
| Load another user by id/upn (`userId="{id}"`) | `User.ReadBasic.All` | May require admin consent depending on tenant policy |
| Show presence (`showPresence`) | `Presence.Read` | If not granted, person still renders without presence |
| Load profile photo (`fetchImage`) | `User.Read` | Falls back to initials if photo is unavailable |

```tsx
import { IProvider, ProviderState } from '@devsym/graph-toolkit-react';

class MyAuthProvider implements IProvider {
  state: ProviderState = 'SignedOut';
  
  async login(): Promise<void> { /* ... */ }
  async logout(): Promise<void> { /* ... */ }
  async getAccessToken(): Promise<string> { /* ... */ }
}
```

## 📚 Storybook

Explore all components interactively in our Storybook documentation:

**[View Storybook →](https://thomaspe.github.io/graph-toolkit-react/)** _(Deployed to GitHub Pages on every main branch update)_

Run locally:
```bash
npm run storybook
```

## 🛠️ Development

### Tech Stack

- **Build**: Vite 7 (ESM + CJS output)
- **Language**: TypeScript 5.9
- **Testing**: Vitest 3 + Testing Library
- **Documentation**: Storybook 10
- **UI Framework**: Fluent UI v9 (React Components)
- **Graph SDK**: @microsoft/microsoft-graph-client 3.0

### Build & Test

```bash
# Install dependencies
npm install

# Type check
npm run type-check

# Lint
npm run lint

# Build library
npm run build

# Run tests
npm run test

# Run Storybook
npm run storybook

# Build Storybook for deployment
npm run build-storybook
```

### Project Structure

```
src/
├── components/
│   └── Person/
│       ├── Person.tsx          # Component implementation
│       ├── Person.types.ts     # TypeScript definitions
│       └── __tests__/          # Component tests
├── providers/
│   ├── IProvider.ts            # Provider interface
│   ├── MockProvider.ts         # Development provider
│   └── ProviderContext.tsx     # React context
├── hooks/
│   ├── useGraphClient.ts       # Graph client hook
│   ├── usePersonData.ts        # Person data fetching
│   └── useProvider.ts          # Provider access
└── index.ts                    # Public API

stories/
└── Person.stories.tsx          # Storybook stories (19 examples)
```

## 🎯 Current Status

**Alpha** ✅

- ✅ Repository restructured from monorepo to single package
- ✅ Provider infrastructure with MockProvider for development
- ✅ Person component using Fluent UI Persona
- ✅ Full Persona configuration support (textAlignment, textPosition, sizing)
- ✅ Build system (ESM + CJS + TypeScript declarations)
- ✅ Storybook documentation and GitHub Pages deployment
- ✅ CI/CD with GitHub Actions
- ✅ Automatic Storybook deployment to GitHub Pages
- ✅ Sample app with MSAL sign-in and `Person` (`userId="me"`) at `samples/react-msal-sample`

**Next Steps**:
- Additional components (PeoplePicker, PersonCard, Login)
- Expanded provider guidance and production auth examples
- Comprehensive test coverage
- First stable release (1.0.0)

## 🤝 Contribute

This **community-driven project** provides React developers with components for Microsoft Graph. Contributions are welcome!

### Guidelines

1. Follow the existing code style (TypeScript, ESLint, Prettier)
2. Use Fluent UI components whenever possible
3. Write tests for new components
4. Add Storybook stories demonstrating all component features
5. Update documentation

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- **Fluent UI Team**: For the excellent React component library
- **Microsoft Graph**: For the powerful API that makes this all possible
- **Community Contributors**: For helping improve this project

---

**Note**: This is an alpha release under active development. APIs may change. Not recommended for production use yet.

## 🔗 Links

- **Fluent UI**: [react.fluentui.dev](https://react.fluentui.dev/)
- **Microsoft Graph**: [graph.microsoft.com](https://graph.microsoft.com)
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)
- **Publishing**: [PUBLISHING.md](PUBLISHING.md)

