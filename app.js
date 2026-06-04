(function () {
  const STORAGE_KEY = "launchlens.ucws.project";
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
    llmBtn: document.querySelector("#llmBtn"),
    llmPanel: document.querySelector("#llmPanel"),
    enhanceBtn: document.querySelector("#enhanceBtn"),
    llmEndpoint: document.querySelector("#llmEndpoint"),
    llmModel: document.querySelector("#llmModel"),
    llmKey: document.querySelector("#llmKey"),
    scoreCardTemplate: document.querySelector("#scoreCardTemplate"),
  };

  let activeTab = "pack";
  let currentAnalysis = null;
  let generated = null;

  function $(id) {
    return document.querySelector("#" + id);
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

  function saveProject() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getProject()));
    els.saveState.textContent = "Saved locally";
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
    if (!has.demo) fixes.push("Add a public demo URL. UCWS reviewers and voters need immediate access.");
    if (!has.repo) fixes.push("Add a GitHub repo URL with a clear README and setup path.");
    if (!has.screenshot) fixes.push("Add at least one project screenshot URL after deployment.");
    if (!has.tagline) fixes.push("Strengthen the tagline so value is clear in one sentence.");
    if (!has.problem) fixes.push("Name the target user's concrete pain, not only the technology.");
    if (!has.solution) fixes.push("Explain what the product does and what output users get.");
    if (!has.stack) fixes.push("List at least three concrete tech stack items.");
    if (!has.notes) fixes.push("Paste README/build notes so the generated pack has enough evidence.");
    if (!combined.includes("global")) fixes.push("Describe how the product can be used beyond one local context.");
    if (!combined.includes("demo")) fixes.push("Add a short demo path that a judge can follow in under two minutes.");

    return {
      overall,
      dimensions: [
        {
          key: "community",
          label: "Community Vote",
          score: community,
          note: "Clarity, user appeal, shareability, and public demo readiness.",
        },
        {
          key: "ai",
          label: "AI Evaluation",
          score: ai,
          note: "Repo quality signals, implementation detail, structure, and authenticity.",
        },
        {
          key: "expert",
          label: "Expert Judges",
          score: expert,
          note: "Problem depth, product value, technical execution, and global scale.",
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
    els.copyBtn.textContent = "Copied";
    setTimeout(() => {
      els.copyBtn.textContent = "Copy Markdown";
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
      els.output.textContent = generated[activeTab] + "\n\n[LLM settings missing: endpoint, model, and API key are required.]";
      return;
    }

    els.enhanceBtn.disabled = true;
    els.enhanceBtn.textContent = "Enhancing...";

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
                "You improve hackathon submission copy. Keep facts intact, make it concise, evidence-based, and ready for Project Wall.",
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
      els.output.textContent = generated[activeTab] + `\n\n[LLM request failed: ${error.message}]`;
    } finally {
      els.enhanceBtn.disabled = false;
      els.enhanceBtn.textContent = "Enhance Current Pack";
    }
  }

  function loadSample() {
    setProject({
      name: "LaunchLens",
      track: "Application",
      tagline: "Turn rough hackathon ideas into scored, ready-to-submit Project Wall packages.",
      audience: "Hackathon teams, solo builders, community reviewers, and demo-day organizers",
      problem:
        "Builders often have real work but lose the last day converting product notes into clear submissions that voters, AI evaluators, and judges can understand quickly.",
      solution:
        "LaunchLens runs a browser-based review agent over UCWS submission fields, scores readiness across community vote, AI evaluation, and expert judging, then generates Markdown, README, pitch, sprint plan, and fix list outputs.",
      demoUrl: "",
      repoUrl: "",
      techStack: "HTML, CSS, JavaScript, localStorage, optional OpenAI-compatible API",
      screenshotUrls: "",
      teamMembers: "Alex - builder - Project Wall profile",
      notes:
        "The product is built as a static web app so any team can use it instantly. It aligns to UCWS required fields: name, tagline, description, demo URL, repo URL, track, tech stack, screenshot, team members, project logo, demo video, and demo file. It also mirrors the event scoring model: community clarity, AI-evaluable repo quality, and expert judging around product value and global scalability. The first screen is the usable tool, not a landing page. Outputs can be copied or downloaded for submission.",
    });
    saveProject();
    runAgent();
  }

  els.form.addEventListener("input", () => {
    els.saveState.textContent = "Saving...";
    saveProject();
    generated = null;
    runAgent();
  });

  els.reviewBtn.addEventListener("click", runAgent);
  els.generateBtn.addEventListener("click", runAgent);
  els.sampleBtn.addEventListener("click", loadSample);
  els.copyBtn.addEventListener("click", copyMarkdown);
  els.downloadBtn.addEventListener("click", downloadPack);
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

  if (!loadProject()) {
    loadSample();
  } else {
    runAgent();
  }
})();
