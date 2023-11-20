---
"@carrot-kpi/host-frontend": patch
---

Move KPITokenCreationForm to dedicated component to avoid unncessary Layout
component re-renders, triggering many http calls
