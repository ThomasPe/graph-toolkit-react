---
'@devsym/graph-toolkit-react': patch
---

Fix several authentication, caching and search issues:

- `MsalBrowserProvider` now falls back to interactive sign-in in the published build. `@azure/msal-browser` is no longer bundled, and the provider only needs it for types.
- The person cache is scoped to the signed-in account and cleared on sign-out. Providers can expose the account through the new optional `IProvider.getAccountId()` (`MsalBrowserProvider` does; `TeamsHostedProvider` accepts a `getAccountId` option). Without it, `userId="me"` is no longer persisted.
- People search no longer breaks on queries containing `&`, `#`, `+` or `\`.
- `MsalBrowserProvider.initialize()` no longer leaves the provider stuck in `Loading` when MSAL initialization or redirect handling fails; the error is still rethrown.
