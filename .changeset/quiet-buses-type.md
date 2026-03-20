---
"@devsym/graph-toolkit-react": patch
---

Limit the default `People` list and `PeoplePicker` initial suggestions to tenant directory users.

- Load Graph-backed default `People` entries from `/users` instead of `/me/people`
- Load Graph-backed `PeoplePicker` initial suggestions from `/users` so they stay tenant-scoped
- Update related docs and sample guidance to use `User.ReadBasic.All` for these directory-backed defaults
