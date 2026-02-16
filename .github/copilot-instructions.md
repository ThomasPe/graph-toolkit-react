# Copilot Instructions

## Release and publishing

- This repository uses Changesets for release management.
- Publishing is done through npm Trusted Publishing in GitHub Actions.
- Do not instruct maintainers to add or use `NPM_TOKEN` for CI publishing in this repository.
- Use the existing release workflow and `changesets/action` flow to version and publish.
- Continue adding a changeset file under `.changeset/` for every user-facing change.

## API typing style

- Prefer Fluent UI v9 style typings for finite state values: string literal union types.
- Do not introduce TypeScript `enum` for new public API state/token values.
- For provider state, use direct string literals (for runtime values) and `ProviderState` (for type annotations).
