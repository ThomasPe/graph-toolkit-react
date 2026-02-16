# Microsoft Graph Toolkit Migration Plan

> Historical document: this plan reflects the original migration strategy and is retained for reference.
> See `readme.md` for current project status.

## Executive Summary

This document outlines the plan to migrate the Microsoft Graph Toolkit repository from a comprehensive multi-framework web components library to a focused React-only library using Fluent UI React Components. This is an independent fork with a narrower scope.

**Target State:**
- Single npm package: React components only
- Based on `@fluentui/react-components`
- Storybook demo hosted on GitHub Pages
- Support for existing provider pattern (providers not included in repo)
- First alpha release: Person component using Fluent UI Persona

---

## Phase 1: Repository Cleanup & Restructure

### 1.1 Extract Useful Code (Before Deletion)
**Goal:** Save valuable implementation patterns before cleanup

- [ ] Study `packages/mgt-components/src/components/mgt-person/`
  - Copy business logic notes
  - Document Graph API calls used
  - Save presence integration approach
  - Note photo fetching logic
- [ ] Review `packages/mgt-element/src/providers/` for provider interface
- [ ] Check `packages/mgt-react/src/` for any useful React patterns
- [ ] Create `EXTRACTED_PATTERNS.md` with notes (temporary, for reference)

### 1.2 Delete Legacy Code
**Goal:** Clean slate - remove all code not needed for React-only library

- [ ] Delete entire `packages/` directory
- [ ] Delete entire `samples/` directory
- [ ] Delete entire `stories/` directory
- [ ] Delete entire `specs/` directory
- [ ] Delete entire `scripts/` directory
- [ ] Delete entire `artifacts/` directory
- [ ] Delete `assets/stackblitz/` directory
- [ ] Delete `cem-plugins/` directory

**No archiving - this is an independent fork starting fresh**

### 1.2 Create New Package Structure
**Goal:** Establish single-package architecture

```
/
├── src/                          # New source code
│   ├── components/               # React components
│   │   ├── Person/
│   │   │   ├── Person.tsx
│   │   │   ├── Person.types.ts
│   │   │   ├── Person.test.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── hooks/                    # Graph data hooks
│   │   ├── usePersonData.ts
│   │   └── index.ts
│   ├── providers/                # Provider interfaces (no implementations)
│   │   ├── IProvider.ts
│   │   ├── ProviderContext.tsx
│   │   └── index.ts
│   ├── utils/                    # Utilities
│   │   ├── graph.ts
│   │   └── index.ts
│   └── index.ts                  # Public API
├── .storybook/                   # Storybook configuration
├── stories/                      # Component stories
│   ├── Person.stories.tsx
│   └── providers/
├── tests/                        # Test utilities
└── package.json                  # Single package.json
```

### 1.3 Update Root Configuration Files

**package.json - Complete rewrite:**
- [ ] Replace entire file with new single-package configuration
- [ ] Update name to new package name (e.g., `@yourusername/graph-toolkit-react`)
- [ ] Set version to `0.1.0-alpha.1`
- [ ] New dependencies only:
  - `@fluentui/react-components`
  - `@microsoft/microsoft-graph-client`
  - `@microsoft/microsoft-graph-types`
  - `react` and `react-dom` (peer dependencies)
- [ ] Remove all Lerna, workspace, web component dependencies

**Files to update:**
- [ ] `tsconfig.json` - Rewrite for single project
- [ ] `tsconfig.base.json` - Delete or merge into main tsconfig
- [ ] `.eslintrc.js` - Simplify for React-only
- [ ] `prettier.config.cjs` - Keep as is
- [ ] `.gitignore` - Update: add `/dist`, `/storybook-static`; remove `/legacy`

**Files to delete:**
- [ ] `lerna.json`
- [ ] `tsconfig.web-test-runner.json`
- [ ] `custom-elements-manifest.config.mjs`
- [ ] `web-test-runner.config.mjs`
- [ ] `release-please-config.json`
- [ ] `sonar-project.properties`
- [ ] `contest.md`
- [ ] `CHANGELOG.md` (will recreate new one)

---

## Phase 2: Provider Infrastructure

### 2.1 Provider Interface
**Goal:** Create provider pattern without bundling implementations

**Tasks:**
- [ ] Create `src/providers/IProvider.ts`
  - Define interface matching existing provider pattern
  - Include methods: `getAccessToken()`, `login()`, `logout()`, `getState()`
- [ ] Create `src/providers/ProviderContext.tsx`
  - React context for provider injection
  - Hook: `useProvider()`
  - Component: `<GraphProvider provider={...}>`

### 2.2 Mock Provider for Development
**Goal:** Enable development without real authentication

**Tasks:**
- [ ] Create `src/providers/MockProvider.ts`
  - Returns fake Graph data
  - For local development and testing
  - Will be used in Storybook later

---

## Phase 3: Graph Data Layer

### 3.1 Graph Client Utilities
**Goal:** Create reusable hooks for fetching Graph data

**Tasks:**
- [ ] Create `src/utils/graph.ts`
  - Initialize Graph Client from provider
  - Helper functions for common queries
- [ ] Create `src/hooks/useGraphClient.ts`
  - Access Graph Client from provider
  - Token handling

### 3.2 Person Data Hook
**Goal:** Encapsulate person data fetching logic

**Tasks:**
- [ ] Create `src/hooks/usePersonData.ts`
  - Fetch user/person data
  - Fetch presence
  - Fetch photo
  - Handle loading/error states
  - Cache management

---

## Phase 4: Person Component (Alpha Release)

**Goal:** Implement production-ready Person component using Fluent UI

**Reference current implementation (before deletion):**
- Study `packages/mgt-components/src/components/mgt-person/` for business logic
- Extract useful patterns: data fetching, presence handling, photo loading
- Current props to consider: `userId`, `personDetails`, `personQuery`, `showPresence`, `view`
- **Extract this code before deleting packages directory**

### 4.1 Component Structure
**Goal:** Modern Storybook setup for React with Fluent UI

**Tasks:**
- [ ] Install Storybook dependencies
  ```bash
  npx storybook@latest init --type react
  ```

- [ ] Clean `.storybook/` directory
  - Remove all web components specific configuration
  - Remove custom addons not needed
  - Delete old build configs
  
- [ ] Create `.storybook/main.ts`
```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
```

- [ ] Create `.storybook/preview.tsx`
```typescript
import type { Preview } from '@storybook/react';
import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';
import { MockProvider } from '../src/providers/MockProvider';
import { GraphProvider } from '../src/providers/ProviderContext';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'dark' ? webDarkTheme : webLightTheme;
      
      return (
        <FluentProvider theme={theme}>
          <GraphProvider provider={new MockProvider()}>
            <Story />
          </GraphProvider>
        </FluentProvider>
      );
    },
  ],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

### 3.2 Documentation Pages (MDX)
**Goal:** Create documentation before components

- [ ] Create `stories/Introduction.mdx`
  - Project overview
  - What's different from original MGT
  - Why Fluent UI + React only

- [ ] Create `stories/GettingStarted.mdx`
  - Installation instructions
  - Basic setup with provider
  - First component example (will add later)

- [ ] Create `stories/Providers.mdx`
  - How to use external providers
  - MockProvider example
  - MSAL2 Provider example
  - Custom provider example

### 3.3 Verify Storybook Works
**Goal:** Ensure Storybook builds before adding components

- [ ] Test Storybook locally
  ```bash
  npm run storybook
  ```
- [ ] Create simple demo story to verify setup
  - `stories/Demo.stories.tsx`
  - Use Fluent UI Button as test
  - Verify theming works
  - Verify provider context works

- [ ] Test Storybook build
  ```bash
  npm run build-storybook
  ```

---

## Phase 4: Person Component (Alpha Release)
**Goal:** Implement production-ready Person component using Fluent UI

**Reference current implementation (before deletion):**
- Study `packages/mgt-components/src/components/mgt-person/` for business logic
- Extract useful patterns: data fetching, presence handling, photo loading
- Current props to consider: `userId`, `personDetails`, `personQuery`, `showPresence`, `view`
- **Extract this code before deleting packages directory**

**New Component Specification:**

```typescript
// src/components/Person/Person.types.ts
import type { PersonaProps } from '@fluentui/react-components';

export interface PersonProps extends PersonaProps {
  // Identity
  userId?: string;
  userPrincipalName?: string;
  email?: string;
  
  // Direct data (optional, skips fetch)
  personDetails?: {
    displayName?: string;
    mail?: string;
    jobTitle?: string;
    department?: string;
    officeLocation?: string;
  };
  
  // Display options
  view?: 'avatar' | 'oneline' | 'twolines' | 'threelines' | 'fourlines';
  showPresence?: boolean;
  
  // Fetch options
  fetchImage?: boolean;
}
```

Current implementation note: `Person` uses direct Fluent `PersonaProps` passthrough. Legacy compatibility props such as `avatarSize`, `numericSize`, `onPersonaClick`, and custom `onClick(person)` are removed.

### 4.2 Implementation Tasks

- [ ] Set up component structure
  - `src/components/Person/Person.tsx` - Main component
  - `src/components/Person/Person.types.ts` - TypeScript interfaces
  - `src/components/Person/Person.test.tsx` - Unit tests
  - `src/components/Person/index.ts` - Exports

- [ ] Implement Person component
  - Use Fluent UI `Persona` component as base
  - Integrate `usePersonData` hook for fetching
  - Map Graph data to Fluent UI props
  - Handle loading states (skeleton)
  - Handle error states
  - Support all view modes

- [ ] Implement view variants
  - `avatar`: Only avatar/initials
  - `oneline`: Avatar + display name
  - `twolines`: Avatar + name + job title
  - `threelines`: Avatar + name + job title + department
  - `fourlines`: Avatar + name + job title + department + officeLocation/mail

- [ ] Implement presence support
  - Fetch presence from Graph
  - Map to Fluent UI presence badge
  - Handle presence updates

- [ ] Add comprehensive tests
  - Unit tests with mocked Graph data
  - Loading state tests
  - Error handling tests
  - Different view modes
  - Presence integration

---

## Phase 5: Storybook Setup

**Goal:** Set up Storybook to showcase Person component

### 5.1 Storybook Configuration
**Goal:** Modern Storybook setup for React with Fluent UI

**Tasks:**
- [ ] Install Storybook dependencies
  ```bash
  npx storybook@latest init --type react
  ```

- [ ] Clean `.storybook/` directory
  - Remove all web components specific configuration
  - Remove custom addons not needed
  - Delete old build configs
  
- [ ] Create `.storybook/main.ts`
```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
```

- [ ] Create `.storybook/preview.tsx`
```typescript
import type { Preview } from '@storybook/react';
import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';
import { MockProvider } from '../src/providers/MockProvider';
import { GraphProvider } from '../src/providers/ProviderContext';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'dark' ? webDarkTheme : webLightTheme;
      
      return (
        <FluentProvider theme={theme}>
          <GraphProvider provider={new MockProvider()}>
            <Story />
          </GraphProvider>
        </FluentProvider>
      );
    },
  ],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

### 5.2 Person Component Stories
**Goal:** Comprehensive interactive documentation

**Stories to create:**
- [ ] `stories/Person.stories.tsx`
  - Default story
  - With user ID
  - With direct data
  - Different views (avatar, oneline, twolines, threelines)
  - With presence
  - Different sizes
  - Loading state
  - Error state
  - Custom click handler

- [ ] `stories/providers/MockProvider.stories.tsx`
  - Show how to use with mock provider
  - Example with different provider implementations

### 5.3 Documentation Pages
**Goal:** Comprehensive documentation

- [ ] Create `stories/Introduction.mdx`
  - Project overview
  - What's different from original MGT
  - Why Fluent UI + React only

- [ ] Create `stories/GettingStarted.mdx`
  - Installation instructions
  - Basic setup with provider
  - Person component example

- [ ] Create `stories/Providers.mdx`
  - How to use external providers
  - MockProvider example
  - MSAL2 Provider example
  - Custom provider example

- [ ] Create `stories/Migration.mdx`
  - Migration guide from old MGT
  - Breaking changes
  - Component mapping

### 5.4 Verify Storybook
**Goal:** Test that everything works

- [ ] Test Storybook locally: `npm run storybook`
- [ ] Test Storybook build: `npm run build-storybook`
- [ ] Verify all Person stories render correctly
- [ ] Verify theming works (light/dark)
- [ ] Verify provider context works

### 5.5 Future Components (Post-Alpha)
**Goal:** Plan for future components

**Priority order for next components:**
1. PeopleList - Display multiple people
2. PeoplePicker - Search and select people
3. Login - Authentication UI
4. Agenda - Calendar events
5. FileList - OneDrive files

**Note:** Storybook infrastructure is already in place, adding new components will be straightforward.

---

## Phase 6: GitHub Pages Deployment

### 6.1 GitHub Actions Workflow
**Goal:** Automated Storybook deployment

**Tasks:**
- [ ] Create `.github/workflows/deploy-storybook.yml`
```yaml
name: Deploy Storybook

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm run build-storybook
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './storybook-static'
      - uses: actions/deploy-pages@v4
```

- [ ] Update repository settings
  - Enable GitHub Pages
  - Set source to GitHub Actions
  - Configure custom domain (optional)

### 6.2 Storybook Build Optimization
- [ ] Configure static build in `package.json`
```json
{
  "scripts": {
    "build-storybook": "storybook build"
  }
}
```
- [ ] Test local build: `npm run build-storybook`
- [ ] Verify output in `storybook-static/`

---

## Phase 7: Testing & Quality

### 7.1 Testing Infrastructure
**Goal:** Reliable test coverage

**Tasks:**
- [ ] Set up testing framework
  - Install Jest or Vitest
  - Install React Testing Library
  - Configure for TypeScript

- [ ] Create test utilities
  - `tests/test-utils.tsx` - Custom render with providers
  - `tests/mocks/mockGraphClient.ts` - Mock Graph responses
  - `tests/mocks/mockProvider.ts` - Mock provider

- [ ] Configure coverage thresholds
  - Minimum 80% coverage
  - Exclude stories and types

### 7.2 Person Component Tests
- [ ] Unit tests
  - Renders with userId
  - Renders with personDetails
  - Fetches data when userId provided
  - Shows loading state
  - Shows error state
  - Handles missing provider
  - Respects view prop
  - Shows presence when enabled
  - Calls onClick handler

- [ ] Integration tests
  - Works with mock provider
  - Fetches and displays Graph data
  - Updates when props change

### 7.3 CI/CD Pipeline
**Goal:** Automated quality checks

- [ ] Update `.github/workflows/` (or create new)
  - `ci.yml` - Build and test on PRs
  - `codeql-analysis.yml` - Keep, update paths
  - `deploy-storybook.yml` - Created in Phase 4

**ci.yml tasks:**
```yaml
- name: Build
  run: npm run build
  
- name: Lint
  run: npm run lint
  
- name: Type Check
  run: npm run type-check
  
- name: Test
  run: npm run test:coverage
  
- name: Bundle Size Check
  run: npm run size-check
```

---

## Phase 8: Package Publishing Preparation

### 8.1 Package Configuration
**Goal:** Ready for npm publish

**package.json updates:**
```json
{
  "name": "@yourusername/graph-toolkit-react",
  "version": "0.1.0-alpha.1",
  "description": "React components for Microsoft Graph powered by Fluent UI",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "peerDependencies": {
    "@fluentui/react-components": "^9.0.0",
    "react": "^17.0.0 || ^18.0.0",
    "react-dom": "^17.0.0 || ^18.0.0"
  },
  "keywords": [
    "react",
    "microsoft-graph",
    "fluent-ui",
    "components",
    "graph-toolkit"
  ]
}
```

### 8.2 Build Configuration
**Goal:** Optimized production builds

- [ ] Set up build tool (Vite recommended)
  - Create `vite.config.ts`
  - Configure library mode
  - Output ESM and CJS
  - Generate TypeScript declarations
  - Tree-shakable exports

- [ ] Configure bundle optimization
  - External peer dependencies
  - Code splitting (if needed)
  - Minification

### 8.3 Documentation for npm
- [ ] Update `README.md`
  - Installation instructions
  - Quick start example
  - Link to Storybook demo
  - Provider setup guide
  - Available components
  - Contributing guide (if accepting contributions)

- [ ] Create `CHANGELOG.md`
  - Alpha release notes
  - Breaking changes from original MGT

- [ ] Update `LICENSE`
  - Ensure license is appropriate for fork
  - Update copyright if needed

---

## Phase 9: Alpha Release

### 9.1 Pre-Release Checklist
- [ ] All Phase 1-6 tasks complete
- [ ] Person component fully functional
- [ ] Tests passing with >80% coverage
- [ ] Storybook deployed and accessible
- [ ] Documentation complete
- [ ] Build generates proper package

### 9.2 Alpha Release Process
- [ ] Tag release: `v0.1.0-alpha.1`
- [ ] Publish to npm with `alpha` tag
  ```bash
  npm publish --tag alpha
  ```
- [ ] Create GitHub release
  - Include changelog
  - Link to Storybook demo
  - Document known limitations

### 9.3 Post-Release
- [ ] Announce in relevant communities
- [ ] Gather feedback
- [ ] Create issues for next components
- [ ] Plan beta/stable release

---

## Complete File/Directory Deletion Checklist

**Directories to delete completely:**
- [ ] `packages/` - Entire monorepo packages directory
- [ ] `samples/` - All sample projects
- [ ] `stories/` - Old web component stories (recreate new ones)
- [ ] `specs/` - Old component specifications
- [ ] `scripts/` - Lerna/monorepo build scripts
- [ ] `artifacts/` - Build artifacts
- [ ] `assets/stackblitz/` - StackBlitz templates
- [ ] `cem-plugins/` - Custom elements manifest plugins

**Files to delete:**
- [ ] `lerna.json`
- [ ] `tsconfig.base.json` (consolidate into main tsconfig)
- [ ] `tsconfig.web-test-runner.json`
- [ ] `custom-elements-manifest.config.mjs`
- [ ] `web-test-runner.config.mjs`
- [ ] `release-please-config.json`
- [ ] `sonar-project.properties`
- [ ] `contest.md`
- [ ] `CHANGELOG.md` (create fresh one)
- [ ] `CONTRIBUTING.md` (rewrite for new project)
- [ ] `index.html` (old demo file)
- [ ] `auth.html` (old auth demo)

**Keep and update:**
- [ ] `.github/workflows/` - Delete old, create new ones
- [ ] `.storybook/` - Clean and reconfigure for React
- [ ] `LICENSE` - Review and update if needed
- [ ] `CODE_OF_CONDUCT.md` - Keep
- [ ] `SECURITY.md` - Keep or update
- [ ] `README.md` - Complete rewrite for new scope
- [ ] `.gitignore` - Update
- [ ] `prettier.config.cjs` - Keep
- [ ] `.eslintrc.js` - Update for React-only

**Assets to keep:**
- [ ] `assets/blank.html` - May be useful
- [ ] `assets/icons/` - If reusable
- [ ] Keep only what's actually needed, delete rest

---

## Migration Timeline (Estimated)

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: Cleanup | 1-2 days | None |
| Phase 2: Provider Infrastructure | 1 day | Phase 1 |
| Phase 3: Graph Data Layer | 1-2 days | Phase 2 |
| Phase 4: Person Component | 3-4 days | Phase 3 |
| Phase 5: Storybook Setup | 1-2 days | Phase 4 |
| Phase 6: GitHub Pages | 1 day | Phase 5 |
| Phase 7: Testing | 3-4 days | Phase 4 |
| Phase 8: Publishing Prep | 1-2 days | Phases 4-7 |
| Phase 9: Alpha Release | 1 day | All phases |

**Total Estimated Time:** 2-3 weeks

**Workflow:** Build Person component first with basic testing, then showcase it in Storybook for documentation and demos.

---

## Success Criteria

### Alpha Release Must Have:
✅ Single npm package installable via npm  
✅ Person component with all view modes  
✅ Support for external providers via context  
✅ Storybook demo live on GitHub Pages  
✅ >80% test coverage  
✅ TypeScript definitions  
✅ Documentation (README + Storybook)  

### Future Milestones:
- Beta release with 3-5 components
- Stable 1.0.0 with 8-10 components
- Community adoption and feedback integration

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Provider compatibility issues | Document provider interface clearly; provide adapter examples |
| Fluent UI API changes | Pin to specific version range; document upgrade path |
| Graph API changes | Use stable Graph API endpoints; version lock Graph types |
| Build complexity | Use Vite for simple, fast builds |
| Community confusion | Clear deprecation notice; migration guide; different package name |

---

## Questions to Address

Before starting, clarify:

1. **Package naming**: What will the new package be called?
   - Suggestion: `@yourorg/graph-toolkit-react` or similar

2. **License**: Is MIT still appropriate for this fork?

3. **Provider strategy**: 
   - Will you maintain any providers in separate packages?
   - Or fully rely on external provider packages?

4. **Component priority**: 
   - After Person, which component is most important?

5. **Breaking changes**: 
   - Acceptable to break from original API?
   - Or maintain backward compatibility where possible?

---

## Next Steps

1. **Review and approve this plan**
2. **Answer questions above**
3. **Create GitHub project board** from this plan
4. **Start Phase 1** - Repository cleanup
5. **Set up development branch** (e.g., `develop` or `v2-alpha`)

---

*This migration plan is a living document. Update as needed during implementation.*
