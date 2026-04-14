---
'@devsym/graph-toolkit-react': minor
---

Add `photoUrl` field to `PersonDetails` so callers can supply a pre-resolved profile photo URL. When provided, the `Person` component uses it directly for the avatar image without making an additional fetch.
