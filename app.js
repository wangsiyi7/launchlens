(function () {
  const STORAGE_KEY = "launchlens.ucws.project";
  const LANGUAGE_KEY = "launchlens.ucws.language";
  const tabs = ["pack", "readme", "pitch", "sprint", "risks"];
  const fields = [
    "name",
    "track",
    "tagline",
    "audience",
    "problem",
    "solution",
    "demoUrl",
    "repoUrl",
    "techStack",
    "screenshotUrls",
    "logoUrl",
    "demoVideoUrl",
    "demoFileUrl",
    "teamMembers",
    "notes",
  ];
  const Core = window.LaunchLensPlatformCore;
  const PLATFORM_KEY = "launchlens.ucws.platform";
  const SUPABASE_KEY = "launchlens.ucws.supabase";

  const weights = {
    community: 30,
    ai: 30,
    expert: 40,
  };

  const strings = {
    en: {
      "brand.eyebrow": "UCWS Singapore 2026 / Builder Collaboration App",
      "mode.temple": "Temple",
      "mode.hub": "Hub",
      "mode.classic": "Classic",
      "button.sample": "Load Sample",
      "button.reset": "Reset",
      "button.copy": "Copy Markdown",
      "button.copied": "Copied",
      "button.download": "Download Pack",
      "button.review": "Run Review Agent",
      "button.reviewShort": "Run Review",
      "button.generate": "Generate Pack",
      "button.llm": "Optional LLM",
      "button.enhance": "Enhance Current Pack",
      "button.enhancing": "Enhancing...",
      "button.copyPack": "Copy Pack",
      "button.buildStarMap": "Build Star Map",
      "button.openGuide": "Open Guide",
      "button.copyApi": "Copy Codex API JSON",
      "button.runAgent": "Run Agent",
      "button.archiveIdea": "Archive Idea",
      "button.saveSupabase": "Save Snapshot",
      "button.loadSupabase": "Load Snapshot",
      "temple.eyebrow": "Submission Temple",
      "hub.eyebrow": "Hackathon Hub",
      "hub.title": "Idea star map",
      "hub.body": "Paste rough ideas, requirements, risks, or Codex notes. LaunchLens turns them into linked project nodes.",
      "hub.inspect": "Inspect",
      "hub.filter.ideas": "Ideas",
      "hub.filter.agents": "Agents",
      "hub.filter.evidence": "Evidence",
      "hub.filter.tools": "Tools",
      "hub.filter.process": "Process",
      "platform.eyebrow": "Platform Console",
      "platform.title": "Build, reason, archive, and sync",
      "platform.local": "Local workspace",
      "process.eyebrow": "Process",
      "process.title": "Guided hackathon path",
      "agent.eyebrow": "Agent Studio",
      "agent.title": "Run focused project agents",
      "tutorial.eyebrow": "Demo Tutorial",
      "tutorial.title": "Show the platform in six moves",
      "ideas.eyebrow": "Idea Archive",
      "ideas.title": "Record linked project thinking",
      "tools.eyebrow": "Tool Stack",
      "tools.title": "Recommended builder tools",
      "sync.eyebrow": "Supabase Sync",
      "sync.title": "Optional backend workspace",
      "sync.localOnly": "Local only until Supabase credentials are added.",
      "sync.saved": "Workspace snapshot saved to Supabase.",
      "sync.loaded": "Workspace snapshot loaded.",
      "sync.failed": "Supabase sync failed",
      "agent.empty": "Run an agent to generate focused next actions.",
      "ideas.empty": "Archive ideas or paste them in Hub to build the star map.",
      "ideas.parentNone": "No parent idea",
      "ideas.seed": "Seed",
      "ideas.linked": "Linked",
      "api.copied": "Codex API JSON copied.",
      "placeholder.hubIdeaInput": "One idea per line. Example: Supabase sync, 2.5D demo tour, Codex API export...",
      "placeholder.ideaTitle": "Idea title",
      "placeholder.ideaSummary": "Why it matters, what it changes, or what it unlocks.",
      "placeholder.ideaTags": "agent, demo, backend",
      "placeholder.supabaseAnonKey": "Supabase anon key",
      "intake.eyebrow": "Project Intake",
      "intake.title": "Submission fields",
      "status.saved": "Saved locally",
      "status.saving": "Saving...",
      "field.name": "Project name",
      "field.track": "Track",
      "field.tagline": "Tagline",
      "field.audience": "Target users",
      "field.problem": "Problem",
      "field.solution": "Solution",
      "field.demoUrl": "Demo URL",
      "field.repoUrl": "Repo URL",
      "field.techStack": "Tech stack",
      "field.screenshotUrls": "Screenshot URLs",
      "field.logoUrl": "Logo URL",
      "field.demoVideoUrl": "Demo video URL",
      "field.demoFileUrl": "Demo file URL",
      "field.teamMembers": "Team members",
      "field.notes": "README or rough notes",
      "placeholder.tagline": "Turn rough hackathon ideas into scored, ready-to-submit Project Wall packages.",
      "placeholder.audience": "Hackathon teams, solo builders, community reviewers",
      "placeholder.problem": "Teams lose time turning real work into clear submission materials before deadline.",
      "placeholder.solution": "LaunchLens analyzes required UCWS fields, scores readiness, and generates a focused submission pack.",
      "placeholder.techStack": "HTML, CSS, JavaScript, localStorage, optional OpenAI-compatible API",
      "placeholder.screenshotUrls": "Comma-separated image URLs after deployment",
      "placeholder.logoUrl": "Public logo URL used on Project Wall",
      "placeholder.demoVideoUrl": "Optional Loom, YouTube, or hosted demo video",
      "placeholder.demoFileUrl": "Optional public demo file or downloadable artifact",
      "placeholder.teamMembers": "Name - role - link",
      "placeholder.notes": "Paste README, build notes, judging context, or customer discovery here.",
      "placeholder.llmKey": "Stored only in this browser session",
      "readiness.eyebrow": "Readiness",
      "llm.endpoint": "Endpoint",
      "llm.model": "Model",
      "llm.key": "API key",
      "tab.pack": "Submission Pack",
      "tab.readme": "README",
      "tab.pitch": "Pitch",
      "tab.sprint": "Sprint Plan",
      "tab.risks": "Fix List",
      "audit.eyebrow": "Field Audit",
      "audit.title": "Project Wall coverage",
      "tasks.eyebrow": "Next Actions",
      "tasks.title": "Submission task board",
      "repo.eyebrow": "Repo Scanner",
      "repo.title": "GitHub evidence",
      "repo.scan": "Scan",
      "repo.empty": "Add a GitHub repo URL to scan.",
      "repo.scanning": "Scanning public GitHub signals...",
      "repo.invalid": "Use an HTTPS GitHub repository URL.",
      "repo.ready": "Repo evidence is inspectable.",
      "repo.weak": "Repo exists, but evidence is thin.",
      "repo.failed": "Repo scan failed",
      "repo.exists": "Repository exists",
      "repo.readme": "README present",
      "repo.entry": "App entry present",
      "repo.tests": "Tests or QA path present",
      "repo.deploy": "Deployment config present",
      "repo.recent": "Recent commit activity",
      "handoff.eyebrow": "Handoff",
      "handoff.title": "Final submit readiness",
      "handoff.ready": "Ready",
      "handoff.draft": "Draft",
      "audit.required": "Required",
      "audit.recommended": "Recommended",
      "audit.ready": "Ready",
      "audit.missing": "Missing",
      "task.ready": "No blockers detected. Run one final human review before submitting.",
      "task.fixFirst": "Fix first",
      "handoff.demo": "Stable demo",
      "handoff.repo": "GitHub repo",
      "handoff.assets": "Screenshots and logo",
      "handoff.team": "Real team",
      "handoff.copy": "Copy-ready pack",
      "mobile.story": "Story",
      "mobile.proof": "Proof",
      "mobile.score": "Score",
      "mobile.llm": "LLM",
      "mobile.pack": "Pack",
      "mobile.submit": "Submit",
      "node.intake.short": "Project Altar",
      "node.evidence.short": "Evidence Steps",
      "node.score.short": "Score Gate",
      "node.oracle.short": "Oracle LLM",
      "node.archive.short": "Archive Hall",
      "node.final.short": "Final Door",
      "space.intake.label": "Project Altar",
      "space.intake.title": "Shape the project story",
      "space.intake.body": "Start with the project name, track, tagline, target users, problem, and solution.",
      "space.intake.primary": "Open Fields",
      "space.evidence.label": "Evidence Steps",
      "space.evidence.title": "Attach proof reviewers can inspect",
      "space.evidence.body": "Add demo URL, GitHub repo, tech stack, screenshots, team members, and rough notes.",
      "space.evidence.primary": "Add Evidence",
      "space.score.label": "Score Gate",
      "space.score.title": "Run the UCWS readiness review",
      "space.score.body": "Score the project against community vote, AI evaluation, and expert judging signals.",
      "space.score.primary": "Run Score",
      "space.oracle.label": "Oracle LLM",
      "space.oracle.title": "Use your own model to refine copy",
      "space.oracle.body": "Open the reserved OpenAI-compatible endpoint, model, and API key panel for optional enhancement.",
      "space.oracle.primary": "Open Oracle",
      "space.archive.label": "Archive Hall",
      "space.archive.title": "Review the generated submission pack",
      "space.archive.body": "Inspect the Markdown pack, README draft, pitch, sprint plan, and fix list before export.",
      "space.archive.primary": "Open Pack",
      "space.final.label": "Final Door",
      "space.final.title": "Prepare GitHub and Project Wall handoff",
      "space.final.body": "Use the copied pack with the final GitHub repo URL, stable demo URL, screenshots, and real team names.",
      "space.final.primary": "Submit Checklist",
      "score.community": "Community Vote",
      "score.ai": "AI Evaluation",
      "score.expert": "Expert Judges",
      "score.community.note": "Clarity, user appeal, shareability, and public demo readiness.",
      "score.ai.note": "Repo quality signals, implementation detail, structure, and authenticity.",
      "score.expert.note": "Problem depth, product value, technical execution, and global scale.",
      "fix.demo": "Add a public demo URL. UCWS reviewers and voters need immediate access.",
      "fix.repo": "Add a GitHub repo URL with a clear README and setup path.",
      "fix.screenshot": "Add at least one project screenshot URL after deployment.",
      "fix.logo": "Add a public logo URL so the Project Wall card looks credible.",
      "fix.video": "Add a short demo video URL if time allows; it helps voters understand the flow fast.",
      "fix.file": "Add an optional demo file URL only if it improves judging evidence.",
      "fix.tagline": "Strengthen the tagline so value is clear in one sentence.",
      "fix.problem": "Name the target user's concrete pain, not only the technology.",
      "fix.solution": "Explain what the product does and what output users get.",
      "fix.stack": "List at least three concrete tech stack items.",
      "fix.notes": "Paste README/build notes so the generated pack has enough evidence.",
      "fix.global": "Describe how the product can be used beyond one local context.",
      "fix.demoPath": "Add a short demo path that a judge can follow in under two minutes.",
      "fix.ready": "Ready for submission review.",
      "missing.llm": "LLM settings missing: endpoint, model, and API key are required.",
      "failed.llm": "LLM request failed",
      "sample.tagline": "Turn rough hackathon ideas into scored, ready-to-submit Project Wall packages.",
      "sample.audience": "Hackathon teams, solo builders, community reviewers, and demo-day organizers",
      "sample.problem": "Builders often have real work but lose the last day converting product notes into clear submissions that voters, AI evaluators, and judges can understand quickly.",
      "sample.solution": "LaunchLens runs a browser-based review agent over UCWS submission fields, scores readiness across community vote, AI evaluation, and expert judging, then generates Markdown, README, pitch, sprint plan, and fix list outputs.",
      "sample.stack": "HTML, CSS, JavaScript, localStorage, 2.5D generated bitmap background, optional OpenAI-compatible API",
      "sample.team": "Alex - builder - Project Wall profile",
      "sample.notes": "The product is built as a static web app so any team can use it instantly. It aligns to UCWS required fields: name, tagline, description, demo URL, repo URL, track, tech stack, screenshot, team members, project logo, demo video, and demo file. It also mirrors the event scoring model: community clarity, AI-evaluable repo quality, and expert judging around product value and global scalability. The first screen is Temple Mode: a 2.5D spatial submission workflow with six clickable nodes for project story, evidence, score, Oracle LLM, generated archive, and final handoff. Classic Mode remains available for fast form editing. Outputs can be copied or downloaded for submission.",
    },
    zh: {
      "brand.eyebrow": "UCWS Singapore 2026 / 开发者协作应用",
      "mode.temple": "神殿",
      "mode.hub": "星图",
      "mode.classic": "经典",
      "button.sample": "载入示例",
      "button.reset": "重置",
      "button.copy": "复制 Markdown",
      "button.copied": "已复制",
      "button.download": "下载材料包",
      "button.review": "运行评审助手",
      "button.reviewShort": "运行评审",
      "button.generate": "生成材料包",
      "button.llm": "可选大模型",
      "button.enhance": "优化当前材料",
      "button.enhancing": "优化中...",
      "button.copyPack": "复制材料包",
      "button.buildStarMap": "构建星图",
      "button.openGuide": "打开引导",
      "button.copyApi": "复制 Codex API JSON",
      "button.runAgent": "运行 Agent",
      "button.archiveIdea": "归档想法",
      "button.saveSupabase": "保存快照",
      "button.loadSupabase": "读取快照",
      "temple.eyebrow": "提交神殿",
      "hub.eyebrow": "黑客松 Hub",
      "hub.title": "想法星图",
      "hub.body": "粘贴粗糙想法、需求、风险或 Codex 笔记，LaunchLens 会把它们转成有关联的项目节点。",
      "hub.inspect": "检查",
      "hub.filter.ideas": "想法",
      "hub.filter.agents": "Agent",
      "hub.filter.evidence": "证据",
      "hub.filter.tools": "工具",
      "hub.filter.process": "流程",
      "platform.eyebrow": "平台控制台",
      "platform.title": "构建、思考、归档与同步",
      "platform.local": "本地工作区",
      "process.eyebrow": "流程",
      "process.title": "黑客松引导路径",
      "agent.eyebrow": "Agent 工作室",
      "agent.title": "运行聚焦的项目 Agent",
      "tutorial.eyebrow": "演示教程",
      "tutorial.title": "用六步讲清平台",
      "ideas.eyebrow": "想法归档",
      "ideas.title": "记录项目思考的关联",
      "tools.eyebrow": "工具栈",
      "tools.title": "推荐的开发工具",
      "sync.eyebrow": "Supabase 同步",
      "sync.title": "可选后端工作区",
      "sync.localOnly": "填写 Supabase 凭据前仅本地保存。",
      "sync.saved": "工作区快照已保存到 Supabase。",
      "sync.loaded": "工作区快照已读取。",
      "sync.failed": "Supabase 同步失败",
      "agent.empty": "运行一个 Agent 后，这里会生成聚焦的下一步行动。",
      "ideas.empty": "归档想法，或在星图 Hub 中粘贴想法来构建节点。",
      "ideas.parentNone": "无父级想法",
      "ideas.seed": "种子",
      "ideas.linked": "已关联",
      "api.copied": "Codex API JSON 已复制。",
      "placeholder.hubIdeaInput": "每行一个想法。例如：Supabase 同步、2.5D 演示教程、Codex API 导出...",
      "placeholder.ideaTitle": "想法标题",
      "placeholder.ideaSummary": "它为什么重要、改变什么、解锁什么能力。",
      "placeholder.ideaTags": "agent, demo, backend",
      "placeholder.supabaseAnonKey": "Supabase anon key",
      "intake.eyebrow": "项目输入",
      "intake.title": "提交字段",
      "status.saved": "已本地保存",
      "status.saving": "保存中...",
      "field.name": "项目名称",
      "field.track": "赛道",
      "field.tagline": "一句话介绍",
      "field.audience": "目标用户",
      "field.problem": "问题",
      "field.solution": "解决方案",
      "field.demoUrl": "Demo 链接",
      "field.repoUrl": "仓库链接",
      "field.techStack": "技术栈",
      "field.screenshotUrls": "截图链接",
      "field.logoUrl": "Logo 链接",
      "field.demoVideoUrl": "演示视频链接",
      "field.demoFileUrl": "演示文件链接",
      "field.teamMembers": "团队成员",
      "field.notes": "README 或草稿笔记",
      "placeholder.tagline": "把粗糙的黑客松想法变成可评分、可提交的 Project Wall 材料包。",
      "placeholder.audience": "黑客松团队、独立开发者、社区评审者",
      "placeholder.problem": "团队常常有真实产品，却在截止前卡在如何写清楚提交材料。",
      "placeholder.solution": "LaunchLens 检查 UCWS 必填字段，生成评分、修复建议和提交材料包。",
      "placeholder.techStack": "HTML, CSS, JavaScript, localStorage, 可选 OpenAI-compatible API",
      "placeholder.screenshotUrls": "部署后的图片链接，用逗号分隔",
      "placeholder.logoUrl": "Project Wall 使用的公开 logo 链接",
      "placeholder.demoVideoUrl": "可选 Loom、YouTube 或托管演示视频",
      "placeholder.demoFileUrl": "可选公开演示文件或可下载产物",
      "placeholder.teamMembers": "姓名 - 角色 - 链接",
      "placeholder.notes": "粘贴 README、构建笔记、评审背景或用户调研。",
      "placeholder.llmKey": "仅在当前浏览器会话中使用",
      "readiness.eyebrow": "就绪度",
      "llm.endpoint": "接口地址",
      "llm.model": "模型",
      "llm.key": "API key",
      "tab.pack": "提交材料包",
      "tab.readme": "README",
      "tab.pitch": "演示稿",
      "tab.sprint": "冲刺计划",
      "tab.risks": "修复清单",
      "audit.eyebrow": "字段审计",
      "audit.title": "Project Wall 覆盖率",
      "tasks.eyebrow": "下一步",
      "tasks.title": "提交任务板",
      "repo.eyebrow": "仓库扫描",
      "repo.title": "GitHub 证据",
      "repo.scan": "扫描",
      "repo.empty": "添加 GitHub 仓库链接后即可扫描。",
      "repo.scanning": "正在扫描公开 GitHub 信号...",
      "repo.invalid": "请使用 HTTPS GitHub 仓库链接。",
      "repo.ready": "仓库证据可被检查。",
      "repo.weak": "仓库存在，但证据还偏薄。",
      "repo.failed": "仓库扫描失败",
      "repo.exists": "仓库存在",
      "repo.readme": "README 已存在",
      "repo.entry": "App 入口已存在",
      "repo.tests": "测试或 QA 路径已存在",
      "repo.deploy": "部署配置已存在",
      "repo.recent": "近期提交活动",
      "handoff.eyebrow": "交接",
      "handoff.title": "最终提交就绪度",
      "handoff.ready": "就绪",
      "handoff.draft": "草稿",
      "audit.required": "必填",
      "audit.recommended": "建议",
      "audit.ready": "就绪",
      "audit.missing": "缺失",
      "task.ready": "没有发现关键阻塞。提交前再做一次人工复核。",
      "task.fixFirst": "优先修复",
      "handoff.demo": "稳定 Demo",
      "handoff.repo": "GitHub 仓库",
      "handoff.assets": "截图和 Logo",
      "handoff.team": "真实团队",
      "handoff.copy": "可复制材料包",
      "mobile.story": "故事",
      "mobile.proof": "证据",
      "mobile.score": "评分",
      "mobile.llm": "模型",
      "mobile.pack": "材料",
      "mobile.submit": "提交",
      "node.intake.short": "项目祭坛",
      "node.evidence.short": "证据台阶",
      "node.score.short": "评分之门",
      "node.oracle.short": "模型神谕",
      "node.archive.short": "档案大厅",
      "node.final.short": "提交大门",
      "space.intake.label": "项目祭坛",
      "space.intake.title": "梳理项目故事",
      "space.intake.body": "从项目名称、赛道、一句话介绍、目标用户、问题和解决方案开始。",
      "space.intake.primary": "打开字段",
      "space.evidence.label": "证据台阶",
      "space.evidence.title": "补齐评审可检查的证据",
      "space.evidence.body": "添加 Demo 链接、GitHub 仓库、技术栈、截图、团队成员和草稿笔记。",
      "space.evidence.primary": "补充证据",
      "space.score.label": "评分之门",
      "space.score.title": "运行 UCWS 就绪度评审",
      "space.score.body": "按社区投票、AI 评估和专家评审信号检查项目。",
      "space.score.primary": "运行评分",
      "space.oracle.label": "模型神谕",
      "space.oracle.title": "用你自己的模型润色文案",
      "space.oracle.body": "打开预留的 OpenAI-compatible endpoint、model 和 API key 面板。",
      "space.oracle.primary": "打开神谕",
      "space.archive.label": "档案大厅",
      "space.archive.title": "查看生成的提交材料",
      "space.archive.body": "检查 Submission Pack、README、演示稿、冲刺计划和修复清单。",
      "space.archive.primary": "打开材料",
      "space.final.label": "提交大门",
      "space.final.title": "准备 GitHub 与 Project Wall 交接",
      "space.final.body": "用最终 GitHub 仓库、稳定 Demo、截图和真实团队成员完成提交。",
      "space.final.primary": "提交清单",
      "score.community": "社区投票",
      "score.ai": "AI 评估",
      "score.expert": "专家评审",
      "score.community.note": "清晰度、用户吸引力、可传播性和公开 Demo 就绪度。",
      "score.ai.note": "仓库质量信号、实现细节、结构和真实性。",
      "score.expert.note": "问题深度、产品价值、技术执行和全球扩展性。",
      "fix.demo": "添加公开 Demo URL，评委和投票者需要能立刻访问。",
      "fix.repo": "添加 GitHub 仓库 URL，并确保 README 与运行路径清楚。",
      "fix.screenshot": "部署后至少添加一张项目截图 URL。",
      "fix.logo": "添加公开 Logo URL，让 Project Wall 卡片更可信。",
      "fix.video": "如果时间允许，添加简短演示视频链接，帮助投票者快速理解流程。",
      "fix.file": "只有在能增加评审证据时，才添加可选演示文件链接。",
      "fix.tagline": "加强一句话介绍，让价值在一句话内清楚。",
      "fix.problem": "写出目标用户的具体痛点，而不只是技术描述。",
      "fix.solution": "说明产品做什么、用户会得到什么输出。",
      "fix.stack": "列出至少三个具体技术栈项目。",
      "fix.notes": "粘贴 README 或构建笔记，让生成材料有足够证据。",
      "fix.global": "说明产品如何超越单一本地场景使用。",
      "fix.demoPath": "添加评委能在两分钟内跟完的简短 Demo 路径。",
      "fix.ready": "已可进入提交检查。",
      "missing.llm": "缺少大模型设置：需要 endpoint、model 和 API key。",
      "failed.llm": "大模型请求失败",
      "sample.tagline": "把粗糙的黑客松想法变成可评分、可提交的 Project Wall 材料包。",
      "sample.audience": "黑客松团队、独立开发者、社区评审者和 Demo Day 组织者",
      "sample.problem": "开发者常常已经做出真实作品，却在最后一天卡在如何把产品笔记变成评委、AI 和投票者都能快速理解的提交材料。",
      "sample.solution": "LaunchLens 会围绕 UCWS 提交字段运行浏览器端评审助手，按社区投票、AI 评估和专家评审打分，并生成 Markdown、README、演示稿、冲刺计划和修复清单。",
      "sample.stack": "HTML, CSS, JavaScript, localStorage, 2.5D 生成背景, 可选 OpenAI-compatible API",
      "sample.team": "Alex - 构建者 - Project Wall profile",
      "sample.notes": "这个产品是静态 Web App，任何团队都能立刻使用。它对齐 UCWS 必填字段：项目名、tagline、描述、Demo URL、Repo URL、赛道、技术栈、截图、团队成员、项目 logo、演示视频和演示文件。它也映射了比赛评分模型：社区清晰度、AI 可评估的仓库质量，以及专家评审关注的产品价值和全球扩展性。第一屏是 Temple Mode：一个 2.5D 空间化提交流程，包含项目故事、证据、评分、模型神谕、材料档案和最终交接六个节点。Classic Mode 仍保留，用于快速填表。输出可以复制或下载用于提交。",
    },
  };

  const els = {
    form: document.querySelector("#projectForm"),
    saveState: document.querySelector("#saveState"),
    overallScore: document.querySelector("#overallScore"),
    scoreFill: document.querySelector("#scoreFill"),
    scoreGrid: document.querySelector("#scoreGrid"),
    auditCount: document.querySelector("#auditCount"),
    auditGrid: document.querySelector("#auditGrid"),
    taskCount: document.querySelector("#taskCount"),
    taskList: document.querySelector("#taskList"),
    handoffState: document.querySelector("#handoffState"),
    handoffGrid: document.querySelector("#handoffGrid"),
    output: document.querySelector("#output"),
    reviewBtn: document.querySelector("#reviewBtn"),
    generateBtn: document.querySelector("#generateBtn"),
    sampleBtn: document.querySelector("#sampleBtn"),
    resetBtn: document.querySelector("#resetBtn"),
    copyBtn: document.querySelector("#copyBtn"),
    downloadBtn: document.querySelector("#downloadBtn"),
    langEnBtn: document.querySelector("#langEnBtn"),
    langZhBtn: document.querySelector("#langZhBtn"),
    templeModeBtn: document.querySelector("#templeModeBtn"),
    hubModeBtn: document.querySelector("#hubModeBtn"),
    classicModeBtn: document.querySelector("#classicModeBtn"),
    templeView: document.querySelector("#templeView"),
    hubView: document.querySelector("#hubView"),
    hubCanvas: document.querySelector("#hubCanvas"),
    hubIdeaInput: document.querySelector("#hubIdeaInput"),
    hubBuildBtn: document.querySelector("#hubBuildBtn"),
    hubGuideBtn: document.querySelector("#hubGuideBtn"),
    hubApiBtn: document.querySelector("#hubApiBtn"),
    hubNodeTitle: document.querySelector("#hubNodeTitle"),
    hubNodeMeta: document.querySelector("#hubNodeMeta"),
    hubNodeBody: document.querySelector("#hubNodeBody"),
    hubStats: document.querySelector("#hubStats"),
    platformState: document.querySelector("#platformState"),
    processSteps: document.querySelector("#processSteps"),
    agentSelect: document.querySelector("#agentSelect"),
    runPlatformAgentBtn: document.querySelector("#runPlatformAgentBtn"),
    agentOutput: document.querySelector("#agentOutput"),
    tutorialSteps: document.querySelector("#tutorialSteps"),
    ideaTitle: document.querySelector("#ideaTitle"),
    ideaSummary: document.querySelector("#ideaSummary"),
    ideaTags: document.querySelector("#ideaTags"),
    ideaParent: document.querySelector("#ideaParent"),
    addIdeaBtn: document.querySelector("#addIdeaBtn"),
    ideaList: document.querySelector("#ideaList"),
    toolGrid: document.querySelector("#toolGrid"),
    supabaseUrl: document.querySelector("#supabaseUrl"),
    supabaseAnonKey: document.querySelector("#supabaseAnonKey"),
    supabaseTable: document.querySelector("#supabaseTable"),
    supabaseWorkspaceKey: document.querySelector("#supabaseWorkspaceKey"),
    saveSupabaseBtn: document.querySelector("#saveSupabaseBtn"),
    loadSupabaseBtn: document.querySelector("#loadSupabaseBtn"),
    copyApiBtn: document.querySelector("#copyApiBtn"),
    syncStatus: document.querySelector("#syncStatus"),
    templeProjectName: document.querySelector("#templeProjectName"),
    templeScore: document.querySelector("#templeScore"),
    templeSpaceLabel: document.querySelector("#templeSpaceLabel"),
    templeSpaceTitle: document.querySelector("#templeSpaceTitle"),
    templeSpaceBody: document.querySelector("#templeSpaceBody"),
    templeCommunity: document.querySelector("#templeCommunity"),
    templeAi: document.querySelector("#templeAi"),
    templeExpert: document.querySelector("#templeExpert"),
    templePrimaryAction: document.querySelector("#templePrimaryAction"),
    templeReviewAction: document.querySelector("#templeReviewAction"),
    templeCopyAction: document.querySelector("#templeCopyAction"),
    llmBtn: document.querySelector("#llmBtn"),
    llmPanel: document.querySelector("#llmPanel"),
    enhanceBtn: document.querySelector("#enhanceBtn"),
    llmEndpoint: document.querySelector("#llmEndpoint"),
    llmModel: document.querySelector("#llmModel"),
    llmKey: document.querySelector("#llmKey"),
    scanRepoBtn: document.querySelector("#scanRepoBtn"),
    repoSignal: document.querySelector("#repoSignal"),
    repoList: document.querySelector("#repoList"),
    scoreCardTemplate: document.querySelector("#scoreCardTemplate"),
  };

  const params = new URLSearchParams(window.location.search);
  const initialLanguage =
    params.get("lang") === "zh" || params.get("locale") === "zh-CN"
      ? "zh"
      : localStorage.getItem(LANGUAGE_KEY) === "zh"
        ? "zh"
        : "en";
  let language = initialLanguage;
  let activeTab = "pack";
  let activeTempleSpace = "intake";
  let currentAnalysis = null;
  let generated = null;
  let repoScan = null;
  let scannedRepoUrl = "";
  let particleCooldown = 0;
  let platformState = {
    ideas: [],
    agentRuns: [],
    tutorialDone: {},
    selectedAgent: "strategy",
    selectedNodeId: "project",
    hubFilters: {
      idea: true,
      agent: true,
      evidence: true,
      tool: true,
      process: true,
    },
  };
  let supabaseConfig = {
    url: "",
    anonKey: "",
    table: "launchlens_workspace",
    workspaceKey: "ucws-team-workspace",
  };
  let hubAnimationFrame = null;
  let hubGraph = { nodes: [], edges: [] };
  let hubPointer = { x: 0, y: 0, active: false };
  let hubStarSeed = Array.from({ length: 110 }, (_, index) => ({
    x: (index * 73) % 997,
    y: (index * 149) % 991,
    size: 0.45 + ((index * 17) % 8) / 10,
    pulse: (index * 29) % 100,
  }));

  const auditDefinitions = [
    { key: "name", labelKey: "field.name", required: true },
    { key: "track", labelKey: "field.track", required: true },
    { key: "tagline", labelKey: "field.tagline", required: true },
    { key: "problem", labelKey: "field.problem", required: true },
    { key: "solution", labelKey: "field.solution", required: true },
    { key: "demo", labelKey: "field.demoUrl", required: true },
    { key: "repo", labelKey: "field.repoUrl", required: true },
    { key: "stack", labelKey: "field.techStack", required: true },
    { key: "screenshot", labelKey: "field.screenshotUrls", required: true },
    { key: "logo", labelKey: "field.logoUrl", required: true },
    { key: "team", labelKey: "field.teamMembers", required: true },
    { key: "notes", labelKey: "field.notes", required: false },
    { key: "video", labelKey: "field.demoVideoUrl", required: false },
    { key: "file", labelKey: "field.demoFileUrl", required: false },
  ];

  const handoffDefinitions = [
    { key: "demo", labelKey: "handoff.demo" },
    { key: "repo", labelKey: "handoff.repo" },
    { key: "assets", labelKey: "handoff.assets" },
    { key: "team", labelKey: "handoff.team" },
    { key: "copy", labelKey: "handoff.copy" },
  ];

  const templeSpaces = {
    intake: {
      label: "Project Altar",
      title: "Shape the project story",
      body:
        "Start with the project name, track, tagline, target users, problem, and solution.",
      primary: "Open Fields",
      focus: "name",
    },
    evidence: {
      label: "Evidence Steps",
      title: "Attach proof reviewers can inspect",
      body:
        "Add demo URL, GitHub repo, tech stack, screenshots, team members, and rough notes.",
      primary: "Add Evidence",
      focus: "demoUrl",
    },
    score: {
      label: "Score Gate",
      title: "Run the UCWS readiness review",
      body:
        "Score the project against community vote, AI evaluation, and expert judging signals.",
      primary: "Run Score",
      action: "score",
    },
    oracle: {
      label: "Oracle LLM",
      title: "Use your own model to refine copy",
      body:
        "Open the reserved OpenAI-compatible endpoint, model, and API key panel for optional enhancement.",
      primary: "Open Oracle",
      action: "oracle",
    },
    archive: {
      label: "Archive Hall",
      title: "Review the generated submission pack",
      body:
        "Inspect the Markdown pack, README draft, pitch, sprint plan, and fix list before export.",
      primary: "Open Pack",
      action: "archive",
    },
    final: {
      label: "Final Door",
      title: "Prepare GitHub and Project Wall handoff",
      body:
        "Use the copied pack with the final GitHub repo URL, stable demo URL, screenshots, and real team names.",
      primary: "Submit Checklist",
      action: "final",
    },
  };

  function $(id) {
    return document.querySelector("#" + id);
  }

  function t(key) {
    return strings[language][key] || strings.en[key] || key;
  }

  function applyTranslations() {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.placeholder = t(node.dataset.i18nPlaceholder);
    });

    els.langEnBtn.classList.toggle("active", language === "en");
    els.langZhBtn.classList.toggle("active", language === "zh");
    els.langEnBtn.classList.toggle("ghost", language !== "en");
    els.langZhBtn.classList.toggle("ghost", language !== "zh");
    els.langEnBtn.setAttribute("aria-pressed", String(language === "en"));
    els.langZhBtn.setAttribute("aria-pressed", String(language === "zh"));

    if (!els.copyBtn.textContent.includes(t("button.copied"))) {
      els.copyBtn.textContent = t("button.copy");
    }
    if (!els.enhanceBtn.disabled) {
      els.enhanceBtn.textContent = t("button.enhance");
    }
    if (!els.scanRepoBtn.disabled) {
      els.scanRepoBtn.textContent = t("repo.scan");
    }
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage === "zh" ? "zh" : "en";
    localStorage.setItem(LANGUAGE_KEY, language);
    applyTranslations();
    generated = null;
    runAgent();
    renderTemplePanel();
    renderRepoScan();
    renderPlatform();
    updateHubGraph();
  }

  function getProject() {
    return fields.reduce((project, field) => {
      project[field] = ($(field)?.value || "").trim();
      return project;
    }, {});
  }

  function setProject(project) {
    fields.forEach((field) => {
      if ($(field)) {
        $(field).value = project[field] || "";
      }
    });
  }

  function setViewMode(mode) {
    const temple = mode === "temple";
    const hub = mode === "hub";
    const classic = !temple && !hub;
    document.body.classList.add("view-switching");
    document.body.classList.toggle("temple-mode", temple);
    document.body.classList.toggle("hub-mode", hub);
    document.body.classList.toggle("classic-mode", classic);
    els.templeModeBtn.classList.toggle("active", temple);
    els.hubModeBtn.classList.toggle("active", hub);
    els.classicModeBtn.classList.toggle("active", classic);
    els.templeModeBtn.classList.toggle("ghost", !temple);
    els.hubModeBtn.classList.toggle("ghost", !hub);
    els.classicModeBtn.classList.toggle("ghost", !classic);
    els.templeModeBtn.setAttribute("aria-pressed", String(temple));
    els.hubModeBtn.setAttribute("aria-pressed", String(hub));
    els.classicModeBtn.setAttribute("aria-pressed", String(classic));
    if (temple || hub) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    updateTempleStatus();
    updateHubGraph();
    window.setTimeout(() => document.body.classList.remove("view-switching"), 260);
  }

  function focusClassicField(field) {
    setViewMode("classic");
    requestAnimationFrame(() => {
      const target = $(field);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.focus();
    });
  }

  function selectTempleSpace(space) {
    if (!templeSpaces[space]) return;
    activeTempleSpace = space;
    document.querySelectorAll("[data-space]").forEach((button) => {
      button.classList.toggle("active", button.dataset.space === space);
      if (button.tagName === "BUTTON") {
        button.setAttribute("aria-pressed", String(button.dataset.space === space));
      }
    });
    renderTemplePanel();
  }

  function renderTemplePanel() {
    els.templeSpaceLabel.textContent = t(`space.${activeTempleSpace}.label`);
    els.templeSpaceTitle.textContent = t(`space.${activeTempleSpace}.title`);
    els.templeSpaceBody.textContent = t(`space.${activeTempleSpace}.body`);
    els.templePrimaryAction.textContent = t(`space.${activeTempleSpace}.primary`);
    updateTempleStatus();
  }

  function updateTempleStatus() {
    const project = getProject();
    const analysis = currentAnalysis || analyze(project);
    const scoreByKey = Object.fromEntries(
      analysis.dimensions.map((item) => [item.key, item.score]),
    );
    els.templeProjectName.textContent = project.name || "LaunchLens";
    els.templeScore.textContent = String(analysis.overall);
    els.templeCommunity.textContent = `${t("score.community")} ${scoreByKey.community || 0}`;
    els.templeAi.textContent = `${t("score.ai")} ${scoreByKey.ai || 0}`;
    els.templeExpert.textContent = `${t("score.expert")} ${scoreByKey.expert || 0}`;
  }

  function runTemplePrimaryAction() {
    const space = templeSpaces[activeTempleSpace];
    if (space.focus) {
      focusClassicField(space.focus);
      return;
    }

    if (space.action === "score") {
      runAgent();
      return;
    }

    if (space.action === "oracle") {
      setViewMode("classic");
      els.llmPanel.classList.remove("hidden");
      requestAnimationFrame(() => {
        els.llmEndpoint.scrollIntoView({ behavior: "smooth", block: "center" });
        els.llmEndpoint.focus();
      });
      return;
    }

    if (space.action === "archive") {
      runAgent();
      setActiveTab("pack");
      setViewMode("classic");
      requestAnimationFrame(() => els.output.focus());
      return;
    }

    if (space.action === "final") {
      runAgent();
      setActiveTab("pack");
      setViewMode("classic");
      requestAnimationFrame(() => els.copyBtn.focus());
    }
  }

  function saveProject() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getProject()));
    els.saveState.textContent = t("status.saved");
  }

  function loadProject() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    try {
      setProject(JSON.parse(raw));
      return true;
    } catch {
      return false;
    }
  }

  function loadPlatform() {
    const raw = localStorage.getItem(PLATFORM_KEY);
    if (raw) {
      try {
        platformState = {
          ...platformState,
          ...JSON.parse(raw),
          hubFilters: {
            ...platformState.hubFilters,
            ...(JSON.parse(raw).hubFilters || {}),
          },
        };
      } catch {
        platformState = { ...platformState };
      }
    }

    const syncRaw = localStorage.getItem(SUPABASE_KEY);
    if (syncRaw) {
      try {
        supabaseConfig = { ...supabaseConfig, ...JSON.parse(syncRaw) };
      } catch {
        supabaseConfig = { ...supabaseConfig };
      }
    }

    if (!platformState.ideas.length) {
      const now = new Date().toISOString();
      platformState.ideas = [
        Core.createIdea({
          id: "idea-platform-hub",
          title: language === "zh" ? "黑客松协作 Hub" : "Hackathon collaboration hub",
          summary:
            language === "zh"
              ? "把提交材料、Agent 建议、工具选择和项目思考统一到一个可视化空间。"
              : "Unify submission assets, agent recommendations, tool choices, and project thinking in one visual workspace.",
          tags: "hub, agent, archive",
        }, now),
        Core.createIdea({
          id: "idea-codex-api",
          title: language === "zh" ? "Codex API 快照" : "Codex API snapshot",
          summary:
            language === "zh"
              ? "释放结构化 JSON，让 Codex 或其他开发工具读取项目上下文。"
              : "Expose structured JSON so Codex and other tools can read project context.",
          tags: "api, codex, workflow",
          parentId: "idea-platform-hub",
        }, now),
      ].filter(Boolean);
      savePlatform();
    }
  }

  function savePlatform() {
    localStorage.setItem(PLATFORM_KEY, JSON.stringify(platformState));
  }

  function saveSupabaseConfig() {
    supabaseConfig = {
      url: els.supabaseUrl.value.trim(),
      anonKey: els.supabaseAnonKey.value.trim(),
      table: els.supabaseTable.value.trim() || "launchlens_workspace",
      workspaceKey: els.supabaseWorkspaceKey.value.trim() || "ucws-team-workspace",
    };
    localStorage.setItem(SUPABASE_KEY, JSON.stringify(supabaseConfig));
  }

  function applySupabaseConfig() {
    els.supabaseUrl.value = supabaseConfig.url || "";
    els.supabaseAnonKey.value = supabaseConfig.anonKey || "";
    els.supabaseTable.value = supabaseConfig.table || "launchlens_workspace";
    els.supabaseWorkspaceKey.value = supabaseConfig.workspaceKey || "ucws-team-workspace";
  }

  function inferIdeaTags(text) {
    const source = text.toLowerCase();
    const tagRules = [
      ["agent", ["agent", "助手", "代理", "智能体"]],
      ["api", ["api", "接口", "codex", "json"]],
      ["backend", ["supabase", "postgres", "后端", "sync", "同步"]],
      ["demo", ["demo", "演示", "tour", "教程"]],
      ["visual", ["2.5d", "visual", "星图", "可视化", "hub", "空间"]],
      ["repo", ["github", "repo", "仓库", "readme"]],
      ["judging", ["judge", "评分", "评审", "project wall", "提交"]],
      ["deploy", ["vercel", "netlify", "pages", "部署"]],
      ["product", ["商业", "product", "用户", "价值", "平台"]],
    ];
    const tags = tagRules
      .filter(([, terms]) => terms.some((term) => source.includes(term)))
      .map(([tag]) => tag);
    return [...new Set(tags.length ? tags : ["seed"])];
  }

  function deriveIdeasFromText(text) {
    const lines = String(text || "")
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);
    const createdAt = new Date().toISOString();
    return lines
      .map((line, index) => {
        const explicitTags = [...line.matchAll(/#([\w\u4e00-\u9fa5-]+)/g)].map((match) => match[1]);
        const cleaned = line.replace(/#([\w\u4e00-\u9fa5-]+)/g, "").trim();
        const title = cleaned.length > 64 ? `${cleaned.slice(0, 61)}...` : cleaned;
        const tags = [...new Set([...inferIdeaTags(line), ...explicitTags])];
        const parentId =
          index > 0 && tags.some((tag) => platformState.ideas[platformState.ideas.length - 1]?.tags?.includes(tag))
            ? platformState.ideas[platformState.ideas.length - 1].id
            : "";
        return Core.createIdea({
          title,
          summary: cleaned,
          tags: tags.join(", "),
          parentId,
        }, createdAt);
      })
      .filter(Boolean);
  }

  function mergeRelatedIdeas(ideas) {
    const all = [...platformState.ideas, ...ideas];
    return all.map((idea, index) => {
      const shared = all
        .filter((other, otherIndex) => {
          if (otherIndex === index || other.id === idea.id) return false;
          return (idea.tags || []).some((tag) => (other.tags || []).includes(tag));
        })
        .slice(0, 3)
        .map((other) => other.id);
      return {
        ...idea,
        relatedIds: [...new Set([...(idea.relatedIds || []), ...shared])],
      };
    });
  }

  function buildCodexApiPayload() {
    const project = getProject();
    const analysis = currentAnalysis || analyze(project);
    const snapshot = Core.buildWorkspaceSnapshot({
      project,
      platform: platformState,
      analysis,
      generated,
      repoScan,
    });
    return {
      kind: "launchlens.codex.workspace",
      version: Core.schemaVersion,
      generatedAt: new Date().toISOString(),
      endpoints: {
        staticContract: "api/openapi.json",
        supabaseTable: supabaseConfig.table || "launchlens_workspace",
        workspaceKey: supabaseConfig.workspaceKey || "ucws-team-workspace",
      },
      suggestedCodexUse: [
        "Read project, analysis, ideas, agentRuns, and generated materials before modifying the app.",
        "Use idea graph edges to understand why a feature exists before refactoring.",
        "Write new implementation notes back as ideas or agentRuns.",
      ],
      snapshot,
    };
  }

  async function copyCodexApiJson() {
    const payload = JSON.stringify(buildCodexApiPayload(), null, 2);
    await navigator.clipboard.writeText(payload);
    els.syncStatus.textContent = t("api.copied");
    els.platformState.textContent = t("api.copied");
  }

  function countHits(text, terms) {
    const source = text.toLowerCase();
    return terms.reduce((count, term) => count + (source.includes(term) ? 1 : 0), 0);
  }

  function isHttpsUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === "https:";
    } catch {
      return false;
    }
  }

  function parseGithubRepoUrl(value) {
    try {
      const url = new URL(value);
      if (url.protocol !== "https:" || url.hostname !== "github.com") return null;
      const [owner, repo] = url.pathname.replace(/^\/|\/$/g, "").split("/");
      if (!owner || !repo) return null;
      return { owner, repo: repo.replace(/\.git$/i, "") };
    } catch {
      return null;
    }
  }

  function clampScore(score) {
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  function buildAudit(has) {
    return auditDefinitions.map((item) => ({
      ...item,
      ready: Boolean(has[item.key]),
    }));
  }

  function buildHandoff(has, overall) {
    return [
      { key: "demo", ready: has.demo },
      { key: "repo", ready: has.repo },
      { key: "assets", ready: has.screenshot && has.logo },
      { key: "team", ready: has.team },
      { key: "copy", ready: overall >= 75 },
    ];
  }

  function analyze(project) {
    const combined = [
      project.name,
      project.tagline,
      project.audience,
      project.problem,
      project.solution,
      project.techStack,
      project.notes,
    ]
      .join(" ")
      .toLowerCase();

    const has = {
      name: project.name.length >= 3,
      tagline: project.tagline.length >= 24,
      audience: project.audience.length >= 10,
      problem: project.problem.length >= 40,
      solution: project.solution.length >= 60,
      demo: isHttpsUrl(project.demoUrl),
      repo: Boolean(parseGithubRepoUrl(project.repoUrl)),
      stack: project.techStack.split(",").filter(Boolean).length >= 3,
      screenshot: listFromCsv(project.screenshotUrls).some(isHttpsUrl),
      logo: isHttpsUrl(project.logoUrl),
      video: !project.demoVideoUrl || isHttpsUrl(project.demoVideoUrl),
      file: !project.demoFileUrl || isHttpsUrl(project.demoFileUrl),
      team: project.teamMembers.length > 4,
      notes: project.notes.length >= 280,
    };

    const userSignals = countHits(combined, [
      "user",
      "customer",
      "community",
      "team",
      "builder",
      "workflow",
      "problem",
      "pain",
      "global",
      "share",
      "用户",
      "客户",
      "社区",
      "团队",
      "构建者",
      "流程",
      "问题",
      "痛点",
      "全球",
      "分享",
    ]);
    const engineeringSignals = countHits(combined, [
      "repo",
      "readme",
      "test",
      "api",
      "architecture",
      "localstorage",
      "javascript",
      "deploy",
      "export",
      "security",
      "仓库",
      "测试",
      "架构",
      "部署",
      "导出",
      "安全",
    ]);
    const businessSignals = countHits(combined, [
      "market",
      "revenue",
      "scale",
      "global",
      "partnership",
      "adoption",
      "demo",
      "impact",
      "growth",
      "commercial",
      "市场",
      "收入",
      "规模",
      "合作",
      "采用",
      "演示",
      "影响",
      "增长",
      "商业",
    ]);

    const community = clampScore(
      (has.name ? 10 : 0) +
        (has.tagline ? 18 : 0) +
        (has.problem ? 16 : 0) +
        (has.solution ? 16 : 0) +
        (has.demo ? 12 : 0) +
        (has.screenshot ? 8 : 0) +
        (has.logo ? 4 : 0) +
        Math.min(16, userSignals * 3),
    );

    const ai = clampScore(
      (has.repo ? 20 : 0) +
        (has.stack ? 16 : 0) +
        (has.notes ? 18 : 0) +
        (has.demo ? 10 : 0) +
        (has.solution ? 14 : 0) +
        (has.screenshot ? 5 : 0) +
        Math.min(17, engineeringSignals * 3),
    );

    const expert = clampScore(
      (has.audience ? 12 : 0) +
        (has.problem ? 16 : 0) +
        (has.solution ? 18 : 0) +
        (has.demo ? 12 : 0) +
        (has.repo ? 8 : 0) +
        (has.logo ? 4 : 0) +
        Math.min(20, businessSignals * 4) +
        (combined.includes("global") ? 8 : 0),
    );

    const overall = clampScore(
      (community * weights.community + ai * weights.ai + expert * weights.expert) / 100,
    );

    const fixes = [];
    if (!has.demo) fixes.push(t("fix.demo"));
    if (!has.repo) fixes.push(t("fix.repo"));
    if (!has.screenshot) fixes.push(t("fix.screenshot"));
    if (!has.logo) fixes.push(t("fix.logo"));
    if (!has.video) fixes.push(t("fix.video"));
    if (!has.file) fixes.push(t("fix.file"));
    if (!has.tagline) fixes.push(t("fix.tagline"));
    if (!has.problem) fixes.push(t("fix.problem"));
    if (!has.solution) fixes.push(t("fix.solution"));
    if (!has.stack) fixes.push(t("fix.stack"));
    if (!has.notes) fixes.push(t("fix.notes"));
    if (!combined.includes("global") && !combined.includes("全球")) fixes.push(t("fix.global"));
    if (!combined.includes("demo") && !combined.includes("演示")) fixes.push(t("fix.demoPath"));

    return {
      overall,
      dimensions: [
        {
          key: "community",
          label: t("score.community"),
          score: community,
          note: t("score.community.note"),
        },
        {
          key: "ai",
          label: t("score.ai"),
          score: ai,
          note: t("score.ai.note"),
        },
        {
          key: "expert",
          label: t("score.expert"),
          score: expert,
          note: t("score.expert.note"),
        },
      ],
      fixes,
      has,
      audit: buildAudit(has),
      handoff: buildHandoff(has, overall),
    };
  }

  function fallback(value, text) {
    return value && value.length ? value : text;
  }

  function listFromCsv(value) {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function exampleFor(key) {
    const examples = {
      en: {
        demo: "Example: GitHub Pages, Netlify, Vercel, or a stable hosted demo.",
        repo: "Example: https://github.com/team/project with README and setup path.",
        screenshot: "Example: public PNG/JPG URL showing the actual first screen.",
        logo: "Example: an SVG or PNG logo URL that renders on the Project Wall card.",
        tagline: "Example: One sentence naming the user, pain, and outcome.",
        problem: "Example: describe the deadline or collaboration pain a team actually feels.",
        solution: "Example: explain the workflow and output the user receives.",
        stack: "Example: HTML, CSS, JavaScript, GitHub Pages, optional OpenAI API.",
        notes: "Example: paste build notes, demo script, limitations, and judging context.",
      },
      zh: {
        demo: "示例：GitHub Pages、Netlify、Vercel 或稳定托管 Demo。",
        repo: "示例：https://github.com/team/project，并包含 README 和运行路径。",
        screenshot: "示例：展示真实第一屏的公开 PNG/JPG 链接。",
        logo: "示例：Project Wall 卡片可渲染的 SVG 或 PNG logo 链接。",
        tagline: "示例：一句话说清用户、痛点和结果。",
        problem: "示例：写出团队真实感受到的截止时间或协作痛点。",
        solution: "示例：说明使用流程，以及用户最终得到什么输出。",
        stack: "示例：HTML, CSS, JavaScript, GitHub Pages, 可选 OpenAI API。",
        notes: "示例：粘贴构建笔记、演示脚本、限制和评审背景。",
      },
    };
    return examples[language][key] || examples[language].notes;
  }

  function buildTasks(analysis) {
    const missingRequired = analysis.audit.filter((item) => item.required && !item.ready);
    const missingRecommended = analysis.audit.filter((item) => !item.required && !item.ready);
    const candidates = [...missingRequired, ...missingRecommended].slice(0, 5);
    if (!candidates.length && analysis.overall >= 75) {
      return [{ key: "ready", text: t("task.ready"), example: "" }];
    }
    return candidates.map((item, index) => ({
      key: item.key,
      text: `${index + 1}. ${t("task.fixFirst")}: ${t(item.labelKey)}`,
      example: exampleFor(item.key),
    }));
  }

  function renderAudit(analysis) {
    const required = analysis.audit.filter((item) => item.required);
    const requiredReady = required.filter((item) => item.ready).length;
    els.auditCount.textContent = `${requiredReady}/${required.length}`;
    els.auditGrid.innerHTML = "";

    analysis.audit.forEach((item) => {
      const node = document.createElement("div");
      node.className = `audit-item ${item.ready ? "ready" : "missing"}`;
      node.innerHTML = `
        <span>${item.ready ? "✓" : "!"}</span>
        <strong>${t(item.labelKey)}</strong>
        <small>${item.required ? t("audit.required") : t("audit.recommended")} · ${item.ready ? t("audit.ready") : t("audit.missing")}</small>
      `;
      els.auditGrid.appendChild(node);
    });
  }

  function renderTasks(analysis) {
    const tasks = buildTasks(analysis);
    els.taskCount.textContent = String(tasks[0]?.key === "ready" ? 0 : tasks.length);
    els.taskList.innerHTML = "";
    tasks.forEach((task) => {
      const node = document.createElement("li");
      node.innerHTML = `<strong>${task.text}</strong>${task.example ? `<span>${task.example}</span>` : ""}`;
      els.taskList.appendChild(node);
    });
  }

  function renderHandoff(analysis) {
    const handoff = analysis.handoff;
    const ready = handoff.every((item) => item.ready);
    els.handoffState.textContent = ready ? t("handoff.ready") : t("handoff.draft");
    els.handoffState.classList.toggle("ready", ready);
    els.handoffGrid.innerHTML = "";

    handoffDefinitions.forEach((definition) => {
      const state = handoff.find((item) => item.key === definition.key);
      const node = document.createElement("div");
      node.className = `handoff-item ${state?.ready ? "ready" : "missing"}`;
      node.innerHTML = `<span>${state?.ready ? "✓" : "•"}</span><strong>${t(definition.labelKey)}</strong>`;
      els.handoffGrid.appendChild(node);
    });
  }

  function renderWorkflowState(analysis) {
    const spaceReady = {
      intake:
        analysis.has.name &&
        analysis.has.tagline &&
        analysis.has.audience &&
        analysis.has.problem &&
        analysis.has.solution,
      evidence:
        analysis.has.demo &&
        analysis.has.repo &&
        analysis.has.screenshot &&
        analysis.has.logo &&
        analysis.has.team,
      score: analysis.overall >= 70,
      oracle: true,
      archive: Boolean(generated),
      final: analysis.handoff.every((item) => item.ready),
    };

    document.querySelectorAll("[data-space]").forEach((button) => {
      const ready = Boolean(spaceReady[button.dataset.space]);
      button.classList.toggle("ready", ready);
      button.classList.toggle("missing", !ready);
    });
  }

  function renderRepoScan() {
    if (!repoScan) {
      els.repoSignal.textContent = t("repo.empty");
      els.repoSignal.className = "repo-signal";
      els.repoList.innerHTML = "";
      return;
    }

    els.repoSignal.textContent = repoScan.error
      ? `${t(repoScan.messageKey)}: ${repoScan.error}`
      : t(repoScan.messageKey);
    els.repoSignal.className = `repo-signal ${repoScan.status}`;
    els.repoList.innerHTML = "";

    repoScan.checks.forEach((check) => {
      const node = document.createElement("li");
      node.className = check.ready ? "ready" : "missing";
      node.innerHTML = `<span>${check.ready ? "✓" : "!"}</span><strong>${check.labelKey ? t(check.labelKey) : check.label}</strong><small>${check.detail}</small>`;
      els.repoList.appendChild(node);
    });
  }

  async function scanRepository() {
    const project = getProject();
    scannedRepoUrl = project.repoUrl;
    const repo = parseGithubRepoUrl(project.repoUrl);
    if (!repo) {
      repoScan = {
        status: "missing",
        messageKey: "repo.invalid",
        checks: [],
      };
      renderRepoScan();
      return;
    }

    els.scanRepoBtn.disabled = true;
    els.scanRepoBtn.textContent = t("repo.scanning");
    repoScan = {
      status: "pending",
      messageKey: "repo.scanning",
      checks: [],
    };
    renderRepoScan();

    try {
      const base = `https://api.github.com/repos/${repo.owner}/${repo.repo}`;
      const [repoResponse, readmeResponse, contentsResponse, commitsResponse] =
        await Promise.all([
          fetch(base),
          fetch(`${base}/readme`),
          fetch(`${base}/contents`),
          fetch(`${base}/commits?per_page=1`),
        ]);

      if (!repoResponse.ok) {
        throw new Error(`GitHub returned ${repoResponse.status}`);
      }

      const repoData = await repoResponse.json();
      const contents = contentsResponse.ok ? await contentsResponse.json() : [];
      const commits = commitsResponse.ok ? await commitsResponse.json() : [];
      const names = Array.isArray(contents)
        ? contents.map((item) => String(item.name || "").toLowerCase())
        : [];
      const latestCommitDate = commits[0]?.commit?.committer?.date || repoData.updated_at;
      const recent =
        latestCommitDate &&
        Date.now() - new Date(latestCommitDate).getTime() < 1000 * 60 * 60 * 24 * 45;

      const checks = [
        {
          labelKey: "repo.exists",
          ready: true,
          detail: `${repo.owner}/${repo.repo}`,
        },
        {
          labelKey: "repo.readme",
          ready: readmeResponse.ok,
          detail: readmeResponse.ok ? "README.md" : "README missing",
        },
        {
          labelKey: "repo.entry",
          ready: names.some((name) => ["index.html", "package.json", "src"].includes(name)),
          detail: names.filter((name) => ["index.html", "package.json", "src"].includes(name)).join(", ") || "No obvious app entry",
        },
        {
          labelKey: "repo.tests",
          ready: names.some((name) => ["tests", "test", "playwright.config.js", "vitest.config.js"].includes(name)),
          detail: names.filter((name) => ["tests", "test", "playwright.config.js", "vitest.config.js"].includes(name)).join(", ") || "No obvious tests",
        },
        {
          labelKey: "repo.deploy",
          ready: names.some((name) => ["netlify.toml", "vercel.json", ".github"].includes(name)),
          detail: names.filter((name) => ["netlify.toml", "vercel.json", ".github"].includes(name)).join(", ") || "No deploy config",
        },
        {
          labelKey: "repo.recent",
          ready: Boolean(recent),
          detail: latestCommitDate ? new Date(latestCommitDate).toLocaleDateString() : "No commit date",
        },
      ];

      const readyCount = checks.filter((check) => check.ready).length;
      repoScan = {
        status: readyCount >= 4 ? "ready" : "weak",
        messageKey: readyCount >= 4 ? "repo.ready" : "repo.weak",
        checks,
        scannedAt: new Date().toISOString(),
      };
    } catch (error) {
      repoScan = {
        status: "missing",
        messageKey: "repo.failed",
        error: error.message,
        checks: [],
      };
    } finally {
      els.scanRepoBtn.disabled = false;
      els.scanRepoBtn.textContent = t("repo.scan");
      renderRepoScan();
    }
  }

  function emitTempleParticle(event) {
    if (!document.body.classList.contains("temple-mode")) return;
    const target = event.target.closest(".temple-node, .temple-card, .temple-score");
    if (!target) return;
    const now = performance.now();
    if (now - particleCooldown < 65) return;
    particleCooldown = now;

    const particle = document.createElement("span");
    particle.className = "temple-particle";
    const rect = els.templeView.getBoundingClientRect();
    particle.style.left = `${event.clientX - rect.left}px`;
    particle.style.top = `${event.clientY - rect.top}px`;
    particle.style.setProperty("--drift-x", `${Math.random() * 34 - 17}px`);
    particle.style.setProperty("--drift-y", `${-18 - Math.random() * 24}px`);
    els.templeView.appendChild(particle);
    window.setTimeout(() => particle.remove(), 720);
  }

  function renderProcessSteps() {
    els.processSteps.innerHTML = "";
    Core.processSteps(language).forEach((step, index) => {
      const node = document.createElement("li");
      node.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><strong>${step.title}</strong><p>${step.body}</p><small>${step.output}</small>`;
      els.processSteps.appendChild(node);
    });
  }

  function renderAgentStudio() {
    const selected = platformState.selectedAgent || "strategy";
    els.agentSelect.innerHTML = "";
    Core.agentDefinitions(language).forEach((agent) => {
      const option = document.createElement("option");
      option.value = agent.id;
      option.textContent = `${agent.label} - ${agent.role}`;
      option.selected = agent.id === selected;
      els.agentSelect.appendChild(option);
    });

    const latest = platformState.agentRuns[0];
    if (!latest) {
      els.agentOutput.textContent = t("agent.empty");
      return;
    }
    els.agentOutput.innerHTML = `
      <strong>${latest.title}</strong>
      <p>${latest.summary}</p>
      <ul>${latest.checklist.map((item) => `<li>${item}</li>`).join("")}</ul>
      ${latest.linkedIdeas?.length ? `<small>${latest.linkedIdeas.join(" / ")}</small>` : ""}
    `;
  }

  function renderTutorial() {
    els.tutorialSteps.innerHTML = "";
    Core.tutorialSteps(language).forEach((step, index) => {
      const done = Boolean(platformState.tutorialDone[step.id]);
      const node = document.createElement("li");
      node.className = done ? "done" : "";
      node.innerHTML = `<button type="button" data-tutorial-id="${step.id}">${done ? "✓" : index + 1}</button><strong>${step.title}</strong><p>${step.action}</p>`;
      els.tutorialSteps.appendChild(node);
    });
  }

  function renderIdeas() {
    els.ideaParent.innerHTML = "";
    const none = document.createElement("option");
    none.value = "";
    none.textContent = t("ideas.parentNone");
    els.ideaParent.appendChild(none);
    platformState.ideas.forEach((idea) => {
      const option = document.createElement("option");
      option.value = idea.id;
      option.textContent = idea.title;
      els.ideaParent.appendChild(option);
    });

    els.ideaList.innerHTML = "";
    if (!platformState.ideas.length) {
      els.ideaList.textContent = t("ideas.empty");
      return;
    }
    const graph = Core.buildIdeaGraph(platformState.ideas);
    platformState.ideas.slice().reverse().forEach((idea) => {
      const degree = graph.edges.filter((edge) => edge.from === idea.id || edge.to === idea.id).length;
      const node = document.createElement("button");
      node.type = "button";
      node.className = platformState.selectedNodeId === idea.id ? "active" : "";
      node.dataset.ideaId = idea.id;
      node.innerHTML = `<strong>${idea.title}</strong><span>${idea.tags?.join(" / ") || t("ideas.seed")} · ${degree} ${t("ideas.linked")}</span>`;
      els.ideaList.appendChild(node);
    });
  }

  function renderTools() {
    els.toolGrid.innerHTML = "";
    Core.toolRecommendations(language).forEach((tool) => {
      const node = document.createElement("div");
      node.className = "tool-item";
      node.innerHTML = `<span>${tool.category}</span><strong>${tool.name}</strong><p>${tool.fit}</p>`;
      els.toolGrid.appendChild(node);
    });
  }

  function renderSupabasePanel() {
    applySupabaseConfig();
    if (!els.syncStatus.textContent || els.syncStatus.textContent === t("sync.loaded") || els.syncStatus.textContent === t("sync.saved")) {
      return;
    }
    els.syncStatus.textContent = t("sync.localOnly");
  }

  function renderPlatform() {
    renderProcessSteps();
    renderAgentStudio();
    renderTutorial();
    renderIdeas();
    renderTools();
    renderSupabasePanel();
  }

  function runPlatformAgent() {
    const project = getProject();
    const analysis = currentAnalysis || analyze(project);
    const agentId = els.agentSelect.value || "strategy";
    const result = Core.buildAgentResult({
      agentId,
      language,
      project,
      analysis,
      ideas: platformState.ideas,
    });
    platformState.selectedAgent = agentId;
    platformState.agentRuns = [result, ...platformState.agentRuns].slice(0, 20);
    savePlatform();
    renderPlatform();
    updateHubGraph();
  }

  function addIdeaFromEditor() {
    const idea = Core.createIdea({
      title: els.ideaTitle.value,
      summary: els.ideaSummary.value,
      tags: els.ideaTags.value,
      parentId: els.ideaParent.value,
    });
    if (!idea) return;
    platformState.ideas = mergeRelatedIdeas([idea]);
    platformState.selectedNodeId = idea.id;
    els.ideaTitle.value = "";
    els.ideaSummary.value = "";
    els.ideaTags.value = "";
    savePlatform();
    renderPlatform();
    updateHubGraph();
  }

  function addIdeasFromHubInput() {
    const ideas = deriveIdeasFromText(els.hubIdeaInput.value);
    if (!ideas.length) return;
    platformState.ideas = mergeRelatedIdeas(ideas);
    platformState.selectedNodeId = ideas[0].id;
    els.hubIdeaInput.value = "";
    savePlatform();
    renderPlatform();
    updateHubGraph();
  }

  function buildHubGraph() {
    const project = getProject();
    const analysis = currentAnalysis || analyze(project);
    const nodes = [
      {
        id: "project",
        type: "project",
        title: project.name || "LaunchLens",
        body: project.tagline || t("hub.body"),
        radius: 0,
        angle: 0,
        size: 18,
      },
    ];
    const edges = [];

    Core.processSteps(language).forEach((step, index) => {
      const id = `process-${step.id}`;
      nodes.push({
        id,
        type: "process",
        title: step.title,
        body: step.body,
        radius: 0.24,
        angle: index * 1.05,
        size: 9,
      });
      edges.push({ from: "project", to: id, type: "process" });
    });

    platformState.ideas.forEach((idea, index) => {
      nodes.push({
        id: idea.id,
        type: "idea",
        title: idea.title,
        body: idea.summary || idea.tags?.join(", ") || "",
        radius: 0.42 + (index % 4) * 0.075,
        angle: index * 0.88 + 0.45,
        size: 8 + Math.min(5, (idea.tags || []).length),
      });
      edges.push({ from: idea.parentId || "project", to: idea.id, type: "idea" });
      (idea.relatedIds || []).forEach((relatedId) => edges.push({ from: idea.id, to: relatedId, type: "related" }));
    });

    platformState.agentRuns.slice(0, 6).forEach((run, index) => {
      const id = `agent-${run.agentId}-${index}`;
      nodes.push({
        id,
        type: "agent",
        title: run.title,
        body: run.summary,
        radius: 0.34 + (index % 2) * 0.08,
        angle: index * 1.1 + 2.8,
        size: 10,
      });
      edges.push({ from: "project", to: id, type: "agent" });
    });

    [
      ["demo", "Demo URL", analysis.has.demo],
      ["repo", "GitHub Repo", analysis.has.repo],
      ["screenshot", "Screenshots", analysis.has.screenshot],
      ["logo", "Logo", analysis.has.logo],
      ["team", "Team", analysis.has.team],
    ].forEach(([key, title, ready], index) => {
      const id = `evidence-${key}`;
      nodes.push({
        id,
        type: "evidence",
        title,
        body: ready ? t("audit.ready") : t("audit.missing"),
        radius: 0.66,
        angle: index * 1.18 + 0.25,
        size: ready ? 8 : 6,
        ready,
      });
      edges.push({ from: "project", to: id, type: "evidence" });
    });

    Core.toolRecommendations(language).slice(0, 7).forEach((tool, index) => {
      const id = `tool-${index}`;
      nodes.push({
        id,
        type: "tool",
        title: tool.name,
        body: tool.fit,
        radius: 0.76,
        angle: index * 0.9 + 1.3,
        size: 7,
      });
      edges.push({ from: "project", to: id, type: "tool" });
    });

    return {
      nodes: nodes.filter((node) => node.type === "project" || platformState.hubFilters[node.type]),
      edges,
    };
  }

  function nodeColor(node) {
    const colors = {
      project: "#63d6a4",
      process: "#f0b85a",
      idea: "#5c8dff",
      agent: "#ff7ab6",
      evidence: node.ready ? "#63d6a4" : "#f0b85a",
      tool: "#b6f3ff",
    };
    return colors[node.type] || "#f5f1e8";
  }

  function updateHubGraph() {
    hubGraph = buildHubGraph();
    renderHubInspect();
  }

  function renderHubInspect() {
    const selected =
      hubGraph.nodes.find((node) => node.id === platformState.selectedNodeId) ||
      hubGraph.nodes.find((node) => node.id === "project");
    if (!selected) return;
    platformState.selectedNodeId = selected.id;
    els.hubNodeTitle.textContent = selected.title;
    els.hubNodeMeta.textContent = selected.type;
    els.hubNodeBody.textContent = selected.body || "";
    const byType = hubGraph.nodes.reduce((acc, node) => {
      acc[node.type] = (acc[node.type] || 0) + 1;
      return acc;
    }, {});
    els.hubStats.innerHTML = Object.entries(byType)
      .map(([type, count]) => `<span>${type}<strong>${count}</strong></span>`)
      .join("");
  }

  function drawHub() {
    const canvas = els.hubCanvas;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.floor(rect.width * dpr) || canvas.height !== Math.floor(rect.height * dpr)) {
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
    }
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const time = performance.now() / 1000;
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, rect.width, rect.height);
    hubStarSeed.forEach((star) => {
      const x = (star.x / 997) * rect.width;
      const y = (star.y / 991) * rect.height;
      const alpha = 0.15 + Math.sin(time * 1.2 + star.pulse) * 0.08;
      ctx.fillStyle = `rgba(245,241,232,${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });

    const center = { x: rect.width * 0.52, y: rect.height * 0.53 };
    const maxR = Math.min(rect.width, rect.height) * 0.48;
    const positioned = new Map();
    hubGraph.nodes.forEach((node) => {
      const wobble = Math.sin(time + node.angle * 2) * 0.018;
      const radius = node.radius * maxR;
      positioned.set(node.id, {
        ...node,
        x: center.x + Math.cos(node.angle + wobble) * radius,
        y: center.y + Math.sin(node.angle + wobble) * radius * 0.72,
      });
    });

    ctx.lineWidth = 1;
    hubGraph.edges.forEach((edge) => {
      const from = positioned.get(edge.from);
      const to = positioned.get(edge.to);
      if (!from || !to) return;
      ctx.strokeStyle = edge.type === "related" ? "rgba(92,141,255,0.24)" : "rgba(245,241,232,0.14)";
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    });

    let hoverNode = null;
    positioned.forEach((node) => {
      const dx = hubPointer.x - node.x;
      const dy = hubPointer.y - node.y;
      const hit = hubPointer.active && Math.sqrt(dx * dx + dy * dy) < node.size + 9;
      if (hit) hoverNode = node;
      const active = platformState.selectedNodeId === node.id;
      ctx.shadowColor = nodeColor(node);
      ctx.shadowBlur = active || hit ? 24 : 10;
      ctx.fillStyle = nodeColor(node);
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size + (active ? 3 : hit ? 2 : 0), 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      if (active || hit || node.type === "project") {
        ctx.font = "700 12px Inter, system-ui, sans-serif";
        ctx.fillStyle = "rgba(245,241,232,0.92)";
        ctx.fillText(node.title.slice(0, 28), node.x + node.size + 7, node.y + 4);
      }
    });
    canvas.style.cursor = hoverNode ? "pointer" : "crosshair";
    canvas.dataset.hoverNode = hoverNode?.id || "";
    hubAnimationFrame = requestAnimationFrame(drawHub);
  }

  function startHubAnimation() {
    if (!hubAnimationFrame) {
      hubAnimationFrame = requestAnimationFrame(drawHub);
    }
  }

  async function saveSnapshotToSupabase() {
    saveSupabaseConfig();
    const project = getProject();
    const snapshot = Core.buildWorkspaceSnapshot({
      project,
      platform: platformState,
      analysis: currentAnalysis || analyze(project),
      generated,
      repoScan,
    });
    try {
      const request = Core.buildSupabaseRequests(supabaseConfig, snapshot).upsert;
      const response = await fetch(request.url, {
        ...request.options,
        body: JSON.stringify(request.options.body),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      els.syncStatus.textContent = t("sync.saved");
      els.platformState.textContent = t("sync.saved");
    } catch (error) {
      els.syncStatus.textContent = `${t("sync.failed")}: ${error.message}`;
    }
  }

  async function loadSnapshotFromSupabase() {
    saveSupabaseConfig();
    try {
      const request = Core.buildSupabaseRequests(supabaseConfig, {}).select;
      const response = await fetch(request.url, request.options);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const rows = await response.json();
      const snapshot = rows[0]?.payload;
      if (!snapshot) throw new Error("No workspace snapshot found");
      if (snapshot.project) setProject(snapshot.project);
      if (snapshot.platform) platformState = { ...platformState, ...snapshot.platform };
      generated = snapshot.generated || null;
      repoScan = snapshot.repoScan || null;
      currentAnalysis = snapshot.analysis || analyze(getProject());
      saveProject();
      savePlatform();
      runAgent();
      renderRepoScan();
      renderPlatform();
      updateHubGraph();
      els.syncStatus.textContent = t("sync.loaded");
      els.platformState.textContent = t("sync.loaded");
    } catch (error) {
      els.syncStatus.textContent = `${t("sync.failed")}: ${error.message}`;
    }
  }

  function generate(project, analysis) {
    const name = fallback(project.name, "LaunchLens");
    const track = fallback(project.track, "Application");
    const audience = fallback(
      project.audience,
      "hackathon teams, solo builders, and community reviewers",
    );
    const problem = fallback(
      project.problem,
      "Hackathon teams often have working products but lose deadline time turning messy build notes into clear Project Wall submissions.",
    );
    const solution = fallback(
      project.solution,
      "LaunchLens reviews required fields, scores readiness against UCWS criteria, and generates a submission pack, README, pitch, and sprint plan.",
    );
    const tagline = fallback(
      project.tagline,
      "Turn a rough hackathon idea into a scored, ready-to-submit Project Wall package.",
    );
    const stack = listFromCsv(project.techStack);
    const team = fallback(project.teamMembers, "Solo builder or team of up to four");
    const demoUrl = fallback(project.demoUrl, "[Add public demo URL]");
    const repoUrl = fallback(project.repoUrl, "[Add GitHub repo URL]");
    const screenshots = fallback(project.screenshotUrls, "[Add screenshot URL]");
    const logoUrl = fallback(project.logoUrl, "[Add logo URL]");
    const demoVideoUrl = fallback(project.demoVideoUrl, "[Optional demo video URL]");
    const demoFileUrl = fallback(project.demoFileUrl, "[Optional demo file URL]");
    const topFixes = analysis.fixes.slice(0, 6);

    if (language === "zh") {
      const zhDescription = `${name} 是为 ${audience} 设计的浏览器端提交助手。${problem} ${solution} 它会给出即时就绪度评分、具体修复建议，并生成与 UCWS Project Wall 字段匹配的可导出材料。这个流程不仅适用于 UCWS，也适用于全球黑客松、加速器和 Demo Day 的最终提交。`;

      const pack = `# ${name} 提交材料包

## 项目名称
${name}

## 赛道
${track}

## 一句话介绍
${tagline}

## 项目描述
${zhDescription}

## Demo URL
${demoUrl}

## 仓库 URL
${repoUrl}

## 技术栈
${stack.length ? stack.map((item) => `- ${item}`).join("\n") : "- HTML\n- CSS\n- JavaScript\n- localStorage"}

## 项目截图
${screenshots}

## Logo URL
${logoUrl}

## 演示视频 URL
${demoVideoUrl}

## 演示文件 URL
${demoFileUrl}

## 团队成员
${team}

## 为什么重要
- 帮助构建者把真实实现工作转成清晰的公开提交。
- 映射 UCWS 的三类评分：社区投票、AI 评估和专家评审。
- 输出 README、演示稿、行动计划和提交字段，适合全球团队使用。
- 默认在浏览器运行，不需要后端或账户。

## 当前就绪度
- 总分：${analysis.overall}/100
${analysis.dimensions.map((item) => `- ${item.label}: ${item.score}/100`).join("\n")}

## Project Wall 字段审计
${analysis.audit.map((item) => `- ${t(item.labelKey)}: ${item.ready ? t("audit.ready") : t("audit.missing")}`).join("\n")}

## 立即修复
${topFixes.length ? topFixes.map((item) => `- ${item}`).join("\n") : `- ${t("fix.ready")}`}`;

      const readme = `# ${name}

${tagline}

## 问题
${problem}

## 解决方案
${solution}

## 服务对象
${audience}

## 工作方式
1. 输入 Project Wall 必填字段。
2. 运行评审助手，获得就绪度评分。
3. 按社区、AI 和专家评审维度查看修复建议。
4. 生成提交材料包、README、演示稿和冲刺计划。
5. 导出 Markdown 或 JSON，用于最终提交。

## 技术栈
${stack.length ? stack.map((item) => `- ${item}`).join("\n") : "- HTML\n- CSS\n- JavaScript\n- Browser localStorage"}

## 本地 Demo
\`\`\`bash
python -m http.server 8080
\`\`\`

打开 \`http://localhost:8080/launchlens/\`。

## 提交字段
- 项目名称：${name}
- 赛道：${track}
- Demo URL：${demoUrl}
- Repo URL：${repoUrl}
- Screenshot URL：${screenshots}
- Logo URL：${logoUrl}
- 演示视频 URL：${demoVideoUrl}
- 演示文件 URL：${demoFileUrl}

## 路线图
- 在用户提供 event token 后加入认证 Project Wall 导入。
- 为自带 API key 的团队加入可选 LLM 增强。
- 在 CORS 或后端部署可用时加入 GitHub README 获取和仓库健康检查。
- 支持更多黑客松模板。`;

      const pitch = `# 90 秒演示稿

大家好，我们做的是 ${name}。

很多黑客松团队已经做出了真实产品，但最后提交时却很难在截止前把价值、证据和执行力讲清楚。${name} 解决的就是这个最后一公里问题。

在演示中，团队输入 Project Wall 字段：项目名、tagline、问题、解决方案、Demo URL、Repo URL、技术栈、截图和笔记。评审助手会立刻按 UCWS 关注的维度评分：社区清晰度、AI 可评估的实现质量，以及专家评审关注的产品潜力。

然后产品会生成提交材料包、README、演示稿、冲刺计划和具体修复建议，让构建者几分钟内从草稿走到可信的公开提交。

第一个场景是 UCWS Singapore 2026，但这个产品具有全球适用性：任何黑客松、加速器或 Demo Day 团队都能使用同样流程。`;

      const sprint = `# 最后 24 小时冲刺计划

## 第 0-2 小时：公开访问
- 部署静态 Demo。
- 把 Demo URL 添加到 Project Wall。
- 截取一张截图并加入提交材料。

## 第 2-5 小时：仓库质量
- 添加 README、运行命令和产品截图。
- 添加测试命令或手动 QA 清单。
- 让 Demo 和仓库互相链接。

## 第 5-9 小时：产品表达
- 围绕用户痛点重写 tagline。
- 添加两分钟演示脚本。
- 添加一个具体使用场景和一个全球扩展说明。

## 第 9-16 小时：打磨
- 再运行一次 LaunchLens 评审。
- 优先修复最低分维度。
- 确保第一屏无需解释即可使用。

## 第 16-24 小时：提交
- 导出 Markdown 材料包。
- 在截止前提交最终字段。
- 请三个人测试并投票/评论。`;

      const risks = `# 修复清单

当前就绪度：${analysis.overall}/100

${analysis.fixes.length ? analysis.fixes.map((item, index) => `${index + 1}. ${item}`).join("\n") : t("fix.ready")}

## 评分拆解
${analysis.dimensions.map((item) => `- ${item.label}: ${item.score}/100 - ${item.note}`).join("\n")}`;

      return { pack, readme, pitch, sprint, risks };
    }

    const description = `${name} is a browser-based submission copilot for ${audience}. ${problem} ${solution} The product gives builders an immediate readiness score, concrete fixes, and exportable materials that match the UCWS Project Wall fields. It is designed to be useful before, during, and after UCWS because the same workflow applies to any global hackathon or product demo deadline.`;

    const pack = `# ${name} Submission Pack

## Project Name
${name}

## Track
${track}

## Tagline
${tagline}

## Description
${description}

## Demo URL
${demoUrl}

## Repository URL
${repoUrl}

## Tech Stack
${stack.length ? stack.map((item) => `- ${item}`).join("\n") : "- HTML\n- CSS\n- JavaScript\n- localStorage"}

## Project Screenshot
${screenshots}

## Logo URL
${logoUrl}

## Demo Video URL
${demoVideoUrl}

## Demo File URL
${demoFileUrl}

## Team Members
${team}

## Why it matters
- It helps builders turn real implementation work into clear public submissions.
- It mirrors the UCWS scoring dimensions: community vote, AI evaluation, and expert judging.
- It gives globally useful output: README, pitch, action plan, and submission fields.
- It runs in the browser, so teams can use it without a backend or account.

## Current Readiness
- Overall: ${analysis.overall}/100
${analysis.dimensions.map((item) => `- ${item.label}: ${item.score}/100`).join("\n")}

## Project Wall Field Audit
${analysis.audit.map((item) => `- ${t(item.labelKey)}: ${item.ready ? t("audit.ready") : t("audit.missing")}`).join("\n")}

## Immediate Fixes
${topFixes.length ? topFixes.map((item) => `- ${item}`).join("\n") : "- Ready for submission review."}`;

    const readme = `# ${name}

${tagline}

## Problem
${problem}

## Solution
${solution}

## Who it serves
${audience}

## How it works
1. Enter the required Project Wall fields.
2. Run the review agent to score readiness.
3. Review the fix list across community, AI, and expert judging criteria.
4. Generate the submission pack, README, pitch, and sprint plan.
5. Export Markdown or JSON for the final submission workflow.

## Tech Stack
${stack.length ? stack.map((item) => `- ${item}`).join("\n") : "- HTML\n- CSS\n- JavaScript\n- Browser localStorage"}

## Local Demo
\`\`\`bash
python -m http.server 8080
\`\`\`

Open \`http://localhost:8080/launchlens/\`.

## Submission Fields
- Project name: ${name}
- Track: ${track}
- Demo URL: ${demoUrl}
- Repo URL: ${repoUrl}
- Screenshot URL: ${screenshots}
- Logo URL: ${logoUrl}
- Demo video URL: ${demoVideoUrl}
- Demo file URL: ${demoFileUrl}

## Roadmap
- Add authenticated Project Wall import once users provide their own event token.
- Add optional LLM enrichment for teams with their own API key.
- Add GitHub README fetch and repo-health checks when CORS or backend deployment is available.
- Add multi-event templates for other hackathons.`;

    const pitch = `# 90-Second Demo Pitch

Hi, we built ${name}.

Hackathon teams often build something real, but their final submission fails to communicate value, proof, and execution before the deadline. ${name} solves that gap.

In the demo, a team enters its Project Wall fields: name, tagline, problem, solution, demo URL, repo URL, tech stack, screenshots, and notes. The review agent immediately scores the project against the same dimensions UCWS cares about: community clarity, AI-evaluable implementation quality, and expert-level product potential.

The product then generates a submission pack, README, pitch, sprint plan, and concrete fixes. This lets a builder move from rough notes to a credible public submission in minutes.

The first use case is UCWS Singapore 2026, but the product is global: any hackathon, accelerator, or demo-day team can use the same workflow before submitting.`;

    const sprint = `# Final 24-Hour Sprint Plan

## Hour 0-2: Public access
- Deploy the static demo.
- Add the demo URL to Project Wall.
- Capture one screenshot and add it to the submission.

## Hour 2-5: Repo quality
- Add README, setup command, and product screenshots.
- Add a short test command or manual QA checklist.
- Link demo and repo from each other.

## Hour 5-9: Product clarity
- Rewrite tagline around the user's pain.
- Add a two-minute demo script.
- Add one concrete use case and one global scalability note.

## Hour 9-16: Polish
- Run LaunchLens review again.
- Fix the lowest scoring dimension first.
- Make the first screen usable without explanation.

## Hour 16-24: Submission
- Export the Markdown pack.
- Submit final fields before the deadline.
- Ask three people to test and vote/comment.`;

    const risks = `# Fix List

Overall readiness: ${analysis.overall}/100

${analysis.fixes.length ? analysis.fixes.map((item, index) => `${index + 1}. ${item}`).join("\n") : "No critical fixes detected."}

## Score Breakdown
${analysis.dimensions.map((item) => `- ${item.label}: ${item.score}/100 - ${item.note}`).join("\n")}`;

    return { pack, readme, pitch, sprint, risks };
  }

  function renderScores(analysis) {
    els.overallScore.textContent = String(analysis.overall);
    els.scoreFill.style.width = analysis.overall + "%";
    els.scoreGrid.innerHTML = "";

    analysis.dimensions.forEach((item, index) => {
      const node = els.scoreCardTemplate.content.firstElementChild.cloneNode(true);
      node.querySelector(".score-label").textContent = item.label;
      node.querySelector(".score-value").textContent = item.score + "/100";
      node.querySelector(".score-note").textContent = item.note;
      node.querySelector(".dot").style.background = [ "var(--blue)", "var(--green)", "var(--amber)" ][index];
      els.scoreGrid.appendChild(node);
    });

    renderAudit(analysis);
    renderTasks(analysis);
    renderHandoff(analysis);
    renderWorkflowState(analysis);
    updateTempleStatus();
  }

  function renderOutput() {
    if (!generated) {
      const project = getProject();
      currentAnalysis = analyze(project);
      generated = generate(project, currentAnalysis);
      renderScores(currentAnalysis);
    }
    els.output.textContent = generated[activeTab] || generated.pack;
  }

  function runAgent() {
    const project = getProject();
    currentAnalysis = analyze(project);
    generated = generate(project, currentAnalysis);
    renderScores(currentAnalysis);
    renderOutput();
    renderPlatform();
    updateHubGraph();
  }

  function setActiveTab(tab) {
    activeTab = tab;
    document.querySelectorAll(".tabs button").forEach((button) => {
      button.classList.toggle("active", button.dataset.tab === tab);
    });
    els.output.classList.remove("tab-flash");
    void els.output.offsetWidth;
    els.output.classList.add("tab-flash");
    renderOutput();
  }

  async function copyMarkdown() {
    if (!generated) runAgent();
    await navigator.clipboard.writeText(generated.pack);
    els.copyBtn.textContent = t("button.copied");
    setTimeout(() => {
      els.copyBtn.textContent = t("button.copy");
    }, 1200);
  }

  function downloadPack() {
    if (!generated) runAgent();
    const project = getProject();
    const payload = {
      project,
      analysis: currentAnalysis,
      repoScan,
      generated,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(project.name || "launchlens").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-submission-pack.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function enhanceWithLlm() {
    if (!generated) runAgent();
    const endpoint = els.llmEndpoint.value.trim();
    const model = els.llmModel.value.trim();
    const key = els.llmKey.value.trim();
    if (!endpoint || !model || !key) {
      els.output.textContent = generated[activeTab] + `\n\n[${t("missing.llm")}]`;
      return;
    }

    els.enhanceBtn.disabled = true;
    els.enhanceBtn.textContent = t("button.enhancing");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content:
                language === "zh"
                  ? "你负责优化黑客松提交文案。保持事实不变，让表达更简洁、有证据、适合 Project Wall 提交。请用中文输出。"
                  : "You improve hackathon submission copy. Keep facts intact, make it concise, evidence-based, and ready for Project Wall.",
            },
            {
              role: "user",
              content: generated[activeTab],
            },
          ],
          temperature: 0.35,
        }),
      });
      const data = await response.json();
      const text =
        data.choices?.[0]?.message?.content ||
        data.output_text ||
        JSON.stringify(data, null, 2);
      generated[activeTab] = text;
      renderOutput();
    } catch (error) {
      els.output.textContent = generated[activeTab] + `\n\n[${t("failed.llm")}: ${error.message}]`;
    } finally {
      els.enhanceBtn.disabled = false;
      els.enhanceBtn.textContent = t("button.enhance");
    }
  }

  function loadSample() {
    setProject({
      name: "LaunchLens",
      track: "Application",
      tagline: t("sample.tagline"),
      audience: t("sample.audience"),
      problem: t("sample.problem"),
      solution: t("sample.solution"),
      demoUrl: "",
      repoUrl: "",
      techStack: t("sample.stack"),
      screenshotUrls: "",
      teamMembers: t("sample.team"),
      notes: t("sample.notes"),
    });
    saveProject();
    runAgent();
  }

  els.form.addEventListener("input", () => {
    els.saveState.textContent = t("status.saving");
    const nextRepoUrl = getProject().repoUrl;
    if (repoScan && nextRepoUrl !== scannedRepoUrl) {
      repoScan = null;
      scannedRepoUrl = "";
      renderRepoScan();
    }
    saveProject();
    generated = null;
    runAgent();
  });

  els.reviewBtn.addEventListener("click", runAgent);
  els.generateBtn.addEventListener("click", runAgent);
  els.sampleBtn.addEventListener("click", loadSample);
  els.copyBtn.addEventListener("click", copyMarkdown);
  els.downloadBtn.addEventListener("click", downloadPack);
  els.langEnBtn.addEventListener("click", () => setLanguage("en"));
  els.langZhBtn.addEventListener("click", () => setLanguage("zh"));
  els.templeModeBtn.addEventListener("click", () => setViewMode("temple"));
  els.hubModeBtn.addEventListener("click", () => setViewMode("hub"));
  els.classicModeBtn.addEventListener("click", () => setViewMode("classic"));
  els.templePrimaryAction.addEventListener("click", runTemplePrimaryAction);
  els.templeReviewAction.addEventListener("click", runAgent);
  els.templeCopyAction.addEventListener("click", copyMarkdown);
  els.enhanceBtn.addEventListener("click", enhanceWithLlm);
  els.scanRepoBtn.addEventListener("click", () => {
    scannedRepoUrl = getProject().repoUrl;
    scanRepository();
  });
  els.runPlatformAgentBtn.addEventListener("click", runPlatformAgent);
  els.addIdeaBtn.addEventListener("click", addIdeaFromEditor);
  els.hubBuildBtn.addEventListener("click", addIdeasFromHubInput);
  els.hubGuideBtn.addEventListener("click", () => {
    setViewMode("classic");
    requestAnimationFrame(() => els.platformState.scrollIntoView({ behavior: "smooth", block: "start" }));
  });
  els.hubApiBtn.addEventListener("click", copyCodexApiJson);
  els.copyApiBtn.addEventListener("click", copyCodexApiJson);
  els.saveSupabaseBtn.addEventListener("click", saveSnapshotToSupabase);
  els.loadSupabaseBtn.addEventListener("click", loadSnapshotFromSupabase);
  [els.supabaseUrl, els.supabaseAnonKey, els.supabaseTable, els.supabaseWorkspaceKey].forEach((input) => {
    input.addEventListener("change", saveSupabaseConfig);
  });

  els.tutorialSteps.addEventListener("click", (event) => {
    const button = event.target.closest("[data-tutorial-id]");
    if (!button) return;
    const id = button.dataset.tutorialId;
    platformState.tutorialDone[id] = !platformState.tutorialDone[id];
    savePlatform();
    renderTutorial();
  });

  els.ideaList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-idea-id]");
    if (!button) return;
    platformState.selectedNodeId = button.dataset.ideaId;
    savePlatform();
    renderIdeas();
    updateHubGraph();
    setViewMode("hub");
  });

  document.querySelectorAll("[data-hub-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.hubFilter;
      platformState.hubFilters[key] = !platformState.hubFilters[key];
      button.classList.toggle("active", platformState.hubFilters[key]);
      savePlatform();
      updateHubGraph();
    });
  });

  els.hubCanvas.addEventListener("pointermove", (event) => {
    const rect = els.hubCanvas.getBoundingClientRect();
    hubPointer = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    };
  });

  els.hubCanvas.addEventListener("pointerleave", () => {
    hubPointer.active = false;
  });

  els.hubCanvas.addEventListener("click", () => {
    const id = els.hubCanvas.dataset.hoverNode;
    if (!id) return;
    platformState.selectedNodeId = id;
    savePlatform();
    renderHubInspect();
    renderIdeas();
  });

  els.resetBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    setProject({});
    generated = null;
    repoScan = null;
    scannedRepoUrl = "";
    platformState.ideas = [];
    platformState.agentRuns = [];
    platformState.tutorialDone = {};
    savePlatform();
    renderRepoScan();
    runAgent();
  });

  els.llmBtn.addEventListener("click", () => {
    els.llmPanel.classList.toggle("hidden");
  });

  document.querySelectorAll(".tabs button").forEach((button) => {
    button.addEventListener("click", () => setActiveTab(button.dataset.tab));
  });

  document.querySelectorAll("[data-space]").forEach((button) => {
    button.addEventListener("click", () => {
      selectTempleSpace(button.dataset.space);
      if (button.closest(".workflow-rail")) {
        runTemplePrimaryAction();
      }
    });
  });

  els.templeView.addEventListener("pointermove", emitTempleParticle);

  applyTranslations();
  loadPlatform();
  applySupabaseConfig();

  if (!loadProject()) {
    loadSample();
  } else {
    runAgent();
  }
  renderRepoScan();
  renderPlatform();
  updateHubGraph();
  startHubAnimation();
  renderTemplePanel();
  setViewMode(params.get("mode") === "classic" ? "classic" : params.get("mode") === "hub" ? "hub" : "temple");
})();
