# Re-Forge Integration Notes

LaunchLens now references [`Akasxh/re-forge`](https://github.com/Akasxh/re-forge) as an external methodology source for stronger long-term hackathon operations.

## Why It Fits

LaunchLens is becoming more than a one-time UCWS submission helper. It is a reusable workspace for hackathon teams to reason, build, archive, verify, and submit. Re-forge is useful because it frames multi-agent work around adversarial gates, evidence, institutional memory, testing, documentation, and evolution. Those ideas match the direction LaunchLens needs for future hackathon seasons.

## What Was Integrated

| LaunchLens Area | Re-Forge-Inspired Addition |
| --- | --- |
| Guided process | Added an Adversarial Gate step before final shipping. |
| Agent Studio | Added `Re-Forge Gate Agent` for upgrade audits and evidence pressure-testing. |
| Tool Stack | Added a linked `re-forge` recommendation card. |
| Hub star map | `re-forge` now appears as a tool node in the visual project graph. |
| Codex API | Added external reference metadata so future Codex sessions know the method source. |
| Repository practice | Added `CHANGELOG.md` and attribution discipline for future upgrades. |

## What Was Not Integrated

- No source code was copied from `re-forge`.
- No agent prompts, scripts, hooks, tests, assets, or setup files were copied.
- LaunchLens does not require Claude Code or `re-forge` to run.
- LaunchLens remains a static browser app with optional Supabase and optional OpenAI-compatible LLM settings.

## How To Use It In LaunchLens

1. Open the public demo: https://wangsiyi7.github.io/launchlens/
2. Switch to Classic mode or Hub mode.
3. In Agent Studio, choose `Re-Forge Gate Agent`.
4. Run the agent before major changes.
5. Use its output to check assumptions, attribution, evidence, changelog readiness, and future maintainability.
6. Update `CHANGELOG.md` before pushing the next release.

## Chinese Summary / 中文摘要

LaunchLens 将 `re-forge` 作为方法论参考，而不是代码依赖。整合重点是：对抗校验、证据基底、跨会话记忆、能力演进和更新日志纪律。这样 LaunchLens 不只是一次性提交工具，而是可以长期服务 UCWS 和后续黑客松的协作平台。

使用方式：在 Demo 中进入 Agent Studio，选择 `Re-Forge Gate Agent`，让它在每次重大升级前检查假设、证据、归因、更新日志和后续维护风险。

## Source And License

- Repository: https://github.com/Akasxh/re-forge
- License: MIT
- Attribution record: `docs/ATTRIBUTION.md`

