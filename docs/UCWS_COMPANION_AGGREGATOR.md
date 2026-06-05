# UCWS Companion Project Aggregator

LaunchLens now has a sibling project folder at:

```text
C:\Users\35398\Desktop\UCWS 2026\ucws-project-aggregator
```

The companion project aggregates UCWS project sources, adds evidence norms, exposes a static judge-facing demo, and provides a reusable Codex skill.

## Linked Sources

- Official UCWS repository: https://github.com/EpicConnectorAI/UCWS-SINGAPORE-HACKATHON-2026
- LaunchLens repository: https://github.com/wangsiyi7/launchlens
- LaunchLens demo: https://wangsiyi7.github.io/launchlens/
- Companion aggregator repository: https://github.com/wangsiyi7/ucws-project-aggregator
- Companion local demo: http://127.0.0.1:8082/
- Companion online demo: https://wangsiyi7.github.io/ucws-project-aggregator/

## Data Flow

1. LaunchLens fetches authenticated UCWS Project Wall data into `data/ucws-project-wall.json`.
2. The companion project reads LaunchLens output plus the official UCWS archive under `_tmp_ucws_official_repo/projects`.
3. The companion project writes `data/project-index.json`.
4. The companion demo displays searchable project records, evidence gaps, and review briefs.

## Commands

```powershell
cd "C:\Users\35398\Desktop\UCWS 2026\ucws-project-aggregator"
npm.cmd run build
npm.cmd test
npm.cmd run serve
```

The dynamic wall still requires `EPIC_TOKEN` to be configured in LaunchLens before running `npm.cmd run sync:ucws`.
