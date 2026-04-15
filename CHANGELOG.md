# Changelog

## 1.0.0-next.18

### Patch Changes

- 1aa5927: Replace the Person component loading text with Fluent UI Skeleton placeholders.

## 1.0.0-next.17

### Patch Changes

- b7d956f: Fix `People` overflow popovers to show each person's name alongside the avatar.

## 1.0.0-next.16

### Minor Changes

- d87fd75: Add `photoUrl` field to `PersonDetails` so callers can supply a pre-resolved profile photo URL. When provided, the `Person` component uses it directly for the avatar image without making an additional fetch.

## 1.0.0-next.15

### Patch Changes

- 8b8acbe: Add `usePeopleList` support for selecting additional user fields and sorting resolved people by `displayName`, `givenName`, or `surname`, expose the related name fields on public people types, and document the pattern in Storybook plus the React MSAL sample.

## 1.0.0-next.14

### Minor Changes

- 173d75e: Add `onUpdated` callbacks to `Person`, `People`, and `PeoplePicker` so apps can react to loaded content and picker state changes with trigger metadata.

## 1.0.0-next.13

### Patch Changes

- a3c2622: Fix `Person` so `view="avatar"` renders only the avatar without any text lines.
  - suppress Persona text slots for avatar-only view
  - add regression coverage for avatar-only rendering
  - add an explicit Storybook story for the avatar-only variant

## 1.0.0-next.12

### Patch Changes

- 16ef483: Add Storybook autodocs coverage for `PeoplePicker` and document the component story pattern so new components use a single Docs page that summarizes their feature stories.

## 1.0.0-next.11

### Minor Changes

- 333d6fb: Add a new `People` component for rendering compact avatar groups.
  - Add `People` and `usePeopleList` for MGT-style people strips backed by direct data, `userIds`, group membership, or `/me/people`
  - Export the new component and types from the package entrypoint
  - Add Storybook coverage, unit tests, and a React MSAL sample page for the new control

### Patch Changes

- 3437cfa: Fix `People` direct-data enrichment to prefer `userPrincipalName` or `mail` before `id` when resolving a Graph user identifier, avoiding invalid `/users/{local-id}` lookups for app-supplied people.
- 7ad88d2: Limit the default `People` list and `PeoplePicker` initial suggestions to tenant directory users.
  - Load Graph-backed default `People` entries from `/users` instead of `/me/people`
  - Load Graph-backed `PeoplePicker` initial suggestions from `/users` so they stay tenant-scoped
  - Update related docs and sample guidance to use `User.ReadBasic.All` for these directory-backed defaults

- c90c6df: Add a direct link to the deployed React MSAL sample app from the main README getting-started flow, and fix the sample documentation link to use the current repository path.

## 1.0.0-next.10

### Minor Changes

- d8346a4: Show initial PeoplePicker suggestions when the input receives focus, similar to the Microsoft Graph Toolkit people picker.

### Patch Changes

- 0467ab6: Load profile photos in PeoplePicker dropdown options and selected tags when available.

## 1.0.0-next.9

### Minor Changes

- d8745f4: Add `PeoplePicker` component backed by Microsoft Graph people search.
  - New `PeoplePicker` component using Fluent UI `TagPicker` with avatar tags and search dropdown
  - New `usePeopleSearch` hook for searching users via Graph API (`/users?$search=...`) or `MockProvider` mock data
  - New `IPeopleSearchProvider` interface and `isPeopleSearchProvider` type guard in `IPersonDataProvider`
  - `MockProvider` now implements `IPeopleSearchProvider` with a 10-person mock roster
  - New `PeoplePickerPerson` and `PeoplePickerProps` exported types
  - Supports controlled and uncontrolled modes, `maxPeople` limit, `searchMinChars`, and standard Fluent UI `size`/`appearance`/`disabled` props

- 30425b3: Add `excludeUserIds` prop to `PeoplePicker` component.

  When provided, user IDs in this array are filtered out of the search results dropdown.
  The component automatically requests extra results from the search backend (`maxSearchResults + excludeUserIds.length`) to ensure the dropdown still shows up to `maxSearchResults` items after exclusion.

### Patch Changes

- aa1e29d: Add `docs/COMPONENT_ROADMAP.md`: analysis of remaining Microsoft Graph Toolkit components ranked by porting effort and usefulness score, with a recommended implementation order.
- 055120f: Switch MsalBrowserProvider from popup to redirect flow for simpler, more robust authentication.
- a4273b9: Adjust the selected `PeoplePicker` chip avatar size so it fits the rounded removable tag more naturally.
- a4273b9: Fix `PeoplePicker` selected-person chip border radius to use Fluent UI v9 `rounded` shape instead of `circular`.
- 2a47eaf: Fix broken README navigation jump links to use the correct GitHub-generated heading anchors (emoji-prefixed headings generate anchors with a leading hyphen).
- 9643c3c: Use the search icon as the expand icon for the `PeoplePicker` component.

## 1.0.0-next.8

### Minor Changes

- 154a1ca: Add MGT-style Person line customization support.
  - support `line1Property` through `line4Property` with comma-separated fallbacks
  - support `presenceAvailability` and `presenceActivity` line mappings
  - add `renderLine1` through `renderLine4` as the React replacement for MGT line templates
  - fetch additional Graph user fields automatically when line mappings reference them

## 1.0.0-next.7

### Patch Changes

- 9533703: Revert MockProvider person photo mock to use the external `ui-avatars.com` URL avatar for now, replacing the bundled base64 data URL image.

## 1.0.0-next.6

### Patch Changes

- 6bea8c4: Add agent-focused usage documentation (`AGENTS.md`) and link it from the main README. Include `AGENTS.md` in published package files so downstream coding agents can consume scenario-based guidance.

  Add a new migration guide at `docs/MGT_MIGRATION.md` with a general MGT-to-Graph-Toolkit-React path and a dedicated Teams migration section, and link it from the README.

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
