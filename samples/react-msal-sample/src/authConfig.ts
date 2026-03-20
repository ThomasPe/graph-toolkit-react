import type { Configuration } from '@azure/msal-browser';

/**
 * Authentication config for native MSAL browser provider.
 *
 * The redirect URI is the app's own origin — after login Entra ID redirects
 * back here and MSAL's handleRedirectPromise() picks up the auth code.
 */
export const authConfig = {
  clientId: '01b824cd-f033-4135-b087-88d4132fddc7', // Replace with your Azure AD app client ID
  authority: 'https://login.microsoftonline.com/common', // Or your tenant id
  scopes: ['User.Read', 'User.ReadBasic.All'],
};

export const msalConfig: Configuration = {
  auth: {
    clientId: authConfig.clientId,
    authority: authConfig.authority,
    redirectUri: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
  },
  cache: {
    cacheLocation: 'localStorage',
  },
};

export const loginRequest = {
  scopes: authConfig.scopes,
};
