# React MSAL Sample - Quick Setup Guide

This guide is intentionally minimal and sample-specific. For provider API details and up-to-date scope requirements, use the root docs: [Graph Toolkit React README](../../readme.md).

## Step 1: Azure AD App Registration

Before running this sample, you need to register an application in Azure AD.

### Quick Registration Steps:

1. Open: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
2. Click **+ New registration**
3. Fill in:
   - **Name**: `Graph Toolkit React Sample`
   - **Supported account types**: Select "Accounts in any organizational directory and personal Microsoft accounts"
   - **Redirect URI**: Select **Single-page application (SPA)** and enter `http://localhost:3000`
4. Click **Register**

### After Registration:

On the Overview page, you'll see:
- **Application (client) ID**: Copy this value
- **Directory (tenant) ID**: Copy this value

## Step 2: Update Configuration

Open `src/authConfig.ts` and update:

```typescript
export const authConfig = {
  clientId: 'YOUR_CLIENT_ID_HERE',
  authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID_HERE',
  scopes: ['User.Read'],
};
```

**Alternative**: Use 'common' for multi-tenant support:
```typescript
authority: 'https://login.microsoftonline.com/common',
```

For optional scopes (such as presence), see [Scopes by feature](../../readme.md#scopes-by-feature).

## Step 3: Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 and sign in with your Microsoft account!

If port 3000 is already in use, free that port first. This sample is intentionally pinned to `localhost:3000` so the MSAL redirect URI matches the app registration exactly.

## Troubleshooting

### Error: "AADSTS500113: No reply address is registered for the application"
→ Make sure redirect URI is configured as `http://localhost:3000` with platform type **Single-page application**

### Error: "Redirect URI mismatch"  
→ The redirect URI in Azure AD must exactly match `http://localhost:3000`

### Error: "BrowserAuthError: no_token_request_cache_error"
→ Ensure `provider.initialize()` (which calls `handleRedirectPromise()`) is awaited before rendering.

### Page flashes or reloads on sign-in
→ This is expected with redirect flow. MSAL redirects to Entra ID and back; `handleRedirectPromise()` picks up the auth code on the return trip.

### Person component doesn't load
→ Check browser console for errors. Verify required scopes are granted for enabled features (see [Scopes by feature](../../readme.md#scopes-by-feature)).

---

Need help? Start with [sample README](./README.md), then use [root README](../../readme.md) for canonical provider/component guidance.
