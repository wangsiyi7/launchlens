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
    "teamMembers",
    "notes",
  ];

  const weights = {
    community: 30,
    ai: 30,
    expert: 40,
  };

  const strings = {
    en: {
      "mode.temple": "Temple",
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
      "temple.eyebrow": "Submission Temple",
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
      "field.teamMembers": "Team members",
      "field.notes": "README or rough notes",
      "placeholder.tagline": "Turn rough hackathon ideas into scored, ready-to-submit Project Wall packages.",
      "placeholder.audience": "Hackathon teams, solo builders, community reviewers",
      "placeholder.problem": "Teams lose time turning real work into clear submission materials before deadline.",
      "placeholder.solution": "LaunchLens analyzes required UCWS fields, scores readiness, and generates a focused submission pack.",
      "placeholder.techStack": "HTML, CSS, JavaScript, localStorage, optional OpenAI-compatible API",
      "placeholder.screenshotUrls": "Comma-separated image URLs after deployment",
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
      "mode.temple": "神殿",
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
      "temple.eyebrow": "提交神殿",
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
      "field.teamMembers": "团队成员",
      "field.notes": "README 或草稿笔记",
      "placeholder.tagline": "把粗糙的黑客松想法变成可评分、可提交的 Project Wall 材料包。",
      "placeholder.audience": "黑客松团队、独立开发者、社区评审者",
      "placeholder.problem": "团队常常有真实产品，却在截止前卡在如何写清楚提交材料。",
      "placeholder.solution": "LaunchLens 检查 UCWS 必填字段，生成评分、修复建议和提交材料包。",
      "placeholder.techStack": "HTML, CSS, JavaScript, localStorage, 可选 OpenAI-compatible API",
      "placeholder.screenshotUrls": "部署后的图片链接，用逗号分隔",
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
    classicModeBtn: document.querySelector("#classicModeBtn"),
    templeView: document.querySelector("#templeView"),
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
    scoreCardTemplate: document.querySelector("#scoreCardTemplate"),
  };

  let language = localStorage.getItem(LANGUAGE_KEY) === "zh" ? "zh" : "en";
  let activeTab = "pack";
  let activeTempleSpace = "intake";
  let currentAnalysis = null;
  let generated = null;

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
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage === "zh" ? "zh" : "en";
    localStorage.setItem(LANGUAGE_KEY, language);
    applyTranslations();
    generated = null;
    runAgent();
    renderTemplePanel();
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
    document.body.classList.toggle("temple-mode", temple);
    document.body.classList.toggle("classic-mode", !temple);
    els.templeModeBtn.classList.toggle("active", temple);
    els.classicModeBtn.classList.toggle("active", !temple);
    els.templeModeBtn.classList.toggle("ghost", !temple);
    els.classicModeBtn.classList.toggle("ghost", temple);
    els.templeModeBtn.setAttribute("aria-pressed", String(temple));
    els.classicModeBtn.setAttribute("aria-pressed", String(!temple));
    if (temple) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    updateTempleStatus();
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

  function countHits(text, terms) {
    const source = text.toLowerCase();
    return terms.reduce((count, term) => count + (source.includes(term) ? 1 : 0), 0);
  }

  function clampScore(score) {
    return Math.max(0, Math.min(100, Math.round(score)));
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
      demo: /^https?:\/\//i.test(project.demoUrl),
      repo: /^https?:\/\/(www\.)?github\.com\//i.test(project.repoUrl),
      stack: project.techStack.split(",").filter(Boolean).length >= 3,
      screenshot: project.screenshotUrls.length > 8,
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
        (has.screenshot ? 10 : 0) +
        Math.min(18, userSignals * 3),
    );

    const ai = clampScore(
      (has.repo ? 20 : 0) +
        (has.stack ? 16 : 0) +
        (has.notes ? 18 : 0) +
        (has.demo ? 10 : 0) +
        (has.solution ? 14 : 0) +
        Math.min(22, engineeringSignals * 3),
    );

    const expert = clampScore(
      (has.audience ? 12 : 0) +
        (has.problem ? 16 : 0) +
        (has.solution ? 18 : 0) +
        (has.demo ? 12 : 0) +
        (has.repo ? 8 : 0) +
        Math.min(24, businessSignals * 4) +
        (combined.includes("global") ? 8 : 0),
    );

    const overall = clampScore(
      (community * weights.community + ai * weights.ai + expert * weights.expert) / 100,
    );

    const fixes = [];
    if (!has.demo) fixes.push(t("fix.demo"));
    if (!has.repo) fixes.push(t("fix.repo"));
    if (!has.screenshot) fixes.push(t("fix.screenshot"));
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
  }

  function setActiveTab(tab) {
    activeTab = tab;
    document.querySelectorAll(".tabs button").forEach((button) => {
      button.classList.toggle("active", button.dataset.tab === tab);
    });
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
  els.classicModeBtn.addEventListener("click", () => setViewMode("classic"));
  els.templePrimaryAction.addEventListener("click", runTemplePrimaryAction);
  els.templeReviewAction.addEventListener("click", runAgent);
  els.templeCopyAction.addEventListener("click", copyMarkdown);
  els.enhanceBtn.addEventListener("click", enhanceWithLlm);

  els.resetBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    setProject({});
    generated = null;
    runAgent();
  });

  els.llmBtn.addEventListener("click", () => {
    els.llmPanel.classList.toggle("hidden");
  });

  document.querySelectorAll(".tabs button").forEach((button) => {
    button.addEventListener("click", () => setActiveTab(button.dataset.tab));
  });

  document.querySelectorAll("[data-space]").forEach((button) => {
    button.addEventListener("click", () => selectTempleSpace(button.dataset.space));
  });

  applyTranslations();

  if (!loadProject()) {
    loadSample();
  } else {
    runAgent();
  }
  renderTemplePanel();
  setViewMode("temple");
})();
