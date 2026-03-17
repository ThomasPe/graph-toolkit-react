---
"@devsym/graph-toolkit-react": minor
---

Add `PeoplePicker` component backed by Microsoft Graph people search.

- New `PeoplePicker` component using Fluent UI `TagPicker` with avatar tags and search dropdown
- New `usePeopleSearch` hook for searching users via Graph API (`/users?$search=...`) or `MockProvider` mock data
- New `IPeopleSearchProvider` interface and `isPeopleSearchProvider` type guard in `IPersonDataProvider`
- `MockProvider` now implements `IPeopleSearchProvider` with a 10-person mock roster
- New `PeoplePickerPerson` and `PeoplePickerProps` exported types
- Supports controlled and uncontrolled modes, `maxPeople` limit, `searchMinChars`, and standard Fluent UI `size`/`appearance`/`disabled` props
