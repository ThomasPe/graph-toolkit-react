# Extracted Patterns from mgt-person Component

> Historical research notes retained for implementation reference.
> Some details may be superseded by the current library implementation.

**Purpose:** Reference guide for rebuilding Person component in React + Fluent UI

## Component Props (from mgt-person.ts)

**Identity resolution (pick one):**
- `userId` - Direct user ID/UPN
- `personQuery` - Search string to find person
- `personDetails` - Provide object directly (skip fetch)

**Display configuration:**
- `view` - ViewType: `avatar` | `oneline` | `twolines` | `threelines` | `fourlines`
- `showPresence` - boolean
- `avatarSize` - Size variant (historical mgt-person prop)
- `avatarType` - `photo` | `initials`
- `fetchImage` - boolean (default true)

Current toolkit note: the React `Person` component now passes Fluent `PersonaProps` directly. Use `size` (Persona prop) instead of compatibility wrappers such as `avatarSize`/`numericSize`.

**Interaction:**
- `personCardInteraction` - Controls person card behavior
- Click events: `line1clicked`, `line2clicked`, `line3clicked`, `line4clicked`

**Properties returned by Graph (defaultPersonProperties):**
```
businessPhones, displayName, givenName, jobTitle, department, 
mail, mobilePhone, officeLocation, preferredLanguage, surname,
userPrincipalName, id, userType
```

## Graph API Calls

**From graph.user.ts:**
- `getMe()` - GET /me
- `getUser(graph, userPrincipleName, requestedProps?)` - GET /users/{id}
- `findUsers(graph, query)` - GET /users?$search="displayName:{query}"
- Cache with TTL checking via `getUserInvalidationTime()`

**From graph.photos.ts:**
- `getPersonImage(graph, person)` - GET /users/{id}/photo/$value
- Returns blob URL or null for fallback to initials

**From graph.presence.ts:**
- `getUserPresence(graph, userId)` - GET /communications/presences/{userId}
- `getUsersPresenceByPeople()` - Batch via POST /communications/getPresencesByUserId
- Falls back to individual calls if batch fails

**From graph.people.ts:**
- `findPeople(graph, query)` - GET /me/people?$search={query}
- `getEmailFromGraphEntity(entity)` - Helper to extract email

## View Type Mapping

- `avatar` - Avatar only
- `oneline` - Avatar + displayName
- `twolines` - Avatar + displayName + jobTitle
- `threelines` - Avatar + displayName + jobTitle + department
- `fourlines` - Avatar + displayName + jobTitle + department + officeLocation (optional)

## Presence Handling

Presence availability states map to visual indicators:
- Available, AvailableIdle
- Away, BeRightBack
- Busy, BusyIdle, DoNotDisturb
- Offline, PresenceUnknown

## Caching Strategy

**User data:**
- Cache key: user ID or UPN
- TTL: Configurable invalidation time
- Check `getUserInvalidationTime()` before returning cached data

**Photos:**
- Blob URLs cached in memory
- Fallback to initials on failure

**Presence:**
- Short TTL (recommend 30-60s)
- Batch fetching for multiple users

## Loading States

- Show skeleton/shimmer while fetching
- Progressively render: photo → name → details
- Handle missing provider gracefully

## Error Handling

- Missing provider → informational message
- 401/403 → silent fallback to initials/no presence
- Network errors → retry with backoff, then fallback UI
- Invalid user → show empty state or error message

## Fluent UI Mapping

**Target component:** `Persona` from `@fluentui/react-components`

**Props mapping:**
- `name` ← displayName
- `secondaryText` ← jobTitle (twolines+)
- `tertiaryText` ← department (threelines+)
- `quaternaryText` ← officeLocation (fourlines)
- `presence` ← map Graph presence to Fluent UI PresenceBadgeStatus
- `avatar.image.src` ← photo blob URL
- `avatar.initials` ← computed from name
- `size` ← map avatar size

## Provider Pattern

**Interface needed:**
- `getAccessToken(scopes: string[]): Promise<string>`
- `login(): Promise<void>`
- `logout(): Promise<void>`
- `getState(): ProviderState`

**React Context:**
- `GraphProvider` component wraps app
- `useProvider()` hook accesses provider
- `useGraphClient()` creates Graph Client instance

## Required Scopes

- `User.Read` - Read user profile
- `User.ReadBasic.All` - Read other users
- `Presence.Read` - Read presence
- `People.Read` - Search people

## Accessibility

- Avatar alt text = displayName
- Keyboard navigation support
- Semantic HTML for text sections
- Theme awareness (light/dark)

---

**Next Steps:**
1. Create IProvider interface
2. Build usePersonData hook with Graph calls
3. Implement Person component using Fluent UI Persona
4. Add loading/error states
5. Write unit tests with mocked Graph responses