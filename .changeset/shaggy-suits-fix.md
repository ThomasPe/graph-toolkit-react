---
"@devsym/graph-toolkit-react": patch
---

Fix `Person` so `view="avatar"` renders only the avatar without any text lines.

- suppress Persona text slots for avatar-only view
- add regression coverage for avatar-only rendering
- add an explicit Storybook story for the avatar-only variant