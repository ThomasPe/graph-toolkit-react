---
"@devsym/graph-toolkit-react": minor
---

Add MGT-style Person line customization support.

- support `line1Property` through `line4Property` with comma-separated fallbacks
- support `presenceAvailability` and `presenceActivity` line mappings
- add `renderLine1` through `renderLine4` as the React replacement for MGT line templates
- fetch additional Graph user fields automatically when line mappings reference them