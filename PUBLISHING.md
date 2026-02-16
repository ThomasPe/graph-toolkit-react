# Publishing Process

This repository uses [Changesets](https://github.com/changesets/changesets) for automated npm versioning and publishing.

## Goals

- Keep version bumps consistent and reviewable.
- Generate release PRs from merged changesets.
- Publish from GitHub Actions only (not local machines).

## One-time Setup

1. Ensure npm publishing is enabled for the package owner.
2. Add repository secret `NPM_TOKEN` with publish permission to npm.
3. Confirm package name and access in `package.json`.

## Day-to-day Workflow

1. Make code changes in a feature branch.
2. Add a changeset file:

   ```bash
   npm run changeset
   ```

3. Select bump type (`patch`, `minor`, `major`) and provide a user-facing summary.
4. Commit code and generated `.changeset/*.md` file in the same PR.
5. Merge PR into `main`.

## What Happens on `main`

The release workflow in [.github/workflows/release.yml](.github/workflows/release.yml) runs automatically:

1. Installs dependencies.
2. Runs `type-check`, `lint`, `test`, and `build`.
3. Uses `changesets/action` to either:
   - open/update a **Release PR** (`chore: release packages`) when unreleased changesets exist, or
   - publish to npm when the release PR is merged.

## npm Tags

Current workflow publishes with:

- `next` tag (alpha/beta channel)

This repository is currently configured to use Changesets prerelease mode for the `next` channel.

### Prerelease Mode (Changesets)

Enable prerelease mode (once per prerelease cycle):

```bash
npx changeset pre enter next
```

Exit prerelease mode when ready to return to stable versioning:

```bash
npx changeset pre exit
```

Consumers can install prereleases with:

```bash
npm install @devsym/graph-toolkit-react@next
```

When ready for stable releases, update the workflow publish command from `--tag next` to `--tag latest`.

## Manual Commands (maintainers)

Use these only for local validation, not routine publishing:

```bash
npm run version-packages
npm run publish-packages -- --tag next
```

## Best Practices

- Keep changeset notes user-facing (impact, migration notes, behavior changes).
- Prefer many small changesets over one large generic note.
- Never publish from local machine unless CI is unavailable.
- Keep `CHANGELOG.md` committed and review release PR content before merge.
