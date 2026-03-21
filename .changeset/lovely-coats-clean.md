---
"@devsym/graph-toolkit-react": patch
---

Fix `People` direct-data enrichment to prefer `userPrincipalName` or `mail` before `id` when resolving a Graph user identifier, avoiding invalid `/users/{local-id}` lookups for app-supplied people.
