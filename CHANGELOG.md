# Changelog

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

- Initial alpha release of `@medienstudio/graph-toolkit-react`.
- `Person` component powered by Fluent UI.
- Provider abstraction (`IProvider`) with `MockProvider` and `MsalBrowserProvider`.
- React `GraphProvider` context and Graph hooks.
- Storybook documentation and CI build/test pipeline.
- Browser-hosted MSAL sample app.

[Unreleased]: https://github.com/thomaspe/microsoft-graph-toolkit/compare/v0.1.0-alpha.1...HEAD
[0.1.0-alpha.1]: https://github.com/thomaspe/microsoft-graph-toolkit/releases/tag/v0.1.0-alpha.1
