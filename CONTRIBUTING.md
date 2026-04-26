# Contributing

Thanks for helping improve Graph Toolkit React. This project is a React-first component library for Microsoft Graph built with Fluent UI v9, TypeScript, Vite, Vitest, and Storybook.

## Getting Started

Install dependencies from the repository root:

```bash
npm install
```

Run the standard validation commands before opening a pull request:

```bash
npm run type-check
npm run lint
npm run test
npm run build
```

Run Storybook locally when changing components or docs:

```bash
npm run storybook
```

## Development Guidelines

- Prefer existing project patterns over new abstractions.
- Use Fluent UI v9 components and typings for UI surfaces.
- Keep Microsoft Graph scopes minimal and feature-driven.
- Prefer Microsoft Graph `id` values for path-based Graph calls when IDs are available.
- URL-encode dynamic Graph path segments before building request paths.
- Add or update tests for behavior changes.
- Add or update Storybook stories for component-facing changes.
- Add `tags: ['autodocs']` to component story metadata.
- Document public interfaces, types, functions, and story args with clear JSDoc or Storybook metadata.

## Changesets

User-facing changes should include a changeset:

```bash
npm run changeset
```

Choose the smallest appropriate bump and write the summary for package consumers. Documentation-only changes that affect package usage should still include a changeset when they change published guidance.

## Documentation

Update the README, Storybook docs, sample docs, or migration guide when a change affects setup, supported scenarios, permissions, public APIs, or component behavior.

For sample app changes, update [samples/react-msal-sample/README.md](samples/react-msal-sample/README.md).

## Pull Request Checklist

- Validation commands pass locally or in CI.
- Tests cover new behavior or regressions.
- Storybook covers new or changed component states.
- Documentation reflects user-facing behavior.
- A changeset is included for user-facing changes.

This project follows the [Microsoft Open Source Code of Conduct](CODE_OF_CONDUCT.md).