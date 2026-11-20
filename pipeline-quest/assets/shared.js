(function () {
  "use strict";

  const STORAGE_KEY = "pipeline_quest_state_v1";

  const CHAPTER_META = [
    {
      id: 1,
      file: "chapters/chapter-1.html",
      shortTitle: "Git — The Beginning",
      summary: "You just joined the Checkout Team. Set up your workspace safely using feature branches instead of editing main directly.",
      tags: ["Git", "Repository", "Branches", "Working Dir"],
      quiz: [
        {
          q: "Why should you create a feature branch instead of editing directly on `main`?",
          options: [
            "Because Git refuses to save files on the main branch",
            "To keep `main` stable and deployable while isolating incomplete work for review",
            "Because feature branches automatically deploy to production without tests"
          ],
          answer: 1,
          explain: "Keeping unfinished edits off `main` ensures teammates always have a working baseline and enables Pull Request reviews."
        },
        {
          q: "Which area holds changes selected to be included in your next commit?",
          options: ["The Staging Area (Index)", "The Remote Origin", "The GitHub Runner"],
          answer: 0,
          explain: "`git add` places modified files into the staging area before `git commit` records them permanently."
        }
      ]
    },
    {
      id: 2,
      file: "chapters/chapter-2.html",
      shortTitle: "Commit and Push",
      summary: "Stage, commit, and push your local feature branch to GitHub (`origin`) so teammates and CI can access it.",
      tags: ["git status", "git add", "git commit", "git push"],
      quiz: [
        {
          q: "After running `git commit -m \"feat: add badge\"`, where does your new commit exist?",
          options: [
            "Only in your local repository until you run `git push`",
            "Automatically on GitHub and deployed to production",
            "Inside the staging area waiting for `git add`"
          ],
          answer: 0,
          explain: "`git commit` writes a snapshot locally. You must run `git push` to send commits to `origin` on GitHub."
        },
        {
          q: "What does `origin` refer to in `git push origin feat/user-profile`?",
          options: [
            "The first commit ever made in Git",
            "The default alias for your remote GitHub repository URL",
            "Your local working directory"
          ],
          answer: 1,
          explain: "When you clone a repo from GitHub, Git automatically names that remote URL `origin`."
        }
      ]
    },
    {
      id: 3,
      file: "chapters/chapter-3.html",
      shortTitle: "GitHub Actions Triggers",
      summary: "Your code hits GitHub and automation starts immediately. Learn `.github/workflows/` and event triggers.",
      tags: [".github/workflows/", "push", "pull_request"],
      quiz: [
        {
          q: "Where must workflow YAML files be stored for GitHub Actions to recognize them?",
          options: [
            "In the root directory as `actions.txt`",
            "Inside the `.github/workflows/` directory",
            "Inside `node_modules/.actions/`"
          ],
          answer: 1,
          explain: "GitHub automatically scans `.github/workflows/*.yml` (or `.yaml`) in your repository."
        },
        {
          q: "Which trigger allows a developer to start a GitHub Actions workflow manually with a button click?",
          options: ["workflow_dispatch", "manual_commit", "git_status"],
          answer: 0,
          explain: "Adding `workflow_dispatch:` under `on:` creates a 'Run workflow' button inside the GitHub Actions tab."
        }
      ]
    },
    {
      id: 4,
      file: "chapters/chapter-4.html",
      shortTitle: "Jobs, Steps & Runners",
      summary: "Watch a fresh `ubuntu-latest` runner check out your code, set up Node.js, run tests, and build the app.",
      tags: ["Jobs", "Steps", "Runners", "actions/checkout"],
      quiz: [
        {
          q: "Why do almost all GitHub Actions jobs start with `uses: actions/checkout@v4`?",
          options: [
            "To deploy the site directly to AWS",
            "Because a fresh runner starts empty and needs your repository code cloned onto it",
            "To create a new Git branch automatically"
          ],
          answer: 1,
          explain: "GitHub-hosted runners are clean virtual machines. `actions/checkout` downloads your branch's code into the runner workspace."
        },
        {
          q: "If job `deploy` has `needs: test`, what happens?",
          options: [
            "`deploy` runs at the exact same time as `test`",
            "`deploy` waits and only runs if `test` finishes successfully",
            "`test` is skipped completely"
          ],
          answer: 1,
          explain: "`needs:` creates a job dependency so downstream jobs do not execute when upstream checks fail."
        }
      ]
    },
    {
      id: 5,
      file: "chapters/chapter-5.html",
      shortTitle: "Testing — Something Fails!",
      summary: "A unit test fails and blocks your Pull Request. Inspect the logs, fix the bug, and turn the pipeline green.",
      tags: ["Unit Tests", "Status Checks", "Branch Protection"],
      quiz: [
        {
          q: "What is the main purpose of Pull Request branch protection with required status checks?",
          options: [
            "To make code reviews slower",
            "To block broken or failing code from being merged into `main`",
            "To delete failed feature branches automatically"
          ],
          answer: 1,
          explain: "Required status checks enforce quality automatically: if tests fail, GitHub blocks the merge until fixed."
        },
        {
          q: "When a CI pipeline fails on a Pull Request, what is the proper engineering response?",
          options: [
            "Ignore the logs and disable the test suite",
            "Inspect the workflow logs, fix the bug, push the fix, and verify the pipeline turns green",
            "Copy files manually onto the production server"
          ],
          answer: 1,
          explain: "Logs pinpoint the failing assertion. Fixing the root cause and rerunning CI keeps the codebase healthy."
        }
      ]
    },
    {
      id: 6,
      file: "chapters/chapter-6.html",
      shortTitle: "Continuous Delivery & Deployment",
      summary: "Your PR is approved and merged! Watch secrets, staging gates, and production deployment in action.",
      tags: ["CI", "Continuous Delivery", "Continuous Deployment", "Secrets"],
      quiz: [
        {
          q: "What is the key difference between Continuous Delivery and Continuous Deployment?",
          options: [
            "Continuous Delivery skips automated tests; Continuous Deployment runs them",
            "Continuous Delivery requires a manual approval step before production release, while Continuous Deployment releases automatically",
            "They are two names for the exact same thing"
          ],
          answer: 1,
          explain: "Continuous Delivery prepares a release waiting for human approval; Continuous Deployment pushes straight to production automatically."
        },
        {
          q: "How should API keys and deployment tokens be stored for a GitHub Actions workflow?",
          options: [
            "Committed inside `ci.yml` as plain text",
            "Stored in GitHub Secrets and referenced via `${{ secrets.NAME }}`",
            "Written inside `README.md`"
          ],
          answer: 1,
          explain: "GitHub Secrets are encrypted at rest and automatically masked in workflow logs."
        }
      ]
    }
  ];

  const defaultState = {
    theme: "dark",
    completedChapters: [],
    interactiveDone: { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
    quizAnswers: {},
    finalExamAnswers: {},
    finalExamSubmitted: false,
    ch1Choice: null,
    ch2Step: 0,
    ch3Trigger: "pull_request",
    ch5Stage: "initial"
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return JSON.parse(JSON.stringify(defaultState));
      const parsed = JSON.parse(raw);
      return Object.assign({}, JSON.parse(JSON.stringify(defaultState)), parsed, {
        interactiveDone: Object.assign({}, defaultState.interactiveDone, parsed.interactiveDone || {})
      });
    } catch (e) {
      return JSON.parse(JSON.stringify(defaultState));
    }
  }

  let state = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
    updateProgressUI();
  }

  function getBase() {
    return document.body.getAttribute("data-base") || ".";
  }

  function linkTo(path) {
    const base = getBase();
    return base === "." ? path : `${base}/${path}`;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function computeProgress() {
    const chCount = state.completedChapters.length;
    let quizCorrect = 0;
    let totalQuizzes = 0;
    CHAPTER_META.forEach((ch) => {
      ch.quiz.forEach((_, idx) => {
        totalQuizzes++;
        const rec = state.quizAnswers[`ch${ch.id}_${idx}`];
        if (rec && rec.correct) quizCorrect++;
      });
    });
    const totalUnits = CHAPTER_META.length + totalQuizzes;
    const answeredCount = Object.keys(state.quizAnswers).filter((k) => k.startsWith("ch")).length;
    const pct = Math.min(100, Math.round(((chCount + answeredCount) / totalUnits) * 100));
    return { chCount, quizCorrect, totalQuizzes, pct };
  }

  function updateProgressUI() {
    const { pct } = computeProgress();
    const navText = document.getElementById("navProgressText");
    const navFill = document.getElementById("navProgressFill");
    const sideText = document.getElementById("sidebarProgressPct");
    const sideFill = document.getElementById("sidebarProgressFill");
    if (navText) navText.textContent = `${pct}%`;
    if (navFill) navFill.style.width = `${pct}%`;
    if (sideText) sideText.textContent = `${pct}%`;
    if (sideFill) sideFill.style.width = `${pct}%`;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const icon = document.getElementById("themeIcon");
    if (icon) icon.textContent = theme === "dark" ? "☀" : "🌙";
  }

  function injectTopbarAndModal(activeSection) {
    const header = document.getElementById("sharedTopbar");
    if (header) {
      header.innerHTML = `
        <a class="brand" href="${linkTo("index.html")}">
          <span class="brand-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="18" cy="18" r="3"></circle>
              <path d="M6 9v6a3 3 0 0 0 3 3h6"></path>
              <path d="M18 6v6"></path>
              <circle cx="18" cy="6" r="3"></circle>
            </svg>
          </span>
          <span>Pipeline Quest</span>
        </a>

        <nav class="nav-links" id="mainNavLinks">
          <a class="nav-btn ${activeSection === "home" ? "active" : ""}" href="${linkTo("index.html")}">Overview</a>
          <a class="nav-btn ${activeSection === "chapters" ? "active" : ""}" href="${linkTo("chapters/chapter-1.html")}">Chapters</a>
          <a class="nav-btn ${activeSection === "playground" ? "active" : ""}" href="${linkTo("playground.html")}">Playground</a>
          <a class="nav-btn ${activeSection === "docs" ? "active" : ""}" href="${linkTo("docs.html")}">Documentation</a>
        </nav>

        <div class="nav-actions">
          <button class="progress-pill" id="openProgressModalBtn" title="View learning progress">
            <span id="navProgressText">0%</span>
            <span class="progress-bar-mini"><span class="progress-bar-mini-fill" id="navProgressFill"></span></span>
          </button>
          <button class="icon-btn" id="themeToggleBtn" title="Toggle light/dark theme" aria-label="Toggle theme">
            <span id="themeIcon">☀</span>
          </button>
          <button class="icon-btn mobile-menu-toggle" id="mobileMenuBtn" aria-label="Toggle navigation menu">☰</button>
        </div>
      `;

      document.getElementById("themeToggleBtn").addEventListener("click", () => {
        state.theme = state.theme === "dark" ? "light" : "dark";
        applyTheme(state.theme);
        saveState();
      });

      document.getElementById("mobileMenuBtn").addEventListener("click", () => {
        document.getElementById("mainNavLinks").classList.toggle("open");
      });
    }

    if (!document.getElementById("progressModal")) {
      const modal = document.createElement("div");
      modal.className = "modal-backdrop";
      modal.id = "progressModal";
      modal.innerHTML = `
        <div class="modal-box">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <h3 style="margin:0;">Your Learning Progress</h3>
            <button class="icon-btn" id="closeProgressModalBtn" aria-label="Close modal">✕</button>
          </div>
          <div id="progressModalBody"></div>
          <div style="display:flex;justify-content:space-between;gap:0.75rem;margin-top:1.25rem;padding-top:1rem;border-top:1px solid var(--border-subtle);">
            <button class="btn btn-danger btn-sm" id="resetProgressBtn">Reset All Saved Progress</button>
            <a class="btn btn-primary btn-sm" href="${linkTo("chapters/chapter-1.html")}">Go to Chapters</a>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const close = () => modal.classList.remove("open");
      document.getElementById("closeProgressModalBtn").addEventListener("click", close);
      modal.addEventListener("click", (e) => { if (e.target === modal) close(); });

      const openBtn = document.getElementById("openProgressModalBtn");
      if (openBtn) {
        openBtn.addEventListener("click", () => {
          const { chCount, quizCorrect, totalQuizzes, pct } = computeProgress();
          document.getElementById("progressModalBody").innerHTML = `
            <div style="margin-bottom:1rem;">
              <div style="display:flex;justify-content:space-between;font-size:0.88rem;margin-bottom:0.4rem;">
                <span>Overall Quest Completion</span><strong>${pct}%</strong>
              </div>
              <div class="progress-bar-mini" style="width:100%;height:10px;">
                <div class="progress-bar-mini-fill" style="width:${pct}%;"></div>
              </div>
            </div>
            <div style="display:grid;gap:0.45rem;font-size:0.88rem;">
              <div>• Chapters Completed: <strong>${chCount} / ${CHAPTER_META.length}</strong></div>
              <div>• Chapter Quiz Correct: <strong>${quizCorrect} / ${totalQuizzes}</strong></div>
              <div>• Final Assessment: <strong>${state.finalExamSubmitted ? "Submitted" : "Not submitted yet"}</strong></div>
            </div>
            <p style="font-size:0.78rem;color:var(--text-muted);margin-top:0.85rem;">Saved automatically in browser LocalStorage.</p>
          `;
          modal.classList.add("open");
        });
      }

      document.getElementById("resetProgressBtn").addEventListener("click", () => {
        const theme = state.theme;
        state = JSON.parse(JSON.stringify(defaultState));
        state.theme = theme;
        saveState();
        window.location.reload();
      });
    }

    applyTheme(state.theme);
    updateProgressUI();
  }

  function renderChapterSidebar(currentChapterId) {
    const aside = document.getElementById("chapterSidebar");
    if (!aside) return;
    aside.innerHTML = `
      <h2 class="sidebar-title">Quest Chapters</h2>
      <ul class="chapter-nav-list">
        ${CHAPTER_META.map((ch) => {
          const active = ch.id === currentChapterId ? "active" : "";
          const done = state.completedChapters.includes(ch.id) ? "done" : "";
          return `
            <li>
              <a class="chapter-nav-item ${active}" href="${linkTo(ch.file)}">
                <span>${ch.id}. ${ch.shortTitle}</span>
                <span class="chapter-status-dot ${done}"></span>
              </a>
            </li>
          `;
        }).join("")}
        <li style="margin-top:0.5rem;padding-top:0.5rem;border-top:1px solid var(--border-subtle);">
          <a class="chapter-nav-item" href="${linkTo("exam.html")}">
            <span>🎓 Final Assessment</span>
            <span class="badge badge-purple">10 Qs</span>
          </a>
        </li>
      </ul>
      <div style="margin-top:1rem;padding-top:0.85rem;border-top:1px solid var(--border-subtle);">
        <div style="display:flex;justify-content:space-between;font-size:0.78rem;margin-bottom:0.35rem;">
          <span>Course Progress</span><strong id="sidebarProgressPct">0%</strong>
        </div>
        <div class="progress-bar-mini" style="width:100%;height:8px;">
          <div class="progress-bar-mini-fill" id="sidebarProgressFill"></div>
        </div>
      </div>
    `;
    updateProgressUI();
  }

  function initConceptAccordions() {
    document.querySelectorAll(".concept-trigger").forEach((trig) => {
      trig.addEventListener("click", () => trig.parentElement.classList.toggle("open"));
    });
  }

  function markChapterComplete(chId) {
    state.interactiveDone[chId] = true;
    if (!state.completedChapters.includes(chId)) {
      state.completedChapters.push(chId);
    }
    saveState();
    renderChapterSidebar(chId);
    const badge = document.getElementById("chapterStatusBadge");
    if (badge) {
      badge.className = "badge badge-green";
      badge.textContent = "✓ Mission Completed";
    }
  }

  function renderChapterQuiz(chId, containerId) {
    const ch = CHAPTER_META.find((c) => c.id === chId);
    const box = document.getElementById(containerId || "chapterQuizBox");
    if (!ch || !box) return;

    box.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
        <h3 style="margin:0;font-size:1.02rem;">Chapter ${ch.id} Knowledge Check</h3>
        <span class="badge badge-purple">${ch.quiz.length} Questions</span>
      </div>
      ${ch.quiz.map((qObj, qIdx) => {
        const key = `ch${ch.id}_${qIdx}`;
        const saved = state.quizAnswers[key];
        return `
          <div class="quiz-question">
            <div style="font-weight:600;font-size:0.9rem;">Q${qIdx + 1}. ${escapeHtml(qObj.q)}</div>
            <div class="quiz-options">
              ${qObj.options.map((opt, optIdx) => {
                let cls = "";
                if (saved) {
                  if (optIdx === qObj.answer) cls = "correct";
                  else if (optIdx === saved.selected && !saved.correct) cls = "incorrect";
                }
                return `<button class="quiz-option ${cls}" data-q="${qIdx}" data-opt="${optIdx}">${escapeHtml(opt)}</button>`;
              }).join("")}
            </div>
            <div class="quiz-feedback ${saved ? "show" : ""}" style="background:${saved ? (saved.correct ? "var(--green-soft)" : "var(--red-soft)") : ""};">
              ${saved ? `<strong>${saved.correct ? "✓ Correct!" : "✕ Not quite."}</strong> ${escapeHtml(qObj.explain)}` : ""}
            </div>
          </div>
        `;
      }).join("")}
    `;

    box.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const qIdx = Number(btn.dataset.q);
        const optIdx = Number(btn.dataset.opt);
        const qObj = ch.quiz[qIdx];
        state.quizAnswers[`ch${ch.id}_${qIdx}`] = { selected: optIdx, correct: optIdx === qObj.answer };
        saveState();
        renderChapterQuiz(chId, containerId);
      });
    });
  }

  window.PipelineQuest = {
    CHAPTER_META,
    getState: () => state,
    saveState,
    computeProgress,
    injectTopbarAndModal,
    renderChapterSidebar,
    initConceptAccordions,
    markChapterComplete,
    renderChapterQuiz,
    escapeHtml
  };
})();
