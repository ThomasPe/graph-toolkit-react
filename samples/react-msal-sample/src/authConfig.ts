import type { Configuration } from '@azure/msal-browser';

/**
 * Authentication config for native MSAL browser provider
 */
export const authConfig = {
  clientId: '01b824cd-f033-4135-b087-88d4132fddc7', // Replace with your Azure AD app client ID
  authority: 'https://login.microsoftonline.com/common', // Or your tenant id
  redirectUri:
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
  scopes: ['User.Read'],
};

export const msalConfig: Configuration = {
  auth: {
    clientId: authConfig.clientId,
    authority: authConfig.authority,
    redirectUri: authConfig.redirectUri,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: authConfig.scopes,
};
