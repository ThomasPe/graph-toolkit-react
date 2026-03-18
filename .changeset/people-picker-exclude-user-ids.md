---
"@devsym/graph-toolkit-react": minor
---

Add `excludeUserIds` prop to `PeoplePicker` component.

When provided, user IDs in this array are filtered out of the search results dropdown.
The component automatically requests extra results from the search backend (`maxSearchResults + excludeUserIds.length`) to ensure the dropdown still shows up to `maxSearchResults` items after exclusion.
