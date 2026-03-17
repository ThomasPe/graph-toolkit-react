# Component Roadmap

This document analyzes all Microsoft Graph Toolkit (MGT) components that have not yet been ported to `@devsym/graph-toolkit-react`. Each component is evaluated on two axes:

- **Porting Effort** — estimated implementation cost on a 1–6 scale (1 = trivial, 6 = very high)
- **Usefulness** — how likely it is that library consumers will use the component, on a 1–10 scale (10 = near-universal)

The **Priority Score** (Usefulness ÷ Effort) indicates the most cost-effective order to implement them.

## Current state

| Component | MGT reference | Status |
| --- | --- | --- |
| `Person` | [`mgt-person`](https://learn.microsoft.com/graph/toolkit/components/person) | ✅ Shipped |
| `PeoplePicker` | [`mgt-people-picker`](https://learn.microsoft.com/graph/toolkit/components/people-picker) | ✅ Shipped |

---

## Effort scale

| Score | Label | Description |
| --- | --- | --- |
| 1 | Trivial | Wrapper around existing infrastructure with no new API surface |
| 2 | Small | One new data hook + minimal UI, reuses existing components |
| 3 | Medium-Small | New data hook + moderate UI; one new Graph endpoint domain |
| 4 | Medium | Multiple Graph calls, own UI state, or CRUD mutation pattern |
| 5 | Large | Recursive/multi-step fetching, complex layout, several sub-components |
| 6 | Extra-Large | Real-time state, multi-component architecture, or niche platform API |

## Usefulness scale

| Score | Meaning |
| --- | --- |
| 9–10 | Used in almost every Microsoft 365 app that requires auth or people UX |
| 7–8 | High demand; common in productivity, dashboards, and M365-integrated apps |
| 5–6 | Moderate; useful in specific but common scenarios |
| 3–4 | Low; platform-specific or only needed by a minority of apps |
| 1–2 | Very niche; narrow audience or rarely standalone |

---

## Ranked component analysis

Components are ordered by **Priority Score** (highest first), making the list a practical implementation backlog.

---

### 1. Login

| Property | Value |
| --- | --- |
| MGT component | [`mgt-login`](https://learn.microsoft.com/graph/toolkit/components/login) |
| Key Fluent UI controls | `Button`, `Persona`, `Menu`, `MenuItem` |
| Porting effort | **2 / 6** |
| Usefulness | **9 / 10** |
| Priority score | **4.5** |

**What it does:** Renders a sign-in button when the user is unauthenticated and a user-avatar menu with a sign-out action when signed in. Reflects the provider's `ProviderState` in real time.

**Why it scores high:** Almost every app that uses the library needs a way to trigger `provider.login()` and `provider.logout()` and surface the current auth state. The component itself requires zero new Graph API calls — it is purely driven by the existing `ProviderContext`.

**What needs to be built:**
- New component: `Login` (Fluent UI `Button` for signed-out, `Persona` + `Menu` dropdown for signed-in)
- Uses: `useProviderState`, `useProvider` (both already exist)
- No new hooks or Graph endpoints required

**New Graph scopes required:** None

---

### 2. People

| Property | Value |
| --- | --- |
| MGT component | [`mgt-people`](https://learn.microsoft.com/graph/toolkit/components/people) |
| Key Fluent UI controls | `AvatarGroup`, `AvatarGroupItem`, `AvatarGroupPopover` |
| Porting effort | **2 / 6** |
| Usefulness | **8 / 10** |
| Priority score | **4.0** |

**What it does:** Renders a compact horizontal row of person avatars (overlapping circles) for a list of users. Supports a configurable overflow count and optionally a `Person` detail card on hover.

**Why it scores high:** Showing a "faces" strip for group members, document collaborators, or meeting attendees is an extremely common pattern in M365 app UIs. It is essentially a layout shell around the existing `Person` component.

**What needs to be built:**
- New hook: `usePeopleList` — fetches multiple users by ID array or group membership (`GET /users` batch or `GET /groups/{id}/members`)
- New component: `People` — renders Fluent UI `AvatarGroup` with overflow, reuses `Person` for individual faces
- Optional sub-component: `PeopleCard` popover triggered on avatar click

**New Graph scopes required:** `User.ReadBasic.All`, `GroupMember.Read.All` (for group-based lists)

---

### 3. PersonCard

| Property | Value |
| --- | --- |
| MGT component | [`mgt-person-card`](https://learn.microsoft.com/graph/toolkit/components/person-card) |
| Key Fluent UI controls | `Popover`, `PopoverSurface`, `Card`, `CardHeader`, `Persona` |
| Porting effort | **3 / 6** |
| Usefulness | **8 / 10** |
| Priority score | **2.7** |

**What it does:** A flyout/popover card with expanded person info: profile photo, contact details (email, phone, location), manager link, and a list of direct reports. Typically triggered by clicking a `Person` component.

**Why it scores high:** PersonCard is a natural companion to `Person`. Users already present in a list or mention want a quick way to drill into contact details. Fluent UI `Popover` makes this straightforward.

**What needs to be built:**
- Extend `usePersonData` or add a `usePersonCard` hook to also fetch `GET /users/{id}/manager` and `GET /users/{id}/directReports`
- New component: `PersonCard` — multi-section card layout using Fluent UI `Card`, `Popover`, and the existing `Person` component for sub-profiles
- Optional `PersonCardTrigger` wrapper that adds popover behaviour to any existing `Person` usage

**New Graph scopes required:** `User.Read.All` or `User.ReadBasic.All` (for manager/reports)

---

### 4. Agenda

| Property | Value |
| --- | --- |
| MGT component | [`mgt-agenda`](https://learn.microsoft.com/graph/toolkit/components/agenda) |
| Key Fluent UI controls | `Card`, `CardHeader`, `Text`, `Badge`, `Divider`, `Persona` |
| Porting effort | **3 / 6** |
| Usefulness | **7 / 10** |
| Priority score | **2.3** |

**What it does:** Displays upcoming calendar events from the user's Outlook calendar grouped by day. Shows subject, time range, location, organiser, and attendee list.

**Why it scores high:** Calendar integration is a frequently requested feature in Microsoft 365 apps, dashboards, and personal productivity tools.

**What needs to be built:**
- New hook: `useCalendarEvents` — queries `GET /me/calendarView` with start/end time parameters
- New component: `Agenda` — grouped event list with Fluent UI typography, `Divider`, and `Person` components for attendees
- Date/time formatting utilities

**New Graph scopes required:** `Calendars.Read`

---

### 5. FileList

| Property | Value |
| --- | --- |
| MGT component | [`mgt-file-list`](https://learn.microsoft.com/graph/toolkit/components/file-list) |
| Key Fluent UI controls | `DataGrid`, `DataGridRow`, `DataGridCell`, `TableCellLayout` |
| Porting effort | **3 / 6** |
| Usefulness | **7 / 10** |
| Priority score | **2.3** |

**What it does:** Lists files and folders from OneDrive or a SharePoint document library. Shows file type icon, name, modified date, and modified-by person.

**Why it scores high:** File picker and file browser scenarios are common in productivity and document management apps embedded in Teams or SharePoint.

**What needs to be built:**
- New hook: `useFileList` — queries `GET /me/drive/root/children` or a configurable drive/folder path
- New component: `FileList` — renders a Fluent UI list/data grid with file-type icons from `@fluentui/react-file-type-icons` or `@fluentui/react-icons`
- Optional: `File` single-item card component (analogous to `mgt-file`)

**New Graph scopes required:** `Files.Read`, `Files.Read.All` (for shared drives)

---

### 6. TeamsChannelPicker

| Property | Value |
| --- | --- |
| MGT component | [`mgt-teams-channel-picker`](https://learn.microsoft.com/graph/toolkit/components/teams-channel-picker) |
| Key Fluent UI controls | `TagPicker`, `TagPickerInput`, `TagPickerList`, `InteractionTag` |
| Porting effort | **3 / 6** |
| Usefulness | **6 / 10** |
| Priority score | **2.0** |

**What it does:** A `TagPicker`-style component (structurally identical to `PeoplePicker`) for selecting one or more Teams channels. Shows team name and channel name in the dropdown.

**Why it scores here:** Very useful when building Teams-hosted apps, but has limited relevance outside that context compared to people or file pickers.

**What needs to be built:**
- New hook: `useTeamsChannels` — two-step fetch: `GET /me/joinedTeams` followed by `GET /teams/{id}/channels` per team, with a search filter
- New type: `TeamsChannel` result shape
- New component: `TeamsChannelPicker` — reuses the `TagPicker` pattern from `PeoplePicker` almost verbatim

**New Graph scopes required:** `Team.ReadBasic.All`, `Channel.ReadBasic.All`

---

### 7. SearchBox + SearchResults

| Property | Value |
| --- | --- |
| MGT components | [`mgt-search-box`](https://learn.microsoft.com/graph/toolkit/components/search-box), [`mgt-search-results`](https://learn.microsoft.com/graph/toolkit/components/search-results) |
| Key Fluent UI controls | `SearchBox`, `List`, `Card`, `Spinner`, `Persona` |
| Porting effort | **4 / 6** |
| Usefulness | **7 / 10** |
| Priority score | **1.75** |

**What it does:** A pair of components: a search input and a corresponding results panel. The results panel displays matched items from Microsoft Graph Search across entity types (messages, files, people, sites, events).

**Why it scores here:** Cross-M365 search is a high-value feature but requires the complex Graph Search API (`POST /search/query`) and a flexible multi-entity result renderer.

**What needs to be built:**
- New hook: `useGraphSearch` — sends `POST /search/query` with configurable entity types, handles paging
- New component: `SearchBox` — thin Fluent UI `SearchBox` wrapper with debounce and provider-state awareness
- New component: `SearchResults` — configurable result list; default renderers per entity type (person, file, message); custom renderer support
- Type definitions for each result entity shape

**New Graph scopes required:** `Mail.Read`, `Files.Read`, `Sites.Read.All` (varies by entity types searched)

---

### 8. Tasks / Todo

| Property | Value |
| --- | --- |
| MGT components | [`mgt-tasks`](https://learn.microsoft.com/graph/toolkit/components/tasks), [`mgt-todo`](https://learn.microsoft.com/graph/toolkit/components/todo) |
| Key Fluent UI controls | `Checkbox`, `Input`, `Button`, `Badge`, `Spinner` |
| Porting effort | **4 / 6** |
| Usefulness | **6 / 10** |
| Priority score | **1.5** |

**What it does:** An interactive to-do task list backed by Microsoft To-Do (`/me/todo`) or Microsoft Planner (`/planner`). Supports creating, completing, and deleting tasks.

**Why it scores here:** The CRUD mutation pattern is a departure from the read-only fetch model used by all other components. Two separate backing API schemas (To-Do vs. Planner) also add complexity. Useful in productivity-focused apps but less universally needed than people or calendar components.

**What needs to be built:**
- New hook: `useTasks` — full CRUD over `GET/POST/PATCH/DELETE /me/todo/lists/{id}/tasks`
- Optional second hook: `usePlannerTasks` for Planner backend
- New component: `Tasks` — checklist UI with task creation input and per-task actions using Fluent UI `Checkbox`, `Input`, `Button`
- Optimistic update / rollback pattern for mutations

**New Graph scopes required:** `Tasks.ReadWrite` (Microsoft To-Do), `Tasks.ReadWrite` + `Group.ReadWrite.All` (Microsoft Planner)

---

### 9. Picker (generic)

| Property | Value |
| --- | --- |
| MGT component | [`mgt-picker`](https://learn.microsoft.com/graph/toolkit/components/picker) |
| Key Fluent UI controls | `TagPicker`, `Combobox`, `Option`, `InteractionTag` |
| Porting effort | **4 / 6** |
| Usefulness | **5 / 10** |
| Priority score | **1.25** |

**What it does:** A generic Graph entity picker. The caller provides an entity type, endpoint, and display-field mapping. The component handles search, selection, and token rendering similarly to `PeoplePicker`.

**Why it scores here:** Useful as a developer-facing building block but requires consumers to know the Graph API well. Most teams are better served by purpose-built pickers (PeoplePicker, TeamsChannelPicker) rather than a generic one.

**What needs to be built:**
- New generic hook: `useGraphPicker<T>` — queries a configurable Graph endpoint with a `$search` or `$filter` parameter
- New component: `Picker<T>` — generic TagPicker wrapper with configurable ID field, display field, and secondary field; custom option renderer support
- Type-safe configuration interface

**New Graph scopes required:** Varies by entity type (consumer-provided)

---

### 10. Organization

| Property | Value |
| --- | --- |
| MGT component | [`mgt-person-card`](https://learn.microsoft.com/graph/toolkit/components/person-card) (Organization tab) |
| Key Fluent UI controls | `Card`, `CardHeader`, `Avatar`, `Button`, `Spinner` |
| Porting effort | **5 / 6** |
| Usefulness | **5 / 10** |
| Priority score | **1.0** |

**What it does:** An interactive org-chart browser. Displays the manager chain above the target user, the user's own card in the middle, and direct reports below. Allows navigating up/down the hierarchy.

**Why it scores here:** Useful in directory and HR applications but niche for general Microsoft 365 apps. The recursive multi-step fetching (walk up the manager chain, fetch co-workers at each level) and the tree visualization layout add significant complexity.

**What needs to be built:**
- New hook: `useOrgChart` — recursive fetch of `GET /users/{id}/manager` (chain) and `GET /users/{id}/directReports`
- New component: `Organization` — tree layout with multiple `Person` cards, navigation controls, Fluent UI `Card`
- Depth limit and loading-per-node state management

**New Graph scopes required:** `User.Read.All` or `User.ReadBasic.All`

---

### 11. Chat

| Property | Value |
| --- | --- |
| MGT component | [`mgt-chat`](https://learn.microsoft.com/graph/toolkit/components/chat) |
| Key Fluent UI controls | `Textarea`, `Button`, `Persona`, `Divider`, `Spinner` |
| Porting effort | **6 / 6** |
| Usefulness | **6 / 10** |
| Priority score | **1.0** |

**What it does:** A Teams chat thread UI. Displays a message history and an input to send new messages. Requires real-time updates via Graph change notifications (webhooks or polling).

**Why it scores here:** High value if you are embedding a Teams chat surface in a custom app, but the real-time requirement (Graph subscriptions or polling), message rendering (rich text, attachments, reactions, threading), and the underlying volume of Graph API surface make this the most complex component on the list.

**What needs to be built:**
- New hook: `useChatMessages` — fetches `GET /chats/{id}/messages` and subscribes to change notifications (`POST /subscriptions`)
- New component: `Chat` — message bubble list, `Person` avatar per message, rich-text renderer, message input with send action
- Real-time update mechanism (webhook relay server or long-poll fallback)
- Optimistic send + error recovery

**New Graph scopes required:** `Chat.Read`, `Chat.ReadWrite`

---

### 12. TaxonomyPicker

| Property | Value |
| --- | --- |
| MGT component | [`mgt-taxonomy-picker`](https://learn.microsoft.com/graph/toolkit/components/taxonomy-picker) |
| Key Fluent UI controls | `Combobox`, `Option`, `OptionGroup`, `Tree`, `TreeItem` |
| Porting effort | **6 / 6** |
| Usefulness | **3 / 10** |
| Priority score | **0.5** |

**What it does:** A hierarchical term picker backed by the SharePoint taxonomy term store API (`/termStore`). Displays a searchable tree of term sets and terms.

**Why it scores low:** SharePoint-specific and only useful in SharePoint Framework (SPFx) or SharePoint-embedded app scenarios. The term store API (`/sites/{siteId}/termStore/groups/{id}/sets/{id}/terms`) is entirely separate from the user-centric Graph APIs used by all other components, requiring dedicated API integration work with minimal reuse of existing infrastructure.

**What needs to be built:**
- New hook: `useTermStore` — hierarchical fetch from SharePoint term store endpoint
- New component: `TaxonomyPicker` — tree-picker UI with search and hierarchical display
- SharePoint site context: caller must provide site URL or site ID
- Separate authentication scope handling for SharePoint

**New Graph scopes required:** `TermStore.Read.All` (SharePoint-specific), site-level `Sites.Read.All`

---

## Summary table

| Rank | Component | MGT reference | Effort | Usefulness | Priority Score | Key Fluent UI controls |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Login | [`mgt-login`](https://learn.microsoft.com/graph/toolkit/components/login) | 2 | 9 | 4.5 | `Button`, `Persona`, `Menu`, `MenuItem` |
| 2 | People | [`mgt-people`](https://learn.microsoft.com/graph/toolkit/components/people) | 2 | 8 | 4.0 | `AvatarGroup`, `AvatarGroupItem`, `AvatarGroupPopover` |
| 3 | PersonCard | [`mgt-person-card`](https://learn.microsoft.com/graph/toolkit/components/person-card) | 3 | 8 | 2.7 | `Popover`, `PopoverSurface`, `Card`, `CardHeader`, `Persona` |
| 4 | Agenda | [`mgt-agenda`](https://learn.microsoft.com/graph/toolkit/components/agenda) | 3 | 7 | 2.3 | `Card`, `CardHeader`, `Text`, `Badge`, `Divider`, `Persona` |
| 5 | FileList | [`mgt-file-list`](https://learn.microsoft.com/graph/toolkit/components/file-list) | 3 | 7 | 2.3 | `DataGrid`, `DataGridRow`, `DataGridCell`, `TableCellLayout` |
| 6 | TeamsChannelPicker | [`mgt-teams-channel-picker`](https://learn.microsoft.com/graph/toolkit/components/teams-channel-picker) | 3 | 6 | 2.0 | `TagPicker`, `TagPickerInput`, `TagPickerList`, `InteractionTag` |
| 7 | SearchBox + SearchResults | [`mgt-search-box`](https://learn.microsoft.com/graph/toolkit/components/search-box), [`mgt-search-results`](https://learn.microsoft.com/graph/toolkit/components/search-results) | 4 | 7 | 1.75 | `SearchBox`, `List`, `Card`, `Spinner`, `Persona` |
| 8 | Tasks / Todo | [`mgt-tasks`](https://learn.microsoft.com/graph/toolkit/components/tasks), [`mgt-todo`](https://learn.microsoft.com/graph/toolkit/components/todo) | 4 | 6 | 1.5 | `Checkbox`, `Input`, `Button`, `Badge`, `Spinner` |
| 9 | Picker | [`mgt-picker`](https://learn.microsoft.com/graph/toolkit/components/picker) | 4 | 5 | 1.25 | `TagPicker`, `Combobox`, `Option`, `InteractionTag` |
| 10 | Organization | [`mgt-person-card`](https://learn.microsoft.com/graph/toolkit/components/person-card) (org tab) | 5 | 5 | 1.0 | `Card`, `CardHeader`, `Avatar`, `Button`, `Spinner` |
| 11 | Chat | [`mgt-chat`](https://learn.microsoft.com/graph/toolkit/components/chat) | 6 | 6 | 1.0 | `Textarea`, `Button`, `Persona`, `Divider`, `Spinner` |
| 12 | TaxonomyPicker | [`mgt-taxonomy-picker`](https://learn.microsoft.com/graph/toolkit/components/taxonomy-picker) | 6 | 3 | 0.5 | `Combobox`, `Option`, `OptionGroup`, `Tree`, `TreeItem` |

---

## Recommended implementation order

The priority score translates directly into a suggested milestone sequence:

**Phase A — High value, low effort (do first)**
1. `Login` — trivial wiring of provider state, needed by almost every app
2. `People` — avatar group layout, reuses `Person` directly

**Phase B — High value, moderate effort**
3. `PersonCard` — natural extension of `Person`, popover + manager fetch
4. `Agenda` — new calendar domain, read-only, clean API
5. `FileList` — new files domain, read-only, clean API

**Phase C — Moderate value, moderate effort**
6. `TeamsChannelPicker` — clone of `PeoplePicker` pattern for a new domain
7. `SearchBox` + `SearchResults` — complex API but high consumer demand

**Phase D — Higher effort, situational value**
8. `Tasks` / `Todo` — introduces CRUD mutation pattern
9. `Picker` (generic) — developer utility, lower urgency

**Phase E — Complex or niche (defer)**
10. `Organization` — complex recursive fetch and tree layout
11. `Chat` — real-time requirement significantly raises complexity
12. `TaxonomyPicker` — SharePoint-specific; out of scope for most consumers
