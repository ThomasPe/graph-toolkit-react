# Changelog

## 1.0.0-next.5

### Major Changes

- 9571d77: Simplify `Person` to pass Fluent UI `Persona` props through directly.
  - `PersonProps` now extends `PersonaProps` directly
  - Remove compatibility-only props (`avatarSize`, `numericSize`, `onPersonaClick`, and custom `onClick(person)` behavior)
  - Keep Graph-powered defaults for name/avatar/presence and `view`-based text mapping

## 1.0.0-next.4

### Major Changes

- 9fd6ca1: Migrate provider state typing from enum to Fluent UI style string literals with `ProviderState` as a string literal union.

## 0.1.0-next.3

### Minor Changes

- 694fbd7: Graph API caching for Person control

## 0.1.0-next.2

### Patch Changes

- 2a00518: Initial alpha release preparation:
  - adds native `MsalBrowserProvider` support in the package export surface
  - updates docs for installation, scopes, and provider usage
  - refreshes sample app guidance and setup documentation
  - includes release metadata for publishing via Changesets

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `TeamsHostedProvider` for Teams-hosted apps with consumer-managed Teams authentication and backend Graph token exchange.
- `createBackendTokenExchange` helper for typed backend OBO exchange callback wiring.
- Unit tests covering Teams provider state transitions, token cache behavior, and backend exchange helper success/error paths.

### Changed

- Made `@azure/msal-browser` an optional peer dependency so Teams-only consumers are not required to install MSAL.
- Expanded root README with Teams-hosted provider usage guidance and explicit host mode selection.
- Clarified browser-only scope of the `samples/react-msal-sample` sample.

## [0.1.0-alpha.1] - 2026-02-15

### Added

- Initial alpha release of `@devsym/graph-toolkit-react`.
- `Person` component powered by Fluent UI.
- Provider abstraction (`IProvider`) with `MockProvider` and `MsalBrowserProvider`.
- React `GraphProvider` context and Graph hooks.
- Storybook documentation and CI build/test pipeline.
- Browser-hosted MSAL sample app.

[Unreleased]: https://github.com/thomaspe/microsoft-graph-toolkit/compare/v0.1.0-alpha.1...HEAD
[0.1.0-alpha.1]: https://github.com/thomaspe/microsoft-graph-toolkit/releases/tag/v0.1.0-alpha.1
