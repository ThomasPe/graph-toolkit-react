# React MSAL Sample

This sample demonstrates browser-hosted authentication with `MsalBrowserProvider`.

For Teams-hosted apps, use `TeamsHostedProvider` with consumer-managed TeamsJS login and backend token exchange as documented in the root [README](../../readme.md).

This sample demonstrates how to use **@devsym/graph-toolkit-react** with MSAL (Microsoft Authentication Library) authentication to display user information using the Person component.

## Features

- ✅ MSAL authentication with redirect flow
- ✅ Navigation menu with one page per component
- ✅ Person component displaying current user ("me" query)
- ✅ People component for compact avatar groups and overflow
- ✅ PeoplePicker component for searching and selecting people
- ✅ Selected user list demo that stores picker IDs and renders a sorted roster
- ✅ Fluent UI design system
- ✅ TypeScript support
- ✅ Native `@azure/msal-browser` provider wired to `GraphProvider`

## Prerequisites

- Node.js 18+ installed
- React 18 or 19 (library support baseline)
- An Azure AD application registration (see setup below)
- Microsoft account to test with

## Azure AD Setup

### 1. Register an Application

1. Go to the [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Configure your app:
   - **Name**: Graph Toolkit React Sample (or any name you prefer)
   - **Supported account types**: Accounts in any organizational directory and personal Microsoft accounts
   - **Redirect URI**: Platform **Single-page application (SPA)** with `http://localhost:3000`
5. Click **Register**

### 2. Configure API Permissions

1. In your app registration, go to **API permissions**
2. The `User.Read` permission should already be added by default
3. Add `User.ReadBasic.All` (delegated) for the People component default suggestions, PeoplePicker initial suggestions, and loading other users by ID
4. The same `User.ReadBasic.All` permission also covers PeoplePicker typed user search
5. Click **Grant admin consent** if you're an admin (optional but recommended)

For additional optional scopes (for example presence), use the root documentation as the source of truth: [Scopes by feature](../../readme.md#scopes-by-feature).

### 3. Copy Your Credentials

After registration, copy:
- **Application (client) ID** from the Overview page
- **Directory (tenant) ID** from the Overview page

## Installation

1. Navigate to this directory:

```bash
cd samples/react-msal-sample
```

2. Install dependencies:

```bash
npm install
```

3. Configure authentication in `src/authConfig.ts` by setting your `clientId` and `authority`.
   - Keep `scopes` to the minimum required for your scenario.
   - For scope requirements by feature, see [Scopes by feature](../../readme.md#scopes-by-feature).
   - Register the sample's redirect URI as `http://localhost:3000`.

> **Tip**: You can also use `'common'` instead of your tenant ID to support any Microsoft account:
> ```typescript
> authority: 'https://login.microsoftonline.com/common'
> ```

## Running the Sample

Start the development server:

```bash
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000)

The sample is intentionally pinned to `http://localhost:3000` for local MSAL setup. If port 3000 is already in use, stop the conflicting process before starting the sample instead of letting Vite switch ports.

## Implementation Notes

This sample keeps app-specific wiring in local files and relies on the main package docs for API details:

- `src/App.tsx` initializes `MsalBrowserProvider` and connects it to `GraphProvider`
- `src/authConfig.ts` contains tenant/client/scopes configuration
- `src/Dashboard.tsx` renders the navigation layout with a sidebar and page router
- `src/PersonPage.tsx` demonstrates the `Person` component with `userId="me"`
- `src/PeoplePage.tsx` demonstrates the `People` component
- `src/PeoplePickerPage.tsx` demonstrates the `PeoplePicker` component
- `src/SelectedPeopleListPage.tsx` demonstrates storing picker IDs and resolving a sorted list with `usePeopleList`

For current provider and component usage guidance, use [Graph Toolkit React Documentation](../../readme.md).

## File Structure

```
src/
├── authConfig.ts          # MSAL configuration (scopes, client ID, authority)
├── App.tsx                # Main app component — initializes provider and handles auth state
├── Login.tsx              # Login screen
├── Dashboard.tsx          # Authenticated layout with sidebar navigation
├── PersonPage.tsx         # Person component demo page
├── PeoplePage.tsx         # People component demo page
├── PeoplePickerPage.tsx   # PeoplePicker component demo page
├── SelectedPeopleListPage.tsx # Picker-driven user list demo page
├── main.tsx               # App entry point
└── index.css              # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Troubleshooting

### "Redirect URI mismatch" error

Make sure the redirect URI in your Azure AD app registration matches `http://localhost:3000` exactly with platform type **Single-page application (SPA)**.

### Popup opens to a white page and sign-in never starts

This sample uses redirect flow, not popup. If you see a white popup, make sure you are using the latest version of `MsalBrowserProvider` which uses `loginRedirect()`.

### "AADSTS50011: The redirect URI specified in the request does not match"

Ensure you selected **Single-page application** as the platform type, not "Web", and that you registered `http://localhost:3000`.

### "BrowserAuthError: no_token_request_cache_error"

This can occur if `handleRedirectPromise()` is not called on page load. Ensure `provider.initialize()` is awaited before rendering.

### Person component shows loading state indefinitely

1. Check browser console for errors
2. Verify your client ID and tenant ID are correct
3. Ensure you've granted the required scopes (see [Scopes by feature](../../readme.md#scopes-by-feature))

### "Cannot find module '@devsym/graph-toolkit-react'"

The sample uses a local file reference. Make sure you've built the main library:

```bash
cd ../..
npm run build
cd samples/react-msal-sample
npm install
```

## Learn More

- [Graph Toolkit React Documentation](../../readme.md)
- [MSAL.js Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js)
- [Microsoft Graph API](https://docs.microsoft.com/en-us/graph/)
- [Fluent UI React](https://react.fluentui.dev/)

## License

MIT
