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

## JSDoc documentation

- All public interfaces, types, and functions should include JSDoc comments.
- Use file-level JSDoc comments to explain the purpose of interface files.
- Document all interface properties with clear descriptions of their purpose and expected values.
- Include `@param` and `@returns` tags for methods and functions.
- Follow the JSDoc patterns established in files like `IProvider.ts` for consistency.

## UI changes

- Whenever a PR modifies UI, include at least one screenshot in the PR description.
- Whenever a commit or progress update modifies UI, include a screenshot link for that change as part of the accompanying update.

## Microsoft Graph identifiers

- Prefer Microsoft Graph `id` values for `/users/{id}` and related Graph path-based calls whenever an ID is already available.
- Use `userPrincipalName` or `mail` only as fallbacks when an app supplies direct person data without a Graph `id`.
- URL-encode dynamic Graph path segments such as user identifiers and group IDs before building request paths.

## Storybook documentation

- Add `tags: ['autodocs']` to every component story `meta` so Storybook generates a component-level Docs page.
- Use `parameters.docs.description.component` to summarize the component and let the Docs page list the feature stories together.
- Document public story args with `argTypes` so the generated Docs page explains controls and props clearly.
- Prefer a single component story file with representative feature stories instead of separate docs-only pages per feature.
