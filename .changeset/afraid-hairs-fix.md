---
"@carrot-kpi/react": patch
---

Reset result array before filling it again in useResolvedKPITokens hook (it
avoids resolved KPI tokens accumulation)
