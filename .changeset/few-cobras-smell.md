---
"@devsym/graph-toolkit-react": major
---

Simplify `Person` to pass Fluent UI `Persona` props through directly.

- `PersonProps` now extends `PersonaProps` directly
- Remove compatibility-only props (`avatarSize`, `numericSize`, `onPersonaClick`, and custom `onClick(person)` behavior)
- Keep Graph-powered defaults for name/avatar/presence and `view`-based text mapping
