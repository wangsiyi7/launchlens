(function (global) {
  const schemaVersion = "2.0.0-platform";

  function listFromCsv(value) {
    return String(value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function projectName(project) {
    return project?.name || "Untitled hackathon project";
  }

  function scoreLabel(analysis) {
    const score = Number(analysis?.overall || 0);
    if (score >= 82) return "ready";
    if (score >= 62) return "close";
    return "early";
  }

  function processSteps(language = "en") {
    const zh = language === "zh";
    return [
      {
        id: "discover",
        title: zh ? "发现问题" : "Discover",
        body: zh
          ? "先把用户、痛点和约束写清楚，避免一开始就陷入功能堆叠。"
          : "Clarify the user, pain, and constraints before adding features.",
        output: zh ? "问题假设、目标用户、成功标准" : "Problem hypothesis, user, success criteria",
      },
      {
        id: "shape",
        title: zh ? "塑形方案" : "Shape",
        body: zh
          ? "把方案压缩成可演示的核心路径，并为每一步标注证据。"
          : "Compress the concept into one demoable path and attach evidence to each step.",
        output: zh ? "Demo 路径、字段、风险清单" : "Demo path, fields, risk list",
      },
      {
        id: "build",
        title: zh ? "构建原型" : "Build",
        body: zh
          ? "优先保证第一屏、交互反馈、数据保存和导出链路完整。"
          : "Prioritize first-screen clarity, interaction feedback, persistence, and export.",
        output: zh ? "可访问 Demo、仓库、截图" : "Public demo, repository, screenshots",
      },
      {
        id: "agent",
        title: zh ? "运行 Agent" : "Run Agents",
        body: zh
          ? "让策略、证据、构建、演示和风险 Agent 分别给出下一步。"
          : "Use strategy, evidence, build, demo, and risk agents for focused next moves.",
        output: zh ? "Agent 建议、下一步行动、关联想法" : "Agent recommendations, next actions, linked ideas",
      },
      {
        id: "archive",
        title: zh ? "沉淀归档" : "Archive",
        body: zh
          ? "把不同想法、证据、工具和决策建立关联，形成可复用资产。"
          : "Connect ideas, evidence, tools, and decisions into reusable project memory.",
        output: zh ? "想法图谱、材料包、复盘记录" : "Idea graph, pack, retrospectives",
      },
      {
        id: "gate",
        title: zh ? "对抗校验" : "Adversarial Gate",
        body: zh
          ? "参考 re-forge 的 skeptic、adversary、evaluator 思路，让项目在提交前被主动质疑。"
          : "Borrow the re-forge pattern of skeptic, adversary, and evaluator checks before submission.",
        output: zh ? "反驳清单、证据缺口、升级建议" : "Challenge list, evidence gaps, upgrade advice",
      },
      {
        id: "ship",
        title: zh ? "提交发布" : "Ship",
        body: zh
          ? "最后校验公开链接、README、演示脚本和提交字段。"
          : "Validate public links, README, demo script, and submission fields.",
        output: zh ? "Project Wall 字段、GitHub、部署链接" : "Project Wall fields, GitHub, deployed URL",
      },
    ];
  }

  function tutorialSteps(language = "en") {
    const zh = language === "zh";
    return [
      {
        id: "tour-first-screen",
        title: zh ? "确认第一屏" : "Check the first screen",
        action: zh
          ? "进入神殿模式，确认项目名、分数和空间节点一眼可见。"
          : "Open Temple mode and confirm the name, score, and spatial nodes are visible.",
      },
      {
        id: "tour-story",
        title: zh ? "写项目故事" : "Write the story",
        action: zh
          ? "补齐项目名、用户、问题、解决方案和一句话介绍。"
          : "Fill name, users, problem, solution, and tagline.",
      },
      {
        id: "tour-evidence",
        title: zh ? "补证据" : "Attach evidence",
        action: zh
          ? "添加 Demo、GitHub、截图、Logo、技术栈和团队信息。"
          : "Add demo, GitHub, screenshots, logo, stack, and team details.",
      },
      {
        id: "tour-agent",
        title: zh ? "运行 Agent" : "Run an agent",
        action: zh
          ? "选择策略、证据或风险 Agent，生成一组具体行动。"
          : "Choose a strategy, evidence, or risk agent and generate concrete actions.",
      },
      {
        id: "tour-forge",
        title: zh ? "运行 Re-Forge Gate" : "Run Re-Forge Gate",
        action: zh
          ? "选择 Re-Forge Gate Agent，让它按对抗校验、证据沉淀和长期演进提出升级建议。"
          : "Choose Re-Forge Gate Agent for adversarial checks, evidence memory, and long-horizon upgrade advice.",
      },
      {
        id: "tour-ideas",
        title: zh ? "归档想法关系" : "Archive idea links",
        action: zh
          ? "创建至少两个想法，并把其中一个设为另一个的来源或关联。"
          : "Create at least two ideas and link one as a parent or relation.",
      },
      {
        id: "tour-sync",
        title: zh ? "可选同步" : "Optional sync",
        action: zh
          ? "接入 Supabase 后保存工作区快照，团队即可跨设备协作。"
          : "Connect Supabase and save a workspace snapshot for cross-device work.",
      },
    ];
  }

  function toolRecommendations(language = "en") {
    const zh = language === "zh";
    return [
      {
        category: zh ? "构想" : "Ideation",
        name: "LaunchLens Agents",
        fit: zh ? "把模糊想法拆成策略、证据和风险问题。" : "Break rough ideas into strategy, evidence, and risk questions.",
      },
      {
        category: zh ? "构建" : "Build",
        name: "GitHub + Codespaces",
        fit: zh ? "统一仓库、Issue、PR 和快速云端开发环境。" : "Unify repository, issues, PRs, and cloud development.",
      },
      {
        category: zh ? "前端验证" : "Frontend QA",
        name: "Playwright",
        fit: zh ? "用截图和交互测试保证 Demo 不只是能打开。" : "Use screenshots and interaction checks to make demos trustworthy.",
      },
      {
        category: zh ? "后端" : "Backend",
        name: "Supabase",
        fit: zh ? "用 Postgres、Auth 和 REST API 保存团队工作区。" : "Use Postgres, Auth, and REST APIs for team workspaces.",
      },
      {
        category: zh ? "部署" : "Deploy",
        name: "Vercel / Netlify / GitHub Pages",
        fit: zh ? "把静态 Demo 快速变成公开链接。" : "Turn a static demo into a public URL quickly.",
      },
      {
        category: zh ? "演示" : "Demo",
        name: "Canva / Figma Slides",
        fit: zh ? "把生成的 pitch 和截图变成正式路演材料。" : "Convert generated pitch copy and screenshots into presentation material.",
      },
      {
        category: zh ? "模型" : "LLM",
        name: "OpenAI-compatible endpoint",
        fit: zh ? "保留可替换模型接口，避免把项目锁死在单一供应商。" : "Keep a replaceable model interface instead of locking into one vendor.",
      },
      {
        category: zh ? "方法论" : "Protocol",
        name: "re-forge",
        url: "https://github.com/Akasxh/re-forge",
        fit: zh
          ? "参考其多 Agent 对抗校验、证据基底和跨会话记忆，把 LaunchLens 升级成长期黑客松操作台。"
          : "Reference its multi-agent adversarial gates, evidence substrate, and cross-session memory to harden LaunchLens as a long-term hackathon operating desk.",
      },
    ];
  }

  function agentDefinitions(language = "en") {
    const zh = language === "zh";
    return [
      {
        id: "strategy",
        label: zh ? "策略 Agent" : "Strategy Agent",
        role: zh ? "定位用户、价值和评审叙事。" : "Position user value and judging narrative.",
      },
      {
        id: "evidence",
        label: zh ? "证据 Agent" : "Evidence Agent",
        role: zh ? "找出提交证据缺口。" : "Find submission evidence gaps.",
      },
      {
        id: "build",
        label: zh ? "构建 Agent" : "Build Agent",
        role: zh ? "把下一步开发压成可执行任务。" : "Turn next development work into executable tasks.",
      },
      {
        id: "demo",
        label: zh ? "演示 Agent" : "Demo Agent",
        role: zh ? "生成两分钟演示路径。" : "Generate a two-minute demo path.",
      },
      {
        id: "scout",
        label: zh ? "工具推荐 Agent" : "Tool Scout Agent",
        role: zh ? "推荐适合当前阶段的工具。" : "Recommend tools for the current stage.",
      },
      {
        id: "risk",
        label: zh ? "风险 Agent" : "Risk Agent",
        role: zh ? "识别商业、技术和提交风险。" : "Identify business, technical, and submission risks.",
      },
      {
        id: "forge",
        label: zh ? "Re-Forge Gate Agent" : "Re-Forge Gate Agent",
        role: zh
          ? "参考 re-forge 的对抗门、证据文件和演进团队，审计 LaunchLens 的长期升级路径。"
          : "Use re-forge-inspired gates, evidence files, and evolution loops to audit the LaunchLens upgrade path.",
      },
    ];
  }

  function externalReferences(language = "en") {
    const zh = language === "zh";
    return [
      {
        name: "re-forge",
        url: "https://github.com/Akasxh/re-forge",
        license: "MIT",
        use: zh
          ? "作为方法论参考：多 Agent 对抗校验、证据基底、跨会话记忆和能力演进流程。LaunchLens 未复制其源码。"
          : "Methodology reference for multi-agent adversarial gates, evidence substrate, cross-session memory, and capability evolution. LaunchLens does not copy source code from it.",
      },
    ];
  }

  function labelsForMissing(language, has = {}) {
    const zh = language === "zh";
    const labels = {
      demo: zh ? "公开 Demo" : "public demo",
      repo: zh ? "GitHub 仓库" : "GitHub repo",
      screenshot: zh ? "产品截图" : "product screenshot",
      logo: zh ? "Logo" : "logo",
      team: zh ? "团队信息" : "team info",
      notes: zh ? "README/构建笔记" : "README/build notes",
    };
    return Object.keys(labels)
      .filter((key) => has[key] === false)
      .map((key) => labels[key]);
  }

  function buildAgentResult({ agentId, language = "en", project = {}, analysis = {}, ideas = [] }) {
    const zh = language === "zh";
    const score = Number(analysis?.overall || 0);
    const missing = labelsForMissing(language, analysis?.has || {});
    const ideaTitles = ideas.slice(-3).map((idea) => idea.title).filter(Boolean);
    const name = projectName(project);
    const status = scoreLabel(analysis);

    const presets = {
      strategy: {
        title: zh ? "策略判断" : "Strategy judgment",
        summary: zh
          ? `${name} 当前处于 ${status} 阶段。先证明它不是填表工具，而是黑客松团队的提交操作系统。`
          : `${name} is currently in the ${status} zone. Prove it is not a form, but an operating system for hackathon submission work.`,
        checklist: zh
          ? ["把核心用户写成一个具体团队角色。", "用一句话解释为什么现在必须用它。", "把输出物和比赛评分标准直接绑定。"]
          : ["Name one concrete team role as the core user.", "Explain why the product is urgent now.", "Tie outputs directly to judging criteria."],
      },
      evidence: {
        title: zh ? "证据缺口" : "Evidence gaps",
        summary: missing.length
          ? zh
            ? `最先补齐：${missing.join("、")}。`
            : `Fix first: ${missing.join(", ")}.`
          : zh
            ? "核心证据已经齐备，下一步是让证据更容易被评审快速检查。"
            : "Core evidence is present; now make it easy for reviewers to inspect quickly.",
        checklist: zh
          ? ["保证 Demo 一键可访问。", "README 第一屏写运行命令。", "截图必须展示真实交互状态。"]
          : ["Make the demo one-click accessible.", "Put the run command in the first README screen.", "Use screenshots that show real interaction states."],
      },
      build: {
        title: zh ? "构建计划" : "Build plan",
        summary: zh
          ? "把平台能力分成前端可感知、数据可保存、协作可同步三层。"
          : "Split platform work into visible frontend, saved data, and collaborative sync.",
        checklist: zh
          ? ["先完成本地 Agent 和教程闭环。", "再接 Supabase 快照保存。", "最后用测试固定关键纯函数。"]
          : ["Finish local agents and tutorial loop first.", "Then wire Supabase snapshot sync.", "Finally test the key pure functions."],
      },
      demo: {
        title: zh ? "演示路径" : "Demo path",
        summary: zh
          ? "两分钟演示应从空间化第一屏开始，再进入平台控制台。"
          : "The two-minute demo should start in the spatial first screen, then enter the platform console.",
        checklist: zh
          ? ["展示 2.5D 节点切换。", "运行一个 Agent。", "创建两个相关想法。", "展示 Supabase 可选同步入口。"]
          : ["Show 2.5D node switching.", "Run one agent.", "Create two linked ideas.", "Show the optional Supabase sync entry."],
      },
      scout: {
        title: zh ? "工具建议" : "Tool recommendations",
        summary: zh
          ? "当前最值得接入的是 Supabase、Playwright 和一个可替换的大模型接口。"
          : "The strongest next integrations are Supabase, Playwright, and a replaceable LLM endpoint.",
        checklist: zh
          ? ["Supabase 保存团队工作区。", "Playwright 做截图回归。", "OpenAI-compatible endpoint 负责文案增强。"]
          : ["Supabase stores team workspaces.", "Playwright runs screenshot regression.", "OpenAI-compatible endpoint enhances copy."],
      },
      forge: {
        title: zh ? "Re-Forge Gate 审计" : "Re-Forge Gate audit",
        summary: zh
          ? "把 LaunchLens 的每次升级都当作一个需要研究、实现、测试、文档和演进复盘的证据闭环。"
          : "Treat every LaunchLens upgrade as a research, engineering, testing, documentation, and evolution evidence loop.",
        checklist: zh
          ? ["为每次升级写入 CHANGELOG。", "保留外部项目链接和许可声明。", "用对抗问题检查证据是否足以说服评委和后续开发者。"]
          : ["Write each upgrade into CHANGELOG.", "Keep external project links and license attribution.", "Use adversarial questions to test whether evidence can convince judges and future maintainers."],
      },
      risk: {
        title: zh ? "风险审计" : "Risk audit",
        summary: zh
          ? "最大风险是产品被理解成提交表单，而不是长期协作平台。"
          : "The biggest risk is being perceived as a submission form, not a long-term collaboration platform.",
        checklist: zh
          ? ["让 Agent 输出可复制行动。", "让想法之间有关系记录。", "明确哪些能力是本地可用，哪些需要后端。"]
          : ["Make agent output actionable.", "Record relationships between ideas.", "Separate local features from backend-dependent features."],
      },
    };

    const result = presets[agentId] || presets.strategy;
    return {
      agentId,
      ...result,
      linkedIdeas: ideaTitles,
      generatedAt: new Date().toISOString(),
    };
  }

  function createIdea(input, now = new Date().toISOString()) {
    const title = String(input?.title || "").trim();
    if (!title) return null;
    return {
      id: input?.id || `idea-${now.replace(/[^0-9]/g, "").slice(0, 14)}-${Math.random().toString(16).slice(2, 6)}`,
      title,
      summary: String(input?.summary || "").trim(),
      stage: input?.stage || "seed",
      tags: listFromCsv(input?.tags || ""),
      parentId: input?.parentId || "",
      relatedIds: Array.isArray(input?.relatedIds) ? input.relatedIds : listFromCsv(input?.relatedIds || ""),
      createdAt: now,
      updatedAt: now,
    };
  }

  function buildIdeaGraph(ideas = []) {
    const ids = new Set(ideas.map((idea) => idea.id));
    const edges = [];
    ideas.forEach((idea) => {
      if (idea.parentId && ids.has(idea.parentId)) {
        edges.push({ from: idea.parentId, to: idea.id, type: "parent" });
      }
      (idea.relatedIds || []).forEach((relatedId) => {
        if (ids.has(relatedId) && relatedId !== idea.id) {
          edges.push({ from: idea.id, to: relatedId, type: "related" });
        }
      });
    });
    return {
      nodes: ideas.map((idea) => ({
        id: idea.id,
        title: idea.title,
        stage: idea.stage,
        tags: idea.tags || [],
      })),
      edges,
    };
  }

  function buildWorkspaceSnapshot({ project, platform, analysis, generated, repoScan, externalReferences = [] }) {
    return {
      schemaVersion,
      project: project || {},
      platform: platform || {},
      analysis: analysis || null,
      generated: generated || null,
      repoScan: repoScan || null,
      externalReferences,
      savedAt: new Date().toISOString(),
    };
  }

  function normalizeSupabaseConfig(config = {}) {
    const url = String(config.url || "").trim().replace(/\/+$/, "");
    const table = String(config.table || "launchlens_workspace").trim();
    const workspaceKey = String(config.workspaceKey || "default").trim();
    const anonKey = String(config.anonKey || "").trim();
    return { url, table, workspaceKey, anonKey };
  }

  function buildSupabaseRequests(config, snapshot) {
    const normalized = normalizeSupabaseConfig(config);
    if (!normalized.url || !normalized.anonKey || !normalized.table || !normalized.workspaceKey) {
      throw new Error("Missing Supabase URL, anon key, table, or workspace key.");
    }
    const base = `${normalized.url}/rest/v1/${encodeURIComponent(normalized.table)}`;
    const authHeaders = {
      apikey: normalized.anonKey,
      Authorization: `Bearer ${normalized.anonKey}`,
    };
    return {
      upsert: {
        url: `${base}?on_conflict=workspace_key`,
        options: {
          method: "POST",
          headers: {
            ...authHeaders,
            "Content-Type": "application/json",
            Prefer: "resolution=merge-duplicates,return=representation",
          },
          body: {
            workspace_key: normalized.workspaceKey,
            payload: snapshot,
            updated_at: new Date().toISOString(),
          },
        },
      },
      select: {
        url: `${base}?workspace_key=eq.${encodeURIComponent(normalized.workspaceKey)}&select=workspace_key,payload,updated_at&limit=1`,
        options: {
          method: "GET",
          headers: authHeaders,
        },
      },
    };
  }

  const api = {
    schemaVersion,
    processSteps,
    tutorialSteps,
    toolRecommendations,
    agentDefinitions,
    externalReferences,
    buildAgentResult,
    createIdea,
    buildIdeaGraph,
    buildWorkspaceSnapshot,
    normalizeSupabaseConfig,
    buildSupabaseRequests,
    listFromCsv,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    global.LaunchLensPlatformCore = api;
  }
})(typeof window !== "undefined" ? window : globalThis);
