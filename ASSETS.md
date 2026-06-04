# LaunchLens Asset Index

> 中文 | English

本文件整理本次为 UCWS Singapore Hackathon 2026 生成的仓库内资产，方便提交、复盘和 GitHub 展示。

## App 文件

| 文件 | 用途 |
| --- | --- |
| `index.html` | LaunchLens 主界面，包含 Temple Mode、Classic Mode、Project Wall 表单、评分输出、Optional LLM 面板 |
| `styles.css` | 页面视觉样式、Temple 背景层、热点布局和响应式布局 |
| `app.js` | 评分逻辑、材料生成、复制导出、本地保存、Temple 节点交互、大模型增强调用 |
| `package.json` | 本地运行、测试、payload、GitHub 发布和提交脚本入口 |

## 视觉资产

| 文件 | 用途 |
| --- | --- |
| `assets/logo.svg` | 项目 logo，可用于 Project Wall logo 字段 |
| `assets/social-card.svg` | 社交分享图 / GitHub 预览图备用 |
| `assets/temple-background.png` | 原创生成的 2.5D 古迹空间背景，用于 Temple Mode |
| `assets/screenshot.png` | 桌面版 Temple Mode 项目截图 |
| `assets/screenshot-mobile.png` | 移动版 Temple Mode 项目截图 |

## 比赛提交材料

| 文件 | 用途 |
| --- | --- |
| `README.md` | GitHub 仓库首页，中英双语版本 |
| `PROJECT_WALL_FIELDS.md` | Project Wall 字段复制源 |
| `SUBMISSION.md` | 完整提交文案草稿 |
| `FINAL_SUBMISSION_RUNBOOK.md` | 最终提交执行清单 |
| `SPACE_INTERACTION_SPEC.md` | Temple Mode / Classic Mode 空间交互规格 |
| `SUBMISSION_AUDIT.md` | 当前完成度、阻塞项和验证状态 |
| `HACKATHON_STRATEGY.md` | 参赛策略与定位 |
| `PROJECT_WALL_RESEARCH.md` | 官方 Project Wall/API 研究记录 |
| `SOURCE.md` | 临时公开源码说明页 |

## 自动化脚本

| 文件 | 用途 |
| --- | --- |
| `tools/serve.mjs` | 在 `http://localhost:8080/launchlens/` 启动本地 demo |
| `tools/serve-public-root.mjs` | 只暴露 `launchlens/` 目录给临时公网 tunnel |
| `tools/build-project-payload.mjs` | 生成 `project-payload.json` |
| `tools/validate-submission.mjs` | 提交前验证 payload，拦截非 GitHub Repo URL 和占位团队成员 |
| `tools/publish-github.mjs` | 使用 GitHub token 创建/复用仓库、生成 payload、提交并 push |
| `tools/push-github.mjs` | 推送到已存在的 GitHub remote |
| `tools/create-github-repo.mjs` | 单独创建 GitHub 仓库 |
| `tools/submit-project.mjs` | 使用 Epic Connector token 提交 Project Wall |
| `tools/complete-submission.mjs` | GitHub 发布、payload 验证、Project Wall 提交的一键流程 |

## 配置与部署

| 文件 | 用途 |
| --- | --- |
| `.github/workflows/pages.yml` | GitHub Pages 自动部署 workflow |
| `netlify.toml` | Netlify 静态部署配置 |
| `vercel.json` | Vercel 静态部署配置 |
| `.gitignore` | 忽略本地依赖、日志、临时源码包和部署缓存 |

## 生成包

| 文件 | 用途 |
| --- | --- |
| `launchlens-source.zip` | 临时公网源码包，已被 `.gitignore` 排除，不作为 GitHub 源码提交 |

## LLM API 预留

LaunchLens App 已保留 Optional LLM 能力：

- `index.html` 中的 Optional LLM 面板提供 endpoint、model、API key 输入。
- `app.js` 中的 `enhanceWithLlm()` 使用 OpenAI-compatible `chat/completions` 格式调用。
- API key 由用户在浏览器中输入，不提交到仓库。

## English Summary

This repository includes the LaunchLens app, implemented Temple Mode and Classic Mode, visual assets, Project Wall copy, final submission checklist, the Temple Mode interaction spec, deployment configs, validation scripts, GitHub publishing scripts, and an optional OpenAI-compatible LLM enhancement slot. The final GitHub README is bilingual and ready for the hackathon repository home page.
