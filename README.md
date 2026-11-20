Here is the complete project split into clean, modular files inside a folder structure. Every chapter is its own standalone HTML file, and shared styles, navigation, quizzes, and `localStorage` progress live in `assets/`.

Because it uses standard relative paths (`data-base="."` / `".."`) and classic `<script>` tags instead of ES modules, it works **both** when opened directly from your folder (`file://`) and when hosted on GitHub Pages or a local server.

### Folder Structure
```text
pipeline-quest/
├── index.html
├── playground.html
├── docs.html
├── exam.html
├── assets/
│   ├── styles.css
│   └── shared.js
└── chapters/
    ├── chapter-1.html
    ├── chapter-2.html
    ├── chapter-3.html
    ├── chapter-4.html
    ├── chapter-5.html
    └── chapter-6.html
```

---

### 1. `assets/styles.css`
```css
/* ==========================================================================
   1. DESIGN TOKENS & THEME VARIABLES
   ========================================================================== */
:root {
  --bg-app: #090e1a;
  --bg-surface: #0f172a;
  --bg-card: rgba(17, 24, 39, 0.78);
  --bg-card-solid: #111827;
  --bg-elevated: #1e293b;
  --bg-terminal: #060a13;
  --border-subtle: rgba(148, 163, 184, 0.16);
  --border-strong: rgba(148, 163, 184, 0.3);

  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;

  --accent-cyan: #06b6d4;
  --accent-blue: #3b82f6;
  --accent-green: #10b981;
  --accent-purple: #8b5cf6;
  --accent-yellow: #f59e0b;
  --accent-red: #ef4444;

  --cyan-soft: rgba(6, 182, 212, 0.14);
  --blue-soft: rgba(59, 130, 246, 0.14);
  --green-soft: rgba(16, 185, 129, 0.14);
  --purple-soft: rgba(139, 92, 246, 0.14);
  --yellow-soft: rgba(245, 158, 11, 0.14);
  --red-soft: rgba(239, 68, 68, 0.14);

  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.25);
  --shadow-md: 0 10px 30px rgba(0, 0, 0, 0.35);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;

  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --nav-height: 64px;
}

[data-theme="light"] {
  --bg-app: #f1f5f9;
  --bg-surface: #ffffff;
  --bg-card: rgba(255, 255, 255, 0.92);
  --bg-card-solid: #ffffff;
  --bg-elevated: #e2e8f0;
  --bg-terminal: #0f172a;
  --border-subtle: rgba(15, 23, 42, 0.12);
  --border-strong: rgba(15, 23, 42, 0.24);

  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #64748b;

  --cyan-soft: rgba(6, 182, 212, 0.12);
  --blue-soft: rgba(59, 130, 246, 0.12);
  --green-soft: rgba(16, 185, 129, 0.12);
  --purple-soft: rgba(139, 92, 246, 0.12);
  --yellow-soft: rgba(245, 158, 11, 0.15);
  --red-soft: rgba(239, 68, 68, 0.12);

  --shadow-sm: 0 2px 8px rgba(15, 23, 42, 0.06);
  --shadow-md: 0 10px 28px rgba(15, 23, 42, 0.08);
}

/* ==========================================================================
   2. RESET & BASE STYLES
   ========================================================================== */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  margin: 0;
  font-family: var(--font-sans);
  background-color: var(--bg-app);
  color: var(--text-primary);
  line-height: 1.6;
  min-height: 100vh;
  transition: background-color 0.25s ease, color 0.25s ease;
}

button, input, select { font-family: inherit; }
code, pre { font-family: var(--font-mono); }
a { color: inherit; text-decoration: none; }

.app-bg-grid {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    linear-gradient(to right, rgba(148, 163, 184, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(148, 163, 184, 0.04) 1px, transparent 1px);
  background-size: 40px 40px;
}

.app-wrapper {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 3rem;
}

/* ==========================================================================
   3. TOP NAVIGATION
   ========================================================================== */
.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--nav-height);
  background: var(--bg-card);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  gap: 1rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.brand-icon {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: rgba(6, 182, 212, 0.14);
  border: 1px solid rgba(6, 182, 212, 0.35);
  display: grid;
  place-items: center;
  color: var(--accent-cyan);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  color: var(--text-primary);
  background: var(--bg-elevated);
}

.nav-btn.active {
  color: var(--accent-cyan);
  background: var(--cyan-soft);
  border-color: rgba(6, 182, 212, 0.28);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.progress-pill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
}

.progress-bar-mini {
  width: 56px;
  height: 6px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.25);
  overflow: hidden;
}

.progress-bar-mini-fill {
  height: 100%;
  background: var(--accent-green);
  width: 0%;
  transition: width 0.35s ease;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  background: var(--bg-surface);
  color: var(--text-primary);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
}

.mobile-menu-toggle { display: none; }

/* ==========================================================================
   4. SHARED CARDS, BUTTONS, BADGES, CALLOUTS
   ========================================================================== */
.card {
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 1.35rem;
  box-shadow: var(--shadow-sm);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.6rem 1.1rem;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn:disabled { opacity: 0.45; cursor: not-allowed; }
.btn-primary { background: var(--accent-blue); color: #ffffff; }
.btn-primary:hover:not(:disabled) { background: #2563eb; transform: translateY(-1px); }
.btn-cyan { background: var(--accent-cyan); color: #06131f; }
.btn-cyan:hover:not(:disabled) { background: #0891b2; color: #ffffff; }
.btn-success { background: var(--accent-green); color: #042016; }
.btn-success:hover:not(:disabled) { background: #059669; color: #ffffff; }
.btn-danger {
  background: var(--red-soft);
  color: var(--accent-red);
  border-color: rgba(239, 68, 68, 0.35);
}
.btn-danger:hover:not(:disabled) { background: var(--accent-red); color: #ffffff; }
.btn-ghost {
  background: var(--bg-elevated);
  color: var(--text-primary);
  border-color: var(--border-subtle);
}
.btn-ghost:hover:not(:disabled) { border-color: var(--accent-cyan); color: var(--accent-cyan); }
.btn-sm { padding: 0.4rem 0.75rem; font-size: 0.8rem; }

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}
.badge-cyan { background: var(--cyan-soft); color: var(--accent-cyan); }
.badge-blue { background: var(--blue-soft); color: var(--accent-blue); }
.badge-green { background: var(--green-soft); color: var(--accent-green); }
.badge-purple { background: var(--purple-soft); color: var(--accent-purple); }
.badge-yellow { background: var(--yellow-soft); color: var(--accent-yellow); }
.badge-red { background: var(--red-soft); color: var(--accent-red); }

.callout {
  padding: 0.9rem 1rem;
  border-radius: var(--radius-md);
  border-left: 3px solid var(--accent-cyan);
  background: var(--cyan-soft);
  font-size: 0.9rem;
  margin: 1rem 0;
}
.callout.warning { border-left-color: var(--accent-yellow); background: var(--yellow-soft); }
.callout.danger { border-left-color: var(--accent-red); background: var(--red-soft); }
.callout.success { border-left-color: var(--accent-green); background: var(--green-soft); }

.sim-disclaimer {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.76rem;
  color: var(--text-secondary);
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
}

/* ==========================================================================
   5. HOMEPAGE
   ========================================================================== */
.hero {
  padding: 2.2rem 0 2rem;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 2rem;
  align-items: center;
}

.hero h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin: 0.75rem 0 1rem;
}

.hero p {
  font-size: 1.06rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin-bottom: 1.5rem;
}

.hero-cta-group { display: flex; flex-wrap: wrap; gap: 0.85rem; align-items: center; }

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.85rem;
  margin-top: 1.75rem;
}

.stat-box {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 0.85rem;
}
.stat-value { font-size: 1.35rem; font-weight: 700; color: var(--accent-cyan); }
.stat-label { font-size: 0.78rem; color: var(--text-secondary); }

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2.25rem 0 1.25rem;
}
.section-header h2 { margin: 0; font-size: 1.5rem; letter-spacing: -0.02em; }
.section-header p { margin: 0.25rem 0 0; color: var(--text-secondary); font-size: 0.92rem; }

.roadmap-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 1rem;
}

.chapter-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.chapter-card:hover { transform: translateY(-3px); border-color: var(--accent-cyan); }
.chapter-card-top { display: flex; justify-content: space-between; align-items: center; }
.chapter-num { font-family: var(--font-mono); font-size: 0.78rem; font-weight: 700; color: var(--accent-cyan); }
.chapter-card h3 { margin: 0.45rem 0 0.35rem; font-size: 1.08rem; }
.chapter-card p { margin: 0; font-size: 0.88rem; color: var(--text-secondary); }
.chapter-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.75rem; }
.tag-pill {
  font-size: 0.72rem;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  background: var(--bg-elevated);
  color: var(--text-secondary);
  font-family: var(--font-mono);
}

/* ==========================================================================
   6. CHAPTER 3-COLUMN LAYOUT & INTERACTIVE ELEMENTS
   ========================================================================== */
.learn-layout {
  display: grid;
  grid-template-columns: 260px minmax(0, 1.35fr) minmax(300px, 0.95fr);
  gap: 1.25rem;
  align-items: start;
}

.sidebar-card {
  position: sticky;
  top: calc(var(--nav-height) + 1rem);
  padding: 1rem;
}

.sidebar-title {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin: 0 0 0.75rem;
  font-weight: 700;
}

.chapter-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.chapter-nav-item {
  width: 100%;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  padding: 0.6rem 0.7rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.84rem;
  transition: all 0.18s ease;
}

.chapter-nav-item:hover { background: var(--bg-elevated); color: var(--text-primary); }
.chapter-nav-item.active {
  background: var(--blue-soft);
  border-color: rgba(59, 130, 246, 0.35);
  color: var(--text-primary);
  font-weight: 600;
}

.chapter-status-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--border-strong);
  flex-shrink: 0;
}
.chapter-status-dot.done {
  background: var(--accent-green);
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
}

.story-banner {
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 1rem 1.1rem;
  margin-bottom: 1.25rem;
}

.story-role {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--accent-purple);
  margin-bottom: 0.3rem;
}

.concept-accordion { display: grid; gap: 0.65rem; margin: 1rem 0 1.4rem; }
.concept-item {
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  overflow: hidden;
}
.concept-trigger {
  width: 100%;
  background: transparent;
  border: none;
  color: var(--text-primary);
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: left;
}
.concept-body {
  display: none;
  padding: 0 1rem 0.95rem;
  font-size: 0.88rem;
  color: var(--text-secondary);
  border-top: 1px solid var(--border-subtle);
}
.concept-item.open .concept-body { display: block; padding-top: 0.85rem; }
.concept-grid { display: grid; gap: 0.45rem; }
.concept-code {
  background: var(--bg-terminal);
  color: #e2e8f0;
  padding: 0.55rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  overflow-x: auto;
  margin: 0.3rem 0 0;
}

.interactive-box {
  border: 1px solid rgba(6, 182, 212, 0.35);
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  padding: 1.1rem;
  margin: 1.25rem 0;
}
.interactive-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}
.interactive-header h3 { margin: 0; font-size: 1.02rem; }

.terminal-window {
  background: var(--bg-terminal);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: var(--radius-md);
  overflow: hidden;
  color: #e2e8f0;
  font-family: var(--font-mono);
  font-size: 0.82rem;
}
.terminal-bar {
  background: #111827;
  padding: 0.5rem 0.85rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
  font-size: 0.76rem;
  color: #94a3b8;
}
.terminal-dots { display: flex; gap: 6px; }
.terminal-dot { width: 10px; height: 10px; border-radius: 50%; }
.terminal-body {
  padding: 0.85rem;
  min-height: 170px;
  max-height: 290px;
  overflow-y: auto;
  white-space: pre-wrap;
  line-height: 1.5;
}
.log-line-cmd { color: #38bdf8; font-weight: 600; }
.log-line-ok { color: #34d399; }
.log-line-err { color: #f87171; }
.log-line-warn { color: #fbbf24; }
.log-line-muted { color: #94a3b8; }

.chapter-footer-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);
}

.right-panel-sticky { position: sticky; top: calc(var(--nav-height) + 1rem); }

/* ==========================================================================
   7. QUIZZES
   ========================================================================== */
.quiz-card {
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 1.1rem;
  background: var(--bg-surface);
  margin-top: 1.35rem;
}
.quiz-question { padding: 0.9rem 0; border-bottom: 1px solid var(--border-subtle); }
.quiz-question:last-of-type { border-bottom: none; }
.quiz-options { display: grid; gap: 0.45rem; margin-top: 0.6rem; }
.quiz-option {
  text-align: left;
  padding: 0.6rem 0.85rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  background: var(--bg-card-solid);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.86rem;
  transition: all 0.15s ease;
}
.quiz-option:hover:not(:disabled) { border-color: var(--accent-cyan); }
.quiz-option.correct {
  background: var(--green-soft);
  border-color: var(--accent-green);
  color: var(--accent-green);
  font-weight: 600;
}
.quiz-option.incorrect {
  background: var(--red-soft);
  border-color: var(--accent-red);
  color: var(--accent-red);
}
.quiz-feedback {
  margin-top: 0.55rem;
  font-size: 0.83rem;
  padding: 0.55rem 0.75rem;
  border-radius: 6px;
  display: none;
}
.quiz-feedback.show { display: block; }

/* ==========================================================================
   8. PIPELINE VISUALIZER & YAML EDITOR
   ========================================================================== */
.pipeline-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.pipeline-btn-group { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
.pipeline-board { display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 1.25rem; align-items: start; }
.pipeline-svg-wrap {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 1rem;
  overflow-x: auto;
}

.pipeline-node { cursor: pointer; }
.pipeline-node rect.node-box {
  fill: var(--bg-card-solid);
  stroke: var(--border-strong);
  stroke-width: 1.6;
  rx: 10;
  transition: all 0.25s ease;
}
.pipeline-node.pending rect.node-box { stroke: var(--accent-yellow); fill: rgba(245, 158, 11, 0.08); }
.pipeline-node.running rect.node-box { stroke: var(--accent-cyan); stroke-width: 2.5; fill: rgba(6, 182, 212, 0.14); }
.pipeline-node.success rect.node-box { stroke: var(--accent-green); fill: rgba(16, 185, 129, 0.12); }
.pipeline-node.failed rect.node-box { stroke: var(--accent-red); fill: rgba(239, 68, 68, 0.15); }

.pipeline-edge { stroke: var(--border-strong); stroke-width: 2.2; fill: none; transition: stroke 0.25s ease; }
.pipeline-edge.active { stroke: var(--accent-cyan); stroke-dasharray: 6 5; animation: flowDash 0.8s linear infinite; }
.pipeline-edge.done { stroke: var(--accent-green); }
.pipeline-edge.error { stroke: var(--accent-red); }
@keyframes flowDash { to { stroke-dashoffset: -22; } }

.yaml-workspace { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; align-items: start; }
.yaml-code-panel {
  background: var(--bg-terminal);
  border-radius: var(--radius-md);
  border: 1px solid rgba(148, 163, 184, 0.22);
  overflow: hidden;
}
.yaml-line {
  display: flex;
  align-items: flex-start;
  padding: 0.22rem 0.85rem;
  font-family: var(--font-mono);
  font-size: 0.83rem;
  cursor: pointer;
  border-left: 3px solid transparent;
  color: #e2e8f0;
  white-space: pre;
}
.yaml-line:hover { background: rgba(56, 189, 248, 0.1); }
.yaml-line.selected { background: rgba(6, 182, 212, 0.18); border-left-color: var(--accent-cyan); }
.yaml-ln { width: 28px; color: #64748b; user-select: none; flex-shrink: 0; }
.yk { color: #7dd3fc; }
.yv { color: #a7f3d0; }
.ys { color: #fde68a; }

.yaml-controls-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem; }
.form-field label { display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.3rem; }
.form-field select, .form-field input {
  width: 100%;
  padding: 0.48rem 0.65rem;
  border-radius: 6px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-surface);
  color: var(--text-primary);
  font-size: 0.84rem;
}

.tab-bar {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 0.75rem;
}
.ref-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; }

/* ==========================================================================
   9. MODAL & RESPONSIVE BREAKPOINTS
   ========================================================================== */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.75);
  backdrop-filter: blur(4px);
  display: none;
  place-items: center;
  padding: 1rem;
  z-index: 200;
}
.modal-backdrop.open { display: grid; }
.modal-box {
  width: 100%;
  max-width: 560px;
  background: var(--bg-card-solid);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
}

@media (max-width: 1100px) {
  .learn-layout { grid-template-columns: 230px minmax(0, 1fr); }
  .right-panel-sticky { grid-column: 1 / -1; position: static; }
  .pipeline-board, .yaml-workspace { grid-template-columns: 1fr; }
}

@media (max-width: 820px) {
  .hero { grid-template-columns: 1fr; }
  .learn-layout { grid-template-columns: 1fr; }
  .sidebar-card { position: static; }
  .nav-links {
    display: none;
    position: absolute;
    top: var(--nav-height);
    left: 0;
    right: 0;
    background: var(--bg-card-solid);
    border-bottom: 1px solid var(--border-subtle);
    padding: 0.75rem 1rem;
    flex-direction: column;
    align-items: stretch;
  }
  .nav-links.open { display: flex; }
  .mobile-menu-toggle { display: grid; }
  .yaml-controls-grid { grid-template-columns: 1fr; }
}
```

---

### 2. `assets/shared.js`
```javascript
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
```

---

### 3. `index.html` (Homepage)
```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pipeline Quest — Learn Git, GitHub Actions &amp; CI/CD</title>
  <link rel="stylesheet" href="assets/styles.css" />
</head>
<body data-base=".">
  <div class="app-bg-grid"></div>
  <div class="app-wrapper">
    <header class="topbar" id="sharedTopbar"></header>

    <main class="container">
      <div class="hero">
        <div>
          <span class="badge badge-cyan">Interactive Story-Driven DevOps Lab</span>
          <h1>From Your First Commit to Production Deployment</h1>
          <p>
            Learn Git, GitHub Actions, CI/CD and DevOps by building, breaking, fixing, and shipping.
            Step into the shoes of a junior software engineer shipping your first production feature.
          </p>
          <div class="hero-cta-group">
            <a class="btn btn-cyan" href="chapters/chapter-1.html">Start Your Journey</a>
            <a class="btn btn-ghost" href="playground.html">Open Pipeline Playground</a>
            <a class="btn btn-ghost" href="docs.html">Command &amp; YAML Reference</a>
          </div>

          <div class="hero-stats">
            <div class="stat-box">
              <div class="stat-value" id="heroChaptersDone">0 / 6</div>
              <div class="stat-label">Story Chapters Completed</div>
            </div>
            <div class="stat-box">
              <div class="stat-value" id="heroQuizScore">0 pts</div>
              <div class="stat-label">Knowledge Check Score</div>
            </div>
            <div class="stat-box">
              <div class="stat-value" id="heroFinalBadge">Pending</div>
              <div class="stat-label">Final Assessment</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
            <div>
              <strong style="font-size:0.95rem;">Live CI/CD Pipeline Preview</strong>
              <div style="font-size:0.78rem;color:var(--text-secondary);">Simulated workflow execution</div>
            </div>
            <button class="btn btn-sm btn-primary" id="heroPreviewRunBtn">Run Preview</button>
          </div>
          <svg viewBox="0 0 440 245" width="100%" aria-label="Pipeline preview diagram">
            <path id="hp-e1" class="pipeline-edge" d="M 110 42 L 160 42" />
            <path id="hp-e2" class="pipeline-edge" d="M 275 42 L 325 42" />
            <path id="hp-e3" class="pipeline-edge" d="M 380 68 L 380 104" />
            <path id="hp-e4" class="pipeline-edge" d="M 325 130 L 275 130" />
            <path id="hp-e5" class="pipeline-edge" d="M 160 130 L 110 130" />
            <path id="hp-e6" class="pipeline-edge" d="M 60 156 L 60 192" />
            <path id="hp-e7" class="pipeline-edge" d="M 110 215 L 180 215" />

            <g id="hp-n0" class="pipeline-node"><rect class="node-box" x="10" y="18" width="100" height="48"/><text x="60" y="46" text-anchor="middle" fill="currentColor" font-size="11" font-weight="600">Developer</text></g>
            <g id="hp-n1" class="pipeline-node"><rect class="node-box" x="160" y="18" width="115" height="48"/><text x="217" y="46" text-anchor="middle" fill="currentColor" font-size="11" font-weight="600">Git Commit/Push</text></g>
            <g id="hp-n2" class="pipeline-node"><rect class="node-box" x="325" y="18" width="105" height="48"/><text x="377" y="46" text-anchor="middle" fill="currentColor" font-size="11" font-weight="600">GitHub Repo</text></g>
            <g id="hp-n3" class="pipeline-node"><rect class="node-box" x="325" y="106" width="105" height="48"/><text x="377" y="134" text-anchor="middle" fill="currentColor" font-size="11" font-weight="600">Actions Trigger</text></g>
            <g id="hp-n4" class="pipeline-node"><rect class="node-box" x="160" y="106" width="115" height="48"/><text x="217" y="134" text-anchor="middle" fill="currentColor" font-size="11" font-weight="600">Build &amp; Deps</text></g>
            <g id="hp-n5" class="pipeline-node"><rect class="node-box" x="10" y="106" width="100" height="48"/><text x="60" y="134" text-anchor="middle" fill="currentColor" font-size="11" font-weight="600">Auto Tests</text></g>
            <g id="hp-n6" class="pipeline-node"><rect class="node-box" x="10" y="191" width="100" height="48"/><text x="60" y="219" text-anchor="middle" fill="currentColor" font-size="11" font-weight="600">Deploy Gate</text></g>
            <g id="hp-n7" class="pipeline-node"><rect class="node-box" x="180" y="191" width="250" height="48"/><text x="305" y="219" text-anchor="middle" fill="currentColor" font-size="11" font-weight="700">Production Live 🚀</text></g>
          </svg>
          <div id="heroPreviewStatus" style="margin-top:0.65rem;font-size:0.82rem;color:var(--text-secondary);">
            Click <strong>Run Preview</strong> to watch code flow from commit to production.
          </div>
        </div>
      </div>

      <div class="section-header">
        <div>
          <h2>Story Learning Roadmap</h2>
          <p>Open any chapter file, complete interactive missions, and verify your skills.</p>
        </div>
        <a class="btn btn-ghost btn-sm" href="exam.html">Take Final Assessment (10 Qs)</a>
      </div>

      <div class="roadmap-grid" id="homeChapterCards"></div>
    </main>
  </div>

  <script src="assets/shared.js"></script>
  <script>
    (function () {
      const PQ = window.PipelineQuest;
      PQ.injectTopbarAndModal("home");

      const state = PQ.getState();
      const { chCount, quizCorrect } = PQ.computeProgress();
      document.getElementById("heroChaptersDone").textContent = `${chCount} / 6`;
      document.getElementById("heroQuizScore").textContent = `${quizCorrect * 10} pts`;
      if (state.finalExamSubmitted) {
        document.getElementById("heroFinalBadge").textContent = "Completed ✓";
      }

      document.getElementById("homeChapterCards").innerHTML = PQ.CHAPTER_META.map((ch) => {
        const isDone = state.completedChapters.includes(ch.id);
        return `
          <a class="card chapter-card" href="${ch.file}">
            <div>
              <div class="chapter-card-top">
                <span class="chapter-num">CHAPTER 0${ch.id}</span>
                ${isDone ? '<span class="badge badge-green">✓ Completed</span>' : '<span class="badge badge-blue">Interactive Mission</span>'}
              </div>
              <h3>${ch.shortTitle}</h3>
              <p>${ch.summary}</p>
              <div class="chapter-tags">
                ${ch.tags.map((t) => `<span class="tag-pill">${t}</span>`).join("")}
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding-top:0.5rem;border-top:1px solid var(--border-subtle);">
              <span style="font-size:0.8rem;color:var(--text-secondary);">${ch.quiz.length} Knowledge Checks</span>
              <span style="font-size:0.85rem;font-weight:600;color:var(--accent-cyan);">Enter Chapter →</span>
            </div>
          </a>
        `;
      }).join("");

      let timer = null;
      document.getElementById("heroPreviewRunBtn").addEventListener("click", () => {
        clearInterval(timer);
        const nodes = Array.from({ length: 8 }, (_, i) => document.getElementById(`hp-n${i}`));
        const edges = Array.from({ length: 7 }, (_, i) => document.getElementById(`hp-e${i + 1}`));
        const statusEl = document.getElementById("heroPreviewStatus");
        const labels = [
          "Developer updates ProfileBadge.js locally...",
          "Git commit recorded & pushed to feature branch...",
          "GitHub repository receives push & PR event...",
          "GitHub Actions triggers CI workflow on ubuntu-latest...",
          "Dependencies installed & app built cleanly...",
          "All 24 unit & integration tests passed...",
          "Approval gate verified for production environment...",
          "Deployment complete! Feature is live in Production 🚀"
        ];
        nodes.forEach((n) => n.setAttribute("class", "pipeline-node"));
        edges.forEach((e) => e.setAttribute("class", "pipeline-edge"));
        let step = 0;
        nodes[0].setAttribute("class", "pipeline-node running");
        statusEl.innerHTML = `<span class="badge badge-cyan">Running</span> ${labels[0]}`;
        timer = setInterval(() => {
          nodes[step].setAttribute("class", "pipeline-node success");
          if (step < edges.length) edges[step].setAttribute("class", "pipeline-edge done");
          step++;
          if (step >= nodes.length) {
            clearInterval(timer);
            statusEl.innerHTML = `<span class="badge badge-green">Success</span> ${labels[7]}`;
            return;
          }
          nodes[step].setAttribute("class", "pipeline-node running");
          if (step - 1 < edges.length) edges[step - 1].setAttribute("class", "pipeline-edge active");
          statusEl.innerHTML = `<span class="badge badge-cyan">Step ${step + 1}/8</span> ${labels[step]}`;
        }, 620);
      });
    })();
  </script>
</body>
</html>
```

---

### 4. `chapters/chapter-1.html`
```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Chapter 1: Git — The Beginning | Pipeline Quest</title>
  <link rel="stylesheet" href="../assets/styles.css" />
</head>
<body data-base="..">
  <div class="app-bg-grid"></div>
  <div class="app-wrapper">
    <header class="topbar" id="sharedTopbar"></header>

    <main class="container">
      <div class="learn-layout">
        <aside class="card sidebar-card" id="chapterSidebar"></aside>

        <article class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
            <span class="badge badge-cyan">Chapter 1 of 6</span>
            <span id="chapterStatusBadge" class="badge badge-yellow">Mission Active</span>
          </div>
          <h2 style="margin:0.5rem 0 0.75rem;">Chapter 1: Git — The Beginning</h2>

          <div class="story-banner">
            <div class="story-role">Day 1 · Onboarding as Junior Software Engineer</div>
            <div>You just joined the Checkout Team at NovaCommerce. Your tech lead assigns your first ticket: add a user profile badge to the header. Before writing code, you need to set up your Git workspace safely.</div>
          </div>

          <h3 style="margin:0 0 0.5rem;font-size:1rem;">Core Concepts</h3>
          <div class="concept-accordion">
            <div class="concept-item open">
              <button class="concept-trigger" type="button"><span>Git vs. GitHub</span><span>▾</span></button>
              <div class="concept-body"><div class="concept-grid">
                <div><strong>What it means:</strong> Git is a local version control tool tracking code history. GitHub is a cloud platform hosting Git repos with Pull Requests and Actions.</div>
                <div><strong>Why developers use it:</strong> Prevents overwriting teammates' work and enables remote team collaboration.</div>
                <pre class="concept-code">git init   # tracks project locally before pushing to GitHub</pre>
              </div></div>
            </div>
            <div class="concept-item">
              <button class="concept-trigger" type="button"><span>Repository, Working Directory &amp; Staging Area</span><span>▾</span></button>
              <div class="concept-body"><div class="concept-grid">
                <div><strong>What it means:</strong> A repository stores project history. The working directory holds files you edit; the staging area prepares selected changes for the next commit.</div>
                <div><strong>Why developers use it:</strong> Lets you group clean, related edits together instead of committing half-finished debug code.</div>
                <pre class="concept-code">git add src/ProfileBadge.js</pre>
              </div></div>
            </div>
            <div class="concept-item">
              <button class="concept-trigger" type="button"><span>Commit, Main Branch &amp; Feature Branch</span><span>▾</span></button>
              <div class="concept-body"><div class="concept-grid">
                <div><strong>What it means:</strong> A commit is a permanent snapshot. <code>main</code> holds stable production code; a feature branch isolates one task.</div>
                <div><strong>Why developers use it:</strong> Keeps <code>main</code> always deployable while you build and test.</div>
                <pre class="concept-code">git checkout -b feat/user-profile</pre>
              </div></div>
            </div>
          </div>

          <div class="interactive-box">
            <div class="interactive-header">
              <h3>Interactive Mission: Choose Your Git Workflow</h3>
              <span class="sim-disclaimer">Visual Git Workspace</span>
            </div>
            <p style="font-size:0.88rem;color:var(--text-secondary);margin-top:0;">
              Your working directory has <code>src/ProfileBadge.js</code>. How will you start?
            </p>
            <div style="display:flex;flex-wrap:wrap;gap:0.65rem;margin-bottom:0.85rem;">
              <button class="btn btn-danger btn-sm" id="ch1MainBtn">Option A: Edit directly on main</button>
              <button class="btn btn-success btn-sm" id="ch1BranchBtn">Option B: Create feature branch (feat/user-profile)</button>
            </div>
            <div id="ch1Feedback"></div>
          </div>

          <div class="quiz-card" id="chapterQuizBox"></div>

          <div class="chapter-footer-nav">
            <a class="btn btn-ghost" href="../index.html">← Overview</a>
            <a class="btn btn-primary" href="chapter-2.html">Next: Chapter 2 →</a>
          </div>
        </article>

        <aside class="card right-panel-sticky" id="ch1RightPanel"></aside>
      </div>
    </main>
  </div>

  <script src="../assets/shared.js"></script>
  <script>
    (function () {
      const PQ = window.PipelineQuest;
      const state = PQ.getState();
      PQ.injectTopbarAndModal("chapters");
      PQ.renderChapterSidebar(1);
      PQ.initConceptAccordions();
      PQ.renderChapterQuiz(1);
      if (state.completedChapters.includes(1)) PQ.markChapterComplete(1);

      function renderDiagram(choice) {
        const isBranch = choice === "branch";
        const isMain = choice === "main";
        document.getElementById("ch1RightPanel").innerHTML = `
          <span class="badge badge-purple">Live Git Branch Diagram</span>
          <h3 style="margin:0.5rem 0 0.75rem;font-size:1rem;">Repository Graph</h3>
          <svg viewBox="0 0 320 200" width="100%" style="background:var(--bg-surface);border-radius:10px;border:1px solid var(--border-subtle);">
            <line x1="35" y1="55" x2="285" y2="55" stroke="#3b82f6" stroke-width="3" />
            <circle cx="50" cy="55" r="8" fill="#3b82f6" />
            <circle cx="125" cy="55" r="8" fill="#3b82f6" />
            ${isMain ? `<circle cx="215" cy="55" r="9" fill="#ef4444" /><text x="215" y="34" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="700">Unsafe Commit!</text>` : ""}
            <rect x="20" y="18" width="54" height="20" rx="5" fill="#1d4ed8" />
            <text x="47" y="32" text-anchor="middle" fill="#fff" font-size="10" font-weight="700">main</text>
            ${isBranch ? `
              <path d="M 125 55 C 145 55, 145 130, 175 130 L 270 130" fill="none" stroke="#10b981" stroke-width="3" />
              <circle cx="190" cy="130" r="8" fill="#10b981" />
              <circle cx="255" cy="130" r="8" fill="#10b981" />
              <rect x="165" y="150" width="122" height="22" rx="5" fill="#047857" />
              <text x="226" y="165" text-anchor="middle" fill="#fff" font-size="10" font-weight="700">feat/user-profile</text>
            ` : `<text x="160" y="135" text-anchor="middle" fill="#64748b" font-size="11">Select an option on the left</text>`}
          </svg>
        `;
      }

      function choose(choice) {
        state.ch1Choice = choice;
        const fb = document.getElementById("ch1Feedback");
        if (choice === "main") {
          fb.innerHTML = `<div class="callout danger"><strong>Risky Choice!</strong> Editing directly on <code>main</code> mixes untested work into production-ready code. Create a feature branch instead!</div>`;
        } else {
          PQ.markChapterComplete(1);
          fb.innerHTML = `<div class="callout success"><strong>Great Decision!</strong> <code>git checkout -b feat/user-profile</code> isolates your changes while keeping <code>main</code> clean.</div>`;
        }
        renderDiagram(choice);
        PQ.saveState();
      }

      document.getElementById("ch1MainBtn").addEventListener("click", () => choose("main"));
      document.getElementById("ch1BranchBtn").addEventListener("click", () => choose("branch"));
      if (state.ch1Choice) choose(state.ch1Choice);
      else renderDiagram(null);
    })();
  </script>
</body>
</html>
```

---

### 5. `chapters/chapter-2.html`
```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Chapter 2: Commit and Push | Pipeline Quest</title>
  <link rel="stylesheet" href="../assets/styles.css" />
</head>
<body data-base="..">
  <div class="app-bg-grid"></div>
  <div class="app-wrapper">
    <header class="topbar" id="sharedTopbar"></header>

    <main class="container">
      <div class="learn-layout">
        <aside class="card sidebar-card" id="chapterSidebar"></aside>

        <article class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
            <span class="badge badge-cyan">Chapter 2 of 6</span>
            <span id="chapterStatusBadge" class="badge badge-yellow">Mission Active</span>
          </div>
          <h2 style="margin:0.5rem 0 0.75rem;">Chapter 2: Commit and Push</h2>

          <div class="story-banner">
            <div class="story-role">Day 1 · Afternoon — Sharing Your Work</div>
            <div>Your feature is ready locally on <code>feat/user-profile</code>, but your teammates and CI server cannot see it until you stage, commit, and push it to GitHub (<code>origin</code>).</div>
          </div>

          <h3 style="margin:0 0 0.5rem;font-size:1rem;">Core Concepts</h3>
          <div class="concept-accordion">
            <div class="concept-item open">
              <button class="concept-trigger" type="button"><span>Local vs. Remote Repository (origin) &amp; Pull/Push</span><span>▾</span></button>
              <div class="concept-body"><div class="concept-grid">
                <div><strong>What it means:</strong> Your local repo lives on your machine; <code>origin</code> is the remote repository on GitHub. <code>git push</code> uploads commits; <code>git pull</code> downloads teammates' commits.</div>
                <div><strong>Why developers use it:</strong> Fast offline commits locally, synchronized collaboration via GitHub.</div>
                <pre class="concept-code">git push -u origin feat/user-profile</pre>
              </div></div>
            </div>
            <div class="concept-item">
              <button class="concept-trigger" type="button"><span>git status, git add, git commit, git push</span><span>▾</span></button>
              <div class="concept-body"><div class="concept-grid">
                <div><strong>What it means:</strong> Inspect changes (<code>status</code>), stage files (<code>add</code>), record a snapshot (<code>commit</code>), and upload to GitHub (<code>push</code>).</div>
                <pre class="concept-code">git status && git add . && git commit -m "feat: add badge" && git push</pre>
              </div></div>
            </div>
          </div>

          <div class="interactive-box">
            <div class="interactive-header">
              <h3>Interactive Mission: Simulated Git Terminal</h3>
              <button class="btn btn-ghost btn-sm" id="ch2ResetBtn">↺ Reset Terminal</button>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:0.45rem;margin-bottom:0.85rem;">
              <button class="btn btn-ghost btn-sm" id="cmdStatusBtn">1. git status</button>
              <button class="btn btn-ghost btn-sm" id="cmdAddBtn">2. git add .</button>
              <button class="btn btn-ghost btn-sm" id="cmdCommitBtn">3. git commit -m "feat: add badge"</button>
              <button class="btn btn-cyan btn-sm" id="cmdPushBtn">4. git push -u origin feat/user-profile</button>
            </div>
            <div class="terminal-window">
              <div class="terminal-bar"><span>bash — ~/novacommerce/web-app (feat/user-profile)</span></div>
              <div class="terminal-body" id="ch2TermBody"></div>
            </div>
          </div>

          <div class="quiz-card" id="chapterQuizBox"></div>

          <div class="chapter-footer-nav">
            <a class="btn btn-ghost" href="chapter-1.html">← Chapter 1</a>
            <a class="btn btn-primary" href="chapter-3.html">Next: Chapter 3 →</a>
          </div>
        </article>

        <aside class="card right-panel-sticky" id="ch2RightPanel"></aside>
      </div>
    </main>
  </div>

  <script src="../assets/shared.js"></script>
  <script>
    (function () {
      const PQ = window.PipelineQuest;
      const state = PQ.getState();
      PQ.injectTopbarAndModal("chapters");
      PQ.renderChapterSidebar(2);
      PQ.initConceptAccordions();
      PQ.renderChapterQuiz(2);
      if (state.completedChapters.includes(2)) PQ.markChapterComplete(2);

      function renderRight() {
        const s = state.ch2Step;
        document.getElementById("ch2RightPanel").innerHTML = `
          <span class="badge badge-cyan">Local ↔ Remote Sync Visualizer</span>
          <h3 style="margin:0.5rem 0 0.75rem;font-size:1rem;">Commit Journey</h3>
          <svg viewBox="0 0 320 220" width="100%" style="background:var(--bg-surface);border-radius:10px;border:1px solid var(--border-subtle);">
            <rect x="15" y="20" width="125" height="175" rx="10" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" />
            <text x="77" y="42" text-anchor="middle" fill="currentColor" font-size="11" font-weight="700">Local Machine</text>
            <rect x="28" y="58" width="99" height="32" rx="6" fill="${s >= 1 ? "rgba(245,158,11,0.2)" : "rgba(148,163,184,0.1)"}" stroke="${s >= 1 ? "#f59e0b" : "#475569"}" />
            <text x="77" y="78" text-anchor="middle" fill="currentColor" font-size="10">Working Dir</text>
            <rect x="28" y="102" width="99" height="32" rx="6" fill="${s >= 2 ? "rgba(6,182,212,0.2)" : "rgba(148,163,184,0.1)"}" stroke="${s >= 2 ? "#06b6d4" : "#475569"}" />
            <text x="77" y="122" text-anchor="middle" fill="currentColor" font-size="10">Staging Area</text>
            <rect x="28" y="146" width="99" height="32" rx="6" fill="${s >= 3 ? "rgba(16,185,129,0.22)" : "rgba(148,163,184,0.1)"}" stroke="${s >= 3 ? "#10b981" : "#475569"}" />
            <text x="77" y="166" text-anchor="middle" fill="currentColor" font-size="10">Local Repo</text>
            <path d="M 142 162 L 185 162" stroke="${s >= 4 ? "#10b981" : "#475569"}" stroke-width="3" stroke-dasharray="${s >= 4 ? "0" : "4 4"}" />
            <text x="163" y="150" text-anchor="middle" fill="${s >= 4 ? "#10b981" : "#94a3b8"}" font-size="9" font-weight="700">git push</text>
            <rect x="188" y="55" width="118" height="140" rx="10" fill="${s >= 4 ? "rgba(16,185,129,0.12)" : "rgba(148,163,184,0.06)"}" stroke="${s >= 4 ? "#10b981" : "#475569"}" />
            <text x="247" y="80" text-anchor="middle" fill="currentColor" font-size="11" font-weight="700">GitHub (origin)</text>
            <circle cx="247" cy="132" r="18" fill="${s >= 4 ? "#10b981" : "#334155"}" />
            <text x="247" y="136" text-anchor="middle" fill="#fff" font-size="10" font-weight="700">${s >= 4 ? "Synced" : "Empty"}</text>
          </svg>
        `;
      }

      const termBody = document.getElementById("ch2TermBody");
      function renderHistory() {
        const lines = ['<span class="log-line-muted"># Simulated terminal ready. Run commands step by step:</span>'];
        if (state.ch2Step >= 1) lines.push('<span class="log-line-cmd">$ git status</span>\n<span class="log-line-warn">Untracked: src/ProfileBadge.js</span>');
        if (state.ch2Step >= 2) lines.push('<span class="log-line-cmd">$ git add .</span>\n<span class="log-line-ok">✓ Staged src/ProfileBadge.js</span>');
        if (state.ch2Step >= 3) lines.push('<span class="log-line-cmd">$ git commit -m "feat: add badge"</span>\n<span class="log-line-ok">[feat/user-profile a8f3c21] feat: add badge</span>');
        if (state.ch2Step >= 4) lines.push('<span class="log-line-cmd">$ git push -u origin feat/user-profile</span>\n<span class="log-line-ok">* [new branch] feat/user-profile -> origin/feat/user-profile</span>');
        termBody.innerHTML = lines.join("\n");
        termBody.scrollTop = termBody.scrollHeight;
        renderRight();
      }

      function step(target, prevReq, msg) {
        if (state.ch2Step < prevReq) {
          termBody.innerHTML += `\n<span class="log-line-err">${msg}</span>`;
          return;
        }
        if (state.ch2Step < target) state.ch2Step = target;
        if (state.ch2Step === 4) PQ.markChapterComplete(2);
        PQ.saveState();
        renderHistory();
      }

      document.getElementById("cmdStatusBtn").addEventListener("click", () => step(1, 0, ""));
      document.getElementById("cmdAddBtn").addEventListener("click", () => step(2, 1, "Run git status first."));
      document.getElementById("cmdCommitBtn").addEventListener("click", () => step(3, 2, "Run git add . before committing."));
      document.getElementById("cmdPushBtn").addEventListener("click", () => step(4, 3, "Run git commit before pushing."));
      document.getElementById("ch2ResetBtn").addEventListener("click", () => {
        state.ch2Step = 0;
        PQ.saveState();
        renderHistory();
      });

      renderHistory();
    })();
  </script>
</body>
</html>
```

---

### 6. `chapters/chapter-3.html`
```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Chapter 3: GitHub Actions — Automation Begins | Pipeline Quest</title>
  <link rel="stylesheet" href="../assets/styles.css" />
</head>
<body data-base="..">
  <div class="app-bg-grid"></div>
  <div class="app-wrapper">
    <header class="topbar" id="sharedTopbar"></header>

    <main class="container">
      <div class="learn-layout">
        <aside class="card sidebar-card" id="chapterSidebar"></aside>

        <article class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
            <span class="badge badge-cyan">Chapter 3 of 6</span>
            <span id="chapterStatusBadge" class="badge badge-yellow">Mission Active</span>
          </div>
          <h2 style="margin:0.5rem 0 0.75rem;">Chapter 3: GitHub Actions — Automation Begins</h2>

          <div class="story-banner">
            <div class="story-role">Day 2 · Opening Your Pull Request</div>
            <div>Your branch reached GitHub and you opened a Pull Request. Instantly, a workflow defined inside <code>.github/workflows/ci.yml</code> starts running without anyone clicking a manual test button.</div>
          </div>

          <h3 style="margin:0 0 0.5rem;font-size:1rem;">Core Concepts</h3>
          <div class="concept-accordion">
            <div class="concept-item open">
              <button class="concept-trigger" type="button"><span>GitHub Actions, Workflows &amp; .github/workflows/</span><span>▾</span></button>
              <div class="concept-body"><div class="concept-grid">
                <div><strong>What it means:</strong> GitHub Actions automates CI/CD directly inside GitHub using YAML workflow files stored in <code>.github/workflows/</code>.</div>
                <pre class="concept-code">.github/workflows/ci.yml</pre>
              </div></div>
            </div>
            <div class="concept-item">
              <button class="concept-trigger" type="button"><span>Event Triggers (push, pull_request, workflow_dispatch)</span><span>▾</span></button>
              <div class="concept-body"><div class="concept-grid">
                <div><strong>What it means:</strong> The <code>on:</code> key defines what starts a workflow: pushing commits, opening/updating a Pull Request, or clicking Run manually.</div>
                <pre class="concept-code">on:
  push:
    branches: [main]
  pull_request:
  workflow_dispatch:</pre>
              </div></div>
            </div>
          </div>

          <div class="interactive-box">
            <div class="interactive-header">
              <h3>Interactive Mission: Select an Event Trigger</h3>
              <span class="sim-disclaimer">.github/workflows/ci.yml</span>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.9rem;">
              <button class="btn btn-sm btn-ghost" data-trig="push">Event: push (to main)</button>
              <button class="btn btn-sm btn-ghost" data-trig="pull_request">Event: pull_request</button>
              <button class="btn btn-sm btn-ghost" data-trig="workflow_dispatch">Event: workflow_dispatch (Manual)</button>
            </div>
            <div id="ch3TriggerResult"></div>
          </div>

          <div class="quiz-card" id="chapterQuizBox"></div>

          <div class="chapter-footer-nav">
            <a class="btn btn-ghost" href="chapter-2.html">← Chapter 2</a>
            <a class="btn btn-primary" href="chapter-4.html">Next: Chapter 4 →</a>
          </div>
        </article>

        <aside class="card right-panel-sticky" id="ch3RightPanel"></aside>
      </div>
    </main>
  </div>

  <script src="../assets/shared.js"></script>
  <script>
    (function () {
      const PQ = window.PipelineQuest;
      const state = PQ.getState();
      PQ.injectTopbarAndModal("chapters");
      PQ.renderChapterSidebar(3);
      PQ.initConceptAccordions();
      PQ.renderChapterQuiz(3);
      if (state.completedChapters.includes(3)) PQ.markChapterComplete(3);

      const map = {
        push: ["Push Event Detected", "Commits landed on `main`. GitHub matches `on.push.branches: [main]` and runs post-merge checks/deployment."],
        pull_request: ["Pull Request Event Detected", "PR #42 was opened or updated. GitHub runs CI checks and reports status directly on the PR."],
        workflow_dispatch: ["Manual Dispatch Triggered", "An engineer clicked 'Run workflow' in GitHub Actions for an on-demand run."]
      };

      function selectTrigger(trig) {
        state.ch3Trigger = trig;
        PQ.markChapterComplete(3);
        const [title, desc] = map[trig];
        document.getElementById("ch3TriggerResult").innerHTML = `
          <div class="callout success"><span class="badge badge-green">${title}</span><p style="margin:0.45rem 0 0;">${desc}</p></div>
        `;
        document.querySelectorAll("[data-trig]").forEach((b) => {
          b.className = `btn btn-sm ${b.dataset.trig === trig ? "btn-cyan" : "btn-ghost"}`;
        });
        document.getElementById("ch3RightPanel").innerHTML = `
          <span class="badge badge-purple">Workflow Trigger Anatomy</span>
          <h3 style="margin:0.5rem 0 0.75rem;font-size:1rem;">.github/workflows/ci.yml</h3>
          <pre class="concept-code">name: CI Pipeline
on:
  push:
    branches: [main]
  pull_request:
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test</pre>
          <div class="callout" style="font-size:0.83rem;"><strong>Active Trigger:</strong> <code>${trig}</code></div>
        `;
        PQ.saveState();
      }

      document.querySelectorAll("[data-trig]").forEach((b) => b.addEventListener("click", () => selectTrigger(b.dataset.trig)));
      selectTrigger(state.ch3Trigger || "pull_request");
    })();
  </script>
</body>
</html>
```

---

### 7. `chapters/chapter-4.html`
```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Chapter 4: Jobs, Steps and Runners | Pipeline Quest</title>
  <link rel="stylesheet" href="../assets/styles.css" />
</head>
<body data-base="..">
  <div class="app-bg-grid"></div>
  <div class="app-wrapper">
    <header class="topbar" id="sharedTopbar"></header>

    <main class="container">
      <div class="learn-layout">
        <aside class="card sidebar-card" id="chapterSidebar"></aside>

        <article class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
            <span class="badge badge-cyan">Chapter 4 of 6</span>
            <span id="chapterStatusBadge" class="badge badge-yellow">Mission Active</span>
          </div>
          <h2 style="margin:0.5rem 0 0.75rem;">Chapter 4: Jobs, Steps and Runners</h2>

          <div class="story-banner">
            <div class="story-role">Day 2 · Inside the CI Server</div>
            <div>Your workflow triggered! GitHub provisions a fresh <code>ubuntu-latest</code> virtual machine runner to check out your repository, install Node.js, install packages, run tests, and build your app.</div>
          </div>

          <h3 style="margin:0 0 0.5rem;font-size:1rem;">Core Concepts</h3>
          <div class="concept-accordion">
            <div class="concept-item open">
              <button class="concept-trigger" type="button"><span>Workflows, Jobs, Job Dependencies &amp; Steps</span><span>▾</span></button>
              <div class="concept-body"><div class="concept-grid">
                <div><strong>What it means:</strong> Workflows hold jobs (which run in parallel unless ordered via <code>needs:</code>). Jobs hold sequential steps (`uses:` actions or `run:` shell commands).</div>
                <pre class="concept-code">jobs:
  build:
    needs: test
    runs-on: ubuntu-latest</pre>
              </div></div>
            </div>
            <div class="concept-item">
              <button class="concept-trigger" type="button"><span>Runners, actions/checkout &amp; actions/setup-node</span><span>▾</span></button>
              <div class="concept-body"><div class="concept-grid">
                <div><strong>What it means:</strong> GitHub-hosted runners start completely empty. <code>actions/checkout@v4</code> clones your code; <code>actions/setup-node@v4</code> installs Node.js.</div>
                <pre class="concept-code">- uses: actions/checkout@v4
- uses: actions/setup-node@v4
  with:
    node-version: 22</pre>
              </div></div>
            </div>
          </div>

          <div class="interactive-box">
            <div class="interactive-header">
              <h3>Interactive Mission: Execute Runner Stages</h3>
              <button class="btn btn-cyan btn-sm" id="ch4RunBtn">▶ Run Pipeline</button>
            </div>
            <div id="ch4StageList" style="display:grid;gap:0.45rem;margin-bottom:0.85rem;"></div>
            <div class="terminal-window">
              <div class="terminal-bar"><span>Runner: ubuntu-latest</span><span id="ch4StatusBadge" class="badge badge-yellow">Ready</span></div>
              <div class="terminal-body" id="ch4LogBody">Click "Run Pipeline" to watch all 5 steps execute with simulated logs.</div>
            </div>
          </div>

          <div class="quiz-card" id="chapterQuizBox"></div>

          <div class="chapter-footer-nav">
            <a class="btn btn-ghost" href="chapter-3.html">← Chapter 3</a>
            <a class="btn btn-primary" href="chapter-5.html">Next: Chapter 5 →</a>
          </div>
        </article>

        <aside class="card right-panel-sticky">
          <span class="badge badge-blue">Runner Architecture</span>
          <h3 style="margin:0.5rem 0 0.75rem;font-size:1rem;">Inside ubuntu-latest</h3>
          <ul style="font-size:0.84rem;color:var(--text-secondary);padding-left:1.2rem;display:grid;gap:0.5rem;">
            <li><strong>Fresh VM:</strong> Zero leftover files from other runs.</li>
            <li><strong>actions/checkout@v4:</strong> Clones repo into <code>$GITHUB_WORKSPACE</code>.</li>
            <li><strong>actions/setup-node@v4:</strong> Pins exact Node.js v22 runtime.</li>
            <li><strong>npm ci:</strong> Clean deterministic install from lockfile.</li>
            <li><strong>Fail-fast:</strong> Non-zero exit code stops later steps immediately.</li>
          </ul>
        </aside>
      </div>
    </main>
  </div>

  <script src="../assets/shared.js"></script>
  <script>
    (function () {
      const PQ = window.PipelineQuest;
      const state = PQ.getState();
      PQ.injectTopbarAndModal("chapters");
      PQ.renderChapterSidebar(4);
      PQ.initConceptAccordions();
      PQ.renderChapterQuiz(4);
      if (state.completedChapters.includes(4)) PQ.markChapterComplete(4);

      const stages = [
        { name: "1. Checkout code", cmd: "uses: actions/checkout@v4", log: "Cloned novacommerce/web-app@a8f3c21 into runner workspace." },
        { name: "2. Set up Node.js", cmd: "uses: actions/setup-node@v4 (v22)", log: "Node.js v22.11.0 & npm v10.9.0 added to PATH." },
        { name: "3. Install dependencies", cmd: "run: npm ci", log: "Installed 412 locked packages in 4.2s." },
        { name: "4. Run tests", cmd: "run: npm test", log: "PASS src/ProfileBadge.test.js (12 tests passed)" },
        { name: "5. Build application", cmd: "run: npm run build", log: "vite build complete -> dist/assets/index.js (48.2 kB)" }
      ];

      function renderStages(activeIdx, doneCount) {
        document.getElementById("ch4StageList").innerHTML = stages.map((st, idx) => {
          let badge = '<span class="badge badge-yellow">Pending</span>';
          if (idx < doneCount) badge = '<span class="badge badge-green">✓ Done</span>';
          else if (idx === activeIdx) badge = '<span class="badge badge-cyan">⟳ Running</span>';
          return `<div style="display:flex;justify-content:space-between;align-items:center;padding:0.5rem 0.75rem;border:1px solid var(--border-subtle);border-radius:8px;background:var(--bg-card-solid);">
            <div><strong style="font-size:0.86rem;">${st.name}</strong><div style="font-size:0.75rem;font-family:var(--font-mono);color:var(--text-muted);">${st.cmd}</div></div>${badge}</div>`;
        }).join("");
      }

      renderStages(-1, state.interactiveDone[4] ? 5 : 0);

      let timer = null;
      document.getElementById("ch4RunBtn").addEventListener("click", () => {
        clearInterval(timer);
        const logBody = document.getElementById("ch4LogBody");
        const badge = document.getElementById("ch4StatusBadge");
        badge.className = "badge badge-cyan";
        badge.textContent = "Running";
        logBody.innerHTML = '<span class="log-line-muted">[runner] Provisioned ubuntu-latest VM...</span>\n';
        let idx = 0;
        renderStages(0, 0);
        timer = setInterval(() => {
          const st = stages[idx];
          logBody.innerHTML += `\n<span class="log-line-cmd">##[group] ${st.name}</span>\n<span class="log-line-ok">${st.log}</span>\n`;
          logBody.scrollTop = logBody.scrollHeight;
          idx++;
          if (idx >= stages.length) {
            clearInterval(timer);
            renderStages(-1, 5);
            badge.className = "badge badge-green";
            badge.textContent = "Succeeded";
            PQ.markChapterComplete(4);
          } else {
            renderStages(idx, idx);
          }
        }, 620);
      });
    })();
  </script>
</body>
</html>
```

---

### 8. `chapters/chapter-5.html`
```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Chapter 5: Testing — Something Goes Wrong! | Pipeline Quest</title>
  <link rel="stylesheet" href="../assets/styles.css" />
</head>
<body data-base="..">
  <div class="app-bg-grid"></div>
  <div class="app-wrapper">
    <header class="topbar" id="sharedTopbar"></header>

    <main class="container">
      <div class="learn-layout">
        <aside class="card sidebar-card" id="chapterSidebar"></aside>

        <article class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
            <span class="badge badge-cyan">Chapter 5 of 6</span>
            <span id="chapterStatusBadge" class="badge badge-yellow">Mission Active</span>
          </div>
          <h2 style="margin:0.5rem 0 0.75rem;">Chapter 5: Testing — Something Goes Wrong!</h2>

          <div class="story-banner">
            <div class="story-role">Day 3 · Bug Caught Before Production</div>
            <div>You refactored the cart discount helper and pushed. Moments later, GitHub turns red ❌ and blocks your Pull Request from merging. Automated testing caught a regression bug!</div>
          </div>

          <h3 style="margin:0 0 0.5rem;font-size:1rem;">Core Concepts</h3>
          <div class="concept-accordion">
            <div class="concept-item open">
              <button class="concept-trigger" type="button"><span>Unit, Integration &amp; Regression Testing</span><span>▾</span></button>
              <div class="concept-body"><div class="concept-grid">
                <div><strong>What it means:</strong> Unit tests check isolated functions; integration tests check modules together; regression tests verify new code didn't break old behavior.</div>
                <pre class="concept-code">expect(calculateTotal(100, 20)).toBe(80);</pre>
              </div></div>
            </div>
            <div class="concept-item">
              <button class="concept-trigger" type="button"><span>Status Checks &amp; Pull Request Protection</span><span>▾</span></button>
              <div class="concept-body"><div class="concept-grid">
                <div><strong>What it means:</strong> Branch protection rules require CI status checks to pass green before allowing a PR merge into <code>main</code>.</div>
              </div></div>
            </div>
          </div>

          <div class="interactive-box">
            <div class="interactive-header">
              <h3>Interactive Mission: Debug a Failing CI Pipeline</h3>
              <span class="badge badge-red" id="ch5TopBadge">Status Check Failed ❌</span>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.85rem;">
              <button class="btn btn-danger btn-sm" id="ch5IgnoreBtn">Ignore Failure &amp; Force Merge</button>
              <button class="btn btn-ghost btn-sm" id="ch5LogsBtn">Investigate Pipeline Logs</button>
              <button class="btn btn-success btn-sm" id="ch5FixBtn">Fix Bug &amp; Rerun Pipeline</button>
            </div>
            <div id="ch5ActionArea"></div>
          </div>

          <div class="quiz-card" id="chapterQuizBox"></div>

          <div class="chapter-footer-nav">
            <a class="btn btn-ghost" href="chapter-4.html">← Chapter 4</a>
            <a class="btn btn-primary" href="chapter-6.html">Next: Chapter 6 →</a>
          </div>
        </article>

        <aside class="card right-panel-sticky" id="ch5RightPanel"></aside>
      </div>
    </main>
  </div>

  <script src="../assets/shared.js"></script>
  <script>
    (function () {
      const PQ = window.PipelineQuest;
      const state = PQ.getState();
      PQ.injectTopbarAndModal("chapters");
      PQ.renderChapterSidebar(5);
      PQ.initConceptAccordions();
      PQ.renderChapterQuiz(5);
      if (state.completedChapters.includes(5)) PQ.markChapterComplete(5);

      function render() {
        const area = document.getElementById("ch5ActionArea");
        const topBadge = document.getElementById("ch5TopBadge");
        const isFixed = state.ch5Stage === "fixed";

        topBadge.className = `badge ${isFixed ? "badge-green" : "badge-red"}`;
        topBadge.textContent = isFixed ? "PR Checks Passed ✓" : "Status Check Failed ❌";

        if (state.ch5Stage === "initial") {
          area.innerHTML = `<div class="callout danger"><strong>Pipeline Failed at npm test:</strong> Merge blocked. Inspect the logs to find out why!</div>`;
        } else if (state.ch5Stage === "ignored") {
          area.innerHTML = `<div class="callout danger"><strong>Blocked by Branch Protection!</strong> Required status checks prevent unsafe code from merging into <code>main</code>.</div>`;
        } else if (state.ch5Stage === "investigated") {
          area.innerHTML = `
            <div class="terminal-window">
              <div class="terminal-bar"><span>Failed Step: npm test</span><span class="badge badge-red">Exit Code 1</span></div>
              <div class="terminal-body"><span class="log-line-err">FAIL src/cartDiscount.test.js
  ✕ calculates 20% discount on $100 subtotal
    Expected: 80 | Received: 20</span></div>
            </div>
            <div class="callout" style="margin-top:0.75rem;">You found the bug! Click <strong>Fix Bug &amp; Rerun Pipeline</strong>.</div>`;
        } else if (isFixed) {
          area.innerHTML = `
            <div class="terminal-window">
              <div class="terminal-bar"><span>Rerun #2: npm test</span><span class="badge badge-green">Exit Code 0</span></div>
              <div class="terminal-body"><span class="log-line-ok">PASS src/cartDiscount.test.js (6/6 suites passed)
All status checks green. PR #42 unlocked!</span></div>
            </div>`;
        }

        document.getElementById("ch5RightPanel").innerHTML = `
          <span class="badge ${isFixed ? "badge-green" : "badge-red"}">GitHub Pull Request Gate</span>
          <h3 style="margin:0.5rem 0 0.75rem;font-size:1rem;">Pull Request #42</h3>
          <div style="border:1px solid ${isFixed ? "var(--accent-green)" : "var(--accent-red)"};border-radius:10px;padding:0.9rem;background:var(--bg-surface);">
            <div style="font-weight:700;margin-bottom:0.4rem;">feat/user-profile → main</div>
            <div style="font-size:0.84rem;margin-bottom:0.75rem;color:${isFixed ? "var(--accent-green)" : "var(--accent-red)"};">
              ${isFixed ? "✅ All checks passed" : "❌ CI Pipeline / test failed"}
            </div>
            <button class="btn btn-sm ${isFixed ? "btn-success" : "btn-ghost"}" style="width:100%;" ${isFixed ? "" : "disabled"}>
              ${isFixed ? "Merge Pull Request (Unlocked)" : "🔒 Merge Blocked by Protection"}
            </button>
          </div>
        `;
      }

      document.getElementById("ch5IgnoreBtn").addEventListener("click", () => { state.ch5Stage = "ignored"; PQ.saveState(); render(); });
      document.getElementById("ch5LogsBtn").addEventListener("click", () => { state.ch5Stage = "investigated"; PQ.saveState(); render(); });
      document.getElementById("ch5FixBtn").addEventListener("click", () => {
        if (state.ch5Stage !== "investigated" && state.ch5Stage !== "fixed") {
          document.getElementById("ch5ActionArea").innerHTML = `<div class="callout warning">Inspect the pipeline logs first so you know which bug to fix!</div>`;
          return;
        }
        state.ch5Stage = "fixed";
        PQ.markChapterComplete(5);
        PQ.saveState();
        render();
      });
      render();
    })();
  </script>
</body>
</html>
```

---

### 9. `chapters/chapter-6.html`
```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Chapter 6: Continuous Delivery and Deployment | Pipeline Quest</title>
  <link rel="stylesheet" href="../assets/styles.css" />
</head>
<body data-base="..">
  <div class="app-bg-grid"></div>
  <div class="app-wrapper">
    <header class="topbar" id="sharedTopbar"></header>

    <main class="container">
      <div class="learn-layout">
        <aside class="card sidebar-card" id="chapterSidebar"></aside>

        <article class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
            <span class="badge badge-cyan">Chapter 6 of 6</span>
            <span id="chapterStatusBadge" class="badge badge-yellow">Mission Active</span>
          </div>
          <h2 style="margin:0.5rem 0 0.75rem;">Chapter 6: Continuous Delivery and Deployment</h2>

          <div class="story-banner">
            <div class="story-role">Day 4 · Shipping to Production 🚀</div>
            <div>All tests passed and your Pull Request merged into <code>main</code>. Now the release pipeline injects encrypted secrets, verifies Staging, and deploys to Production!</div>
          </div>

          <h3 style="margin:0 0 0.5rem;font-size:1rem;">Core Concepts</h3>
          <div class="concept-accordion">
            <div class="concept-item open">
              <button class="concept-trigger" type="button"><span>CI vs. Continuous Delivery vs. Continuous Deployment</span><span>▾</span></button>
              <div class="concept-body"><div class="concept-grid">
                <div><strong>What it means:</strong> CI builds &amp; tests every change. Continuous Delivery keeps code deployable behind a manual approval gate. Continuous Deployment ships every passing <code>main</code> build automatically.</div>
              </div></div>
            </div>
            <div class="concept-item">
              <button class="concept-trigger" type="button"><span>Environments, Environment Variables &amp; Secrets</span><span>▾</span></button>
              <div class="concept-body"><div class="concept-grid">
                <div><strong>What it means:</strong> Environments (<code>staging</code>, <code>production</code>) isolate deployments. Encrypted Secrets keep tokens safe out of Git.</div>
                <pre class="concept-code">env:
  DEPLOY_KEY: ${{ secrets.PROD_DEPLOY_KEY }}</pre>
              </div></div>
            </div>
          </div>

          <div class="interactive-box">
            <div class="interactive-header">
              <h3>Interactive Mission: Ship to Production</h3>
              <button class="btn btn-success btn-sm" id="ch6DeployBtn">🚀 Animate Release Pipeline</button>
            </div>
            <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:0.85rem;font-size:0.84rem;">
              <label><input type="radio" name="cdMode" value="delivery" checked /> <strong>Continuous Delivery</strong> (Manual approval gate)</label>
              <label><input type="radio" name="cdMode" value="deployment" /> <strong>Continuous Deployment</strong> (Automatic release)</label>
            </div>
            <div id="ch6FlowStatus" class="callout">Click <strong>Animate Release Pipeline</strong> to begin.</div>
            <div id="ch6ApprovalWrap" style="display:none;margin-top:0.6rem;">
              <button class="btn btn-cyan btn-sm" id="ch6ApproveBtn">✓ Approve Production Deployment</button>
            </div>
          </div>

          <div class="quiz-card" id="chapterQuizBox"></div>

          <div class="chapter-footer-nav">
            <a class="btn btn-ghost" href="chapter-5.html">← Chapter 5</a>
            <a class="btn btn-success" href="../exam.html">Take Final Assessment →</a>
          </div>
        </article>

        <aside class="card right-panel-sticky" id="ch6RightPanel"></aside>
      </div>
    </main>
  </div>

  <script src="../assets/shared.js"></script>
  <script>
    (function () {
      const PQ = window.PipelineQuest;
      const state = PQ.getState();
      PQ.injectTopbarAndModal("chapters");
      PQ.renderChapterSidebar(6);
      PQ.initConceptAccordions();
      PQ.renderChapterQuiz(6);
      if (state.completedChapters.includes(6)) PQ.markChapterComplete(6);

      const chain = ["Developer", "GitHub", "GitHub Actions", "Build", "Test", "Deploy (Staging)", "Production"];
      function renderChain(activeIdx) {
        document.getElementById("ch6RightPanel").innerHTML = `
          <span class="badge badge-green">Release Pipeline Map</span>
          <h3 style="margin:0.5rem 0 0.75rem;font-size:1rem;">Code to Production</h3>
          <div style="display:grid;gap:0.4rem;">
            ${chain.map((label, idx) => {
              const done = activeIdx >= idx;
              return `<div style="display:flex;justify-content:space-between;padding:0.48rem 0.75rem;border-radius:8px;border:1px solid ${done ? "var(--accent-green)" : "var(--border-subtle)"};background:${done ? "var(--green-soft)" : "var(--bg-surface)"};font-size:0.84rem;">
                <span>${idx + 1}. ${label}</span><span>${done ? "✓" : "○"}</span></div>`;
            }).join("")}
          </div>
        `;
      }

      renderChain(state.completedChapters.includes(6) ? 6 : -1);

      let timer = null;
      const flowStatus = document.getElementById("ch6FlowStatus");
      const approvalWrap = document.getElementById("ch6ApprovalWrap");

      function finish() {
        flowStatus.className = "callout success";
        flowStatus.innerHTML = `<strong>Production Release Live! 🎉</strong> Deployed v1.4.0 using <code>\${{ secrets.PROD_DEPLOY_KEY }}</code>.`;
        approvalWrap.style.display = "none";
        PQ.markChapterComplete(6);
        renderChain(6);
      }

      document.getElementById("ch6DeployBtn").addEventListener("click", () => {
        clearInterval(timer);
        approvalWrap.style.display = "none";
        const mode = document.querySelector('input[name="cdMode"]:checked').value;
        let i = 0;
        flowStatus.className = "callout";
        timer = setInterval(() => {
          renderChain(i);
          flowStatus.innerHTML = `<strong>Stage ${i + 1}/7:</strong> ${chain[i]} executing...`;
          if (i === 5 && mode === "delivery") {
            clearInterval(timer);
            flowStatus.className = "callout warning";
            flowStatus.innerHTML = `<strong>Paused at Environment Gate (Continuous Delivery):</strong> Waiting for Release Manager approval.`;
            approvalWrap.style.display = "block";
            return;
          }
          if (i >= 6) { clearInterval(timer); finish(); }
          i++;
        }, 520);
      });

      document.getElementById("ch6ApproveBtn").addEventListener("click", finish);
    })();
  </script>
</body>
</html>
```

---

### 10. `playground.html` (10-Stage Pipeline Visualizer + Interactive YAML Lab)
```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pipeline Playground &amp; YAML Lab | Pipeline Quest</title>
  <link rel="stylesheet" href="assets/styles.css" />
</head>
<body data-base=".">
  <div class="app-bg-grid"></div>
  <div class="app-wrapper">
    <header class="topbar" id="sharedTopbar"></header>

    <main class="container">
      <div class="section-header" style="margin-top:0.5rem;">
        <div>
          <h2>DevOps Playground &amp; Pipeline Simulator</h2>
          <p>Explore the 10-stage CI/CD pipeline execution and experiment with GitHub Actions YAML.</p>
        </div>
        <span class="sim-disclaimer">ℹ Interactive browser simulation (does not execute real GitHub runners)</span>
      </div>

      <!-- 10-Stage Pipeline Simulator -->
      <div class="card" style="margin-bottom:1.5rem;">
        <div class="pipeline-controls">
          <div>
            <h3 style="margin:0;font-size:1.12rem;">End-to-End CI/CD Pipeline Visualizer</h3>
            <div style="font-size:0.82rem;color:var(--text-secondary);">Click any stage node to inspect logs &amp; details.</div>
          </div>
          <div class="pipeline-btn-group">
            <button class="btn btn-cyan btn-sm" id="plRunBtn">▶ Run Pipeline</button>
            <button class="btn btn-ghost btn-sm" id="plPauseBtn" disabled>⏸ Pause</button>
            <button class="btn btn-ghost btn-sm" id="plResumeBtn" disabled>⏯ Resume</button>
            <button class="btn btn-ghost btn-sm" id="plRestartBtn">↺ Restart</button>
            <label style="display:inline-flex;align-items:center;gap:0.4rem;font-size:0.82rem;cursor:pointer;margin-left:0.4rem;">
              <input type="checkbox" id="plFailToggle" /><span>Simulate Test Failure</span>
            </label>
          </div>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-bottom:0.85rem;font-size:0.78rem;">
          <span class="badge badge-yellow">● Yellow: Pending</span>
          <span class="badge badge-cyan">● Cyan: Executing</span>
          <span class="badge badge-green">● Green: Success</span>
          <span class="badge badge-red">● Red: Failed</span>
        </div>

        <div class="pipeline-board">
          <div class="pipeline-svg-wrap">
            <svg id="mainPipelineSvg" viewBox="0 0 700 470" width="100%" style="min-width:540px;">
              <path id="mp-e0" class="pipeline-edge" d="M 145 50 L 185 50" />
              <path id="mp-e1" class="pipeline-edge" d="M 315 50 L 355 50" />
              <path id="mp-e2" class="pipeline-edge" d="M 485 50 L 525 50" />
              <path id="mp-e3" class="pipeline-edge" d="M 590 80 L 590 155" />
              <path id="mp-e4" class="pipeline-edge" d="M 525 185 L 485 185" />
              <path id="mp-e5" class="pipeline-edge" d="M 355 185 L 315 185" />
              <path id="mp-e6" class="pipeline-edge" d="M 185 185 L 145 185" />
              <path id="mp-e7" class="pipeline-edge" d="M 80 215 L 80 290" />
              <path id="mp-e8" class="pipeline-edge" d="M 145 320 L 210 320" />

              <g id="mp-n0" class="pipeline-node" data-stage="0"><rect class="node-box" x="15" y="20" width="130" height="60" /><text x="80" y="46" text-anchor="middle" fill="currentColor" font-size="12" font-weight="700">1. Developer</text><text x="80" y="64" text-anchor="middle" fill="#94a3b8" font-size="10">Writes Feature</text></g>
              <g id="mp-n1" class="pipeline-node" data-stage="1"><rect class="node-box" x="185" y="20" width="130" height="60" /><text x="250" y="46" text-anchor="middle" fill="currentColor" font-size="12" font-weight="700">2. Git Commit</text><text x="250" y="64" text-anchor="middle" fill="#94a3b8" font-size="10">Local Snapshot</text></g>
              <g id="mp-n2" class="pipeline-node" data-stage="2"><rect class="node-box" x="355" y="20" width="130" height="60" /><text x="420" y="46" text-anchor="middle" fill="currentColor" font-size="12" font-weight="700">3. Git Push</text><text x="420" y="64" text-anchor="middle" fill="#94a3b8" font-size="10">Upload to Origin</text></g>
              <g id="mp-n3" class="pipeline-node" data-stage="3"><rect class="node-box" x="525" y="20" width="130" height="60" /><text x="590" y="46" text-anchor="middle" fill="currentColor" font-size="12" font-weight="700">4. GitHub Repo</text><text x="590" y="64" text-anchor="middle" fill="#94a3b8" font-size="10">Remote Hosted</text></g>

              <g id="mp-n4" class="pipeline-node" data-stage="4"><rect class="node-box" x="525" y="155" width="130" height="60" /><text x="590" y="181" text-anchor="middle" fill="currentColor" font-size="12" font-weight="700">5. Actions Trigger</text><text x="590" y="199" text-anchor="middle" fill="#94a3b8" font-size="10">on: push / PR</text></g>
              <g id="mp-n5" class="pipeline-node" data-stage="5"><rect class="node-box" x="355" y="155" width="130" height="60" /><text x="420" y="181" text-anchor="middle" fill="currentColor" font-size="12" font-weight="700">6. Runner</text><text x="420" y="199" text-anchor="middle" fill="#94a3b8" font-size="10">ubuntu-latest VM</text></g>
              <g id="mp-n6" class="pipeline-node" data-stage="6"><rect class="node-box" x="185" y="155" width="130" height="60" /><text x="250" y="181" text-anchor="middle" fill="currentColor" font-size="12" font-weight="700">7. Build</text><text x="250" y="199" text-anchor="middle" fill="#94a3b8" font-size="10">npm ci &amp; bundle</text></g>
              <g id="mp-n7" class="pipeline-node" data-stage="7"><rect class="node-box" x="15" y="155" width="130" height="60" /><text x="80" y="181" text-anchor="middle" fill="currentColor" font-size="12" font-weight="700">8. Auto Tests</text><text x="80" y="199" text-anchor="middle" fill="#94a3b8" font-size="10">Unit &amp; Integration</text></g>

              <g id="mp-n8" class="pipeline-node" data-stage="8"><rect class="node-box" x="15" y="290" width="130" height="60" /><text x="80" y="316" text-anchor="middle" fill="currentColor" font-size="12" font-weight="700">9. Deployment</text><text x="80" y="334" text-anchor="middle" fill="#94a3b8" font-size="10">Release Artifact</text></g>
              <g id="mp-n9" class="pipeline-node" data-stage="9"><rect class="node-box" x="210" y="290" width="210" height="60" /><text x="315" y="316" text-anchor="middle" fill="currentColor" font-size="12" font-weight="700">10. Production</text><text x="315" y="334" text-anchor="middle" fill="#94a3b8" font-size="10">Live User Traffic</text></g>

              <rect x="15" y="385" width="640" height="62" rx="10" fill="rgba(148,163,184,0.08)" stroke="rgba(148,163,184,0.2)" />
              <text id="mpStatusTitle" x="32" y="411" fill="currentColor" font-size="13" font-weight="700">Pipeline Status: Idle — Ready to Execute</text>
              <text id="mpStatusSub" x="32" y="431" fill="#94a3b8" font-size="11">Press Run Pipeline to watch each stage execute.</text>
            </svg>
          </div>

          <div>
            <div class="terminal-window">
              <div class="terminal-bar">
                <div class="terminal-dots"><span class="terminal-dot" style="background:#ef4444;"></span><span class="terminal-dot" style="background:#f59e0b;"></span><span class="terminal-dot" style="background:#10b981;"></span></div>
                <span id="plLogStageTitle">Stage Logs</span>
              </div>
              <div class="terminal-body" id="plLogsBody" style="min-height:290px;max-height:360px;">
                <span class="log-line-muted">[system] Pipeline initialized. Click "Run Pipeline" to begin simulation.</span>
              </div>
            </div>
            <div id="plStageExplainCard" class="callout" style="margin-top:0.85rem;">
              <strong>Stage Inspector:</strong> Click any node in the diagram to inspect its real-world role.
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive YAML Editor -->
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;margin-bottom:1rem;">
          <div>
            <h3 style="margin:0;font-size:1.12rem;">Interactive GitHub Actions YAML Lab</h3>
            <p style="margin:0.2rem 0 0;font-size:0.84rem;color:var(--text-secondary);">Click any line in <code>.github/workflows/ci.yml</code> to understand it, or modify settings.</p>
          </div>
          <button class="btn btn-ghost btn-sm" id="yamlResetBtn">↺ Reset Example</button>
        </div>

        <div class="yaml-workspace">
          <div>
            <div class="yaml-code-panel">
              <div class="terminal-bar"><span>.github/workflows/ci.yml</span><span class="badge badge-purple">YAML Syntax</span></div>
              <div id="yamlLinesContainer" style="padding:0.6rem 0;"></div>
            </div>
            <div class="callout warning" style="margin-top:0.85rem;font-size:0.82rem;">
              <strong>YAML ↔ Execution:</strong> GitHub reads this declarative configuration from <code>.github/workflows/</code> on matching events. This editor simulates configuration impact locally without running real GitHub runners.
            </div>
          </div>

          <div>
            <div class="card" style="background:var(--bg-surface);margin-bottom:1rem;">
              <h4 style="margin:0 0 0.75rem;font-size:0.95rem;">Modify Workflow Settings</h4>
              <div class="yaml-controls-grid">
                <div class="form-field"><label for="yamlNameInput">Workflow Name</label><input type="text" id="yamlNameInput" value="CI Pipeline" /></div>
                <div class="form-field"><label for="yamlBranchSelect">Trigger Branch (push)</label><select id="yamlBranchSelect"><option value="main">main</option><option value="develop">develop</option><option value="main, staging">main, staging</option></select></div>
                <div class="form-field"><label for="yamlPrToggle">Pull Request Trigger</label><select id="yamlPrToggle"><option value="enabled">Enabled (pull_request)</option><option value="disabled">Disabled</option></select></div>
                <div class="form-field"><label for="yamlRunnerSelect">Runner OS (runs-on)</label><select id="yamlRunnerSelect"><option value="ubuntu-latest">ubuntu-latest</option><option value="windows-latest">windows-latest</option><option value="macos-latest">macos-latest</option></select></div>
                <div class="form-field"><label for="yamlNodeSelect">Node.js Version</label><select id="yamlNodeSelect"><option value="22">22</option><option value="20">20</option><option value="18">18</option></select></div>
                <div class="form-field"><label for="yamlTestCmdSelect">Test Step</label><select id="yamlTestCmdSelect"><option value="npm test">npm test</option><option value="npm run lint && npm test">npm run lint && npm test</option><option value="npm test -- --coverage">npm test -- --coverage</option></select></div>
              </div>
              <div style="border-top:1px solid var(--border-subtle);padding-top:0.85rem;">
                <div style="font-size:0.78rem;font-weight:700;text-transform:uppercase;color:var(--text-muted);margin-bottom:0.45rem;">Live Execution Impact Preview</div>
                <div id="yamlImpactSummary" style="font-size:0.86rem;color:var(--text-secondary);"></div>
              </div>
            </div>

            <div class="card" style="background:var(--bg-surface);">
              <span class="badge badge-cyan">YAML Line Inspector</span>
              <h4 style="margin:0.5rem 0 0.35rem;" id="yamlExplainTitle">Click any YAML line on the left</h4>
              <p style="margin:0;font-size:0.88rem;color:var(--text-secondary);" id="yamlExplainDesc">Selecting a key or step reveals why it exists in a real-world CI/CD workflow.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <script src="assets/shared.js"></script>
  <script>
    (function () {
      const PQ = window.PipelineQuest;
      PQ.injectTopbarAndModal("playground");

      const PIPELINE_STAGES = [
        { name: "Developer", desc: "Junior engineer finishes feature & unit tests locally.", log: "[local] Edited src/ProfileBadge.js and tests." },
        { name: "Git Commit", desc: "Local snapshot created via git commit.", log: "[git] [feat/profile-badge 9c42e10] feat: profile badge" },
        { name: "Git Push", desc: "Commits uploaded to remote origin.", log: "[git] Pushed feat/profile-badge -> origin" },
        { name: "GitHub Repository", desc: "GitHub receives objects & updates PR #42.", log: "[github] PR #42 updated on novacommerce/web-app" },
        { name: "GitHub Actions Trigger", desc: "Event matches .github/workflows/ci.yml.", log: "[actions] Workflow 'CI Pipeline' queued" },
        { name: "Runner", desc: "Fresh ubuntu-latest VM provisioned.", log: "[runner] ubuntu-24.04 ready. Checked out repo." },
        { name: "Build", desc: "Installs dependencies via npm ci and bundles app.", log: "[build] npm ci && npm run build -> dist/ ready" },
        { name: "Automated Tests", desc: "Runs unit and integration tests.", logOk: "[test] PASS 18/18 tests passed.", logFail: "[test] FAIL cartDiscount.test.js · Expected 80, received 20!" },
        { name: "Deployment", desc: "Deploys artifact using encrypted GitHub Secrets.", log: "[deploy] Authenticated via PROD_TOKEN -> uploaded v1.4.0." },
        { name: "Production", desc: "Live user traffic served cleanly.", log: "[prod] Health check 200 OK 🚀" }
      ];

      const sim = { timer: null, currentIdx: -1, status: "idle", nodeStates: Array(10).fill("idle"), logs: [] };

      function updateDom() {
        for (let i = 0; i < 10; i++) {
          document.getElementById(`mp-n${i}`).setAttribute("class", `pipeline-node ${sim.nodeStates[i]}`);
        }
        for (let e = 0; e < 9; e++) {
          let cls = "pipeline-edge";
          if (sim.nodeStates[e] === "success" && sim.nodeStates[e + 1] === "running") cls += " active";
          else if (sim.nodeStates[e] === "success" && (sim.nodeStates[e + 1] === "success" || sim.nodeStates[e + 1] === "failed")) cls += " done";
          if (sim.nodeStates[e] === "failed") cls += " error";
          document.getElementById(`mp-e${e}`).setAttribute("class", cls);
        }
        const titleEl = document.getElementById("mpStatusTitle");
        const subEl = document.getElementById("mpStatusSub");
        if (sim.status === "idle") { titleEl.textContent = "Pipeline Status: Idle — Ready to Execute"; subEl.textContent = "Press Run Pipeline to watch each stage execute."; }
        else if (sim.status === "running") { titleEl.textContent = `Executing Stage ${sim.currentIdx + 1}/10: ${PIPELINE_STAGES[sim.currentIdx].name}`; subEl.textContent = PIPELINE_STAGES[sim.currentIdx].desc; }
        else if (sim.status === "paused") { titleEl.textContent = `Paused at Stage ${sim.currentIdx + 1}`; subEl.textContent = "Click Resume to continue."; }
        else if (sim.status === "failed") { titleEl.textContent = "Pipeline Failed at Stage 8: Automated Tests ❌"; subEl.textContent = "Deployment blocked to protect production."; }
        else if (sim.status === "finished") { titleEl.textContent = "Pipeline Succeeded: Deployed to Production ✅"; subEl.textContent = "All 10 stages completed cleanly."; }

        document.getElementById("plRunBtn").disabled = sim.status === "running";
        document.getElementById("plPauseBtn").disabled = sim.status !== "running";
        document.getElementById("plResumeBtn").disabled = sim.status !== "paused";
      }

      function appendLog(line) {
        sim.logs.push(line);
        const body = document.getElementById("plLogsBody");
        body.innerHTML = sim.logs.join("\n");
        body.scrollTop = body.scrollHeight;
      }

      function step() {
        const failMode = document.getElementById("plFailToggle").checked;
        if (sim.currentIdx >= 0 && sim.currentIdx < 10) {
          if (sim.currentIdx === 7 && failMode) {
            sim.nodeStates[7] = "failed";
            sim.status = "failed";
            clearInterval(sim.timer);
            appendLog(`<span class="log-line-err">${PIPELINE_STAGES[7].logFail}</span>`);
            appendLog(`<span class="log-line-warn">[guard] Deployment & Production aborted.</span>`);
            updateDom();
            return;
          }
          sim.nodeStates[sim.currentIdx] = "success";
          appendLog(`<span class="log-line-ok">${sim.currentIdx === 7 ? PIPELINE_STAGES[7].logOk : PIPELINE_STAGES[sim.currentIdx].log}</span>`);
        }
        sim.currentIdx++;
        if (sim.currentIdx >= 10) {
          sim.status = "finished";
          clearInterval(sim.timer);
          appendLog(`<span class="log-line-cmd">✓ Workflow finished successfully!</span>`);
          updateDom();
          return;
        }
        sim.nodeStates[sim.currentIdx] = "running";
        appendLog(`<span class="log-line-cmd">▶ Stage ${sim.currentIdx + 1}: ${PIPELINE_STAGES[sim.currentIdx].name}...</span>`);
        updateDom();
      }

      document.getElementById("plRunBtn").addEventListener("click", () => {
        clearInterval(sim.timer);
        sim.currentIdx = -1;
        sim.status = "running";
        sim.nodeStates = Array(10).fill("pending");
        sim.logs = ['<span class="log-line-muted">[system] Starting 10-stage CI/CD simulation...</span>'];
        step();
        sim.timer = setInterval(step, 800);
      });
      document.getElementById("plPauseBtn").addEventListener("click", () => {
        if (sim.status === "running") { clearInterval(sim.timer); sim.status = "paused"; appendLog('<span class="log-line-warn">[system] Paused.</span>'); updateDom(); }
      });
      document.getElementById("plResumeBtn").addEventListener("click", () => {
        if (sim.status === "paused") { sim.status = "running"; appendLog('<span class="log-line-muted">[system] Resumed.</span>'); updateDom(); sim.timer = setInterval(step, 800); }
      });
      document.getElementById("plRestartBtn").addEventListener("click", () => {
        clearInterval(sim.timer);
        sim.currentIdx = -1; sim.status = "idle"; sim.nodeStates = Array(10).fill("idle");
        sim.logs = ['<span class="log-line-muted">[system] Reset. Click Run Pipeline to start.</span>'];
        document.getElementById("plLogsBody").innerHTML = sim.logs[0];
        updateDom();
      });

      document.querySelectorAll("#mainPipelineSvg .pipeline-node").forEach((nodeEl) => {
        nodeEl.addEventListener("click", () => {
          const idx = Number(nodeEl.dataset.stage);
          const st = PIPELINE_STAGES[idx];
          document.getElementById("plLogStageTitle").textContent = `Inspecting Stage ${idx + 1}: ${st.name}`;
          document.getElementById("plStageExplainCard").innerHTML = `<strong>Stage ${idx + 1} — ${st.name}:</strong> ${st.desc}`;
        });
      });

      // YAML Editor
      const yamlConfig = { name: "CI Pipeline", branch: "main", pr: "enabled", runner: "ubuntu-latest", nodeVersion: "22", testCmd: "npm test", selectedLineIdx: 0 };

      function buildYamlLines() {
        const lines = [
          { raw: `name: ${yamlConfig.name || "CI Pipeline"}`, title: "Workflow Name", desc: "Displayed in GitHub Actions UI and PR status checks." },
          { raw: `on:`, title: "Trigger Block (`on:`)", desc: "Events that automatically start this workflow." },
          { raw: `  push:`, title: "Push Trigger", desc: "Runs when commits are pushed to listed branches." },
          { raw: `    branches: [${yamlConfig.branch}]`, title: "Branch Filter", desc: `Limits push runs to [${yamlConfig.branch}].` }
        ];
        if (yamlConfig.pr === "enabled") {
          lines.push({ raw: `  pull_request:`, title: "Pull Request Trigger", desc: "Runs checks when PRs are opened or updated." });
        }
        lines.push(
          { raw: `jobs:`, title: "Jobs Collection", desc: "Groups jobs inside this workflow." },
          { raw: `  test:`, title: "Job ID (`test:`)", desc: "Unique identifier for this job." },
          { raw: `    runs-on: ${yamlConfig.runner}`, title: "Runner VM (`runs-on:`)", desc: `Provisions a fresh ${yamlConfig.runner} virtual machine.` },
          { raw: `    steps:`, title: "Job Steps", desc: "Ordered sequence of actions and shell commands." },
          { raw: `      - uses: actions/checkout@v4`, title: "Checkout Repository", desc: "Clones your branch code onto the empty runner VM." },
          { raw: `      - uses: actions/setup-node@v4`, title: "Setup Node.js", desc: "Installs the pinned Node.js runtime." },
          { raw: `        with:`, title: "Action Inputs", desc: "Passes configuration options to setup-node." },
          { raw: `          node-version: ${yamlConfig.nodeVersion}`, title: "Node Version", desc: `Uses Node.js v${yamlConfig.nodeVersion}.` },
          { raw: `      - run: npm ci`, title: "Clean Install", desc: "Installs locked dependencies from package-lock.json." },
          { raw: `      - run: ${yamlConfig.testCmd}`, title: "Verification Step", desc: `Runs \`${yamlConfig.testCmd}\`; non-zero exit fails the job.` }
        );
        return lines;
      }

      function highlight(raw) {
        const esc = PQ.escapeHtml(raw);
        if (!esc.includes(":")) return esc;
        const i = esc.indexOf(":");
        return `<span class="yk">${esc.slice(0, i)}</span><span class="ys">:</span><span class="yv">${esc.slice(i + 1)}</span>`;
      }

      function renderYaml() {
        const lines = buildYamlLines();
        if (yamlConfig.selectedLineIdx >= lines.length) yamlConfig.selectedLineIdx = 0;
        const container = document.getElementById("yamlLinesContainer");
        container.innerHTML = lines.map((l, i) => `
          <div class="yaml-line ${i === yamlConfig.selectedLineIdx ? "selected" : ""}" data-y="${i}">
            <span class="yaml-ln">${i + 1}</span><span>${highlight(l.raw)}</span>
          </div>
        `).join("");
        container.querySelectorAll(".yaml-line").forEach((el) => {
          el.addEventListener("click", () => { yamlConfig.selectedLineIdx = Number(el.dataset.y); renderYaml(); });
        });
        const sel = lines[yamlConfig.selectedLineIdx];
        document.getElementById("yamlExplainTitle").textContent = sel.title;
        document.getElementById("yamlExplainDesc").textContent = sel.desc;
        document.getElementById("yamlImpactSummary").innerHTML = `
          <div>• Workflow <strong>"${PQ.escapeHtml(yamlConfig.name || "CI Pipeline")}"</strong> triggers on <code>[${yamlConfig.branch}]</code> ${yamlConfig.pr === "enabled" ? "and <code>pull_request</code>" : "(PR triggers off ⚠️)"}.</div>
          <div>• Runs on <code>${yamlConfig.runner}</code> with <strong>Node.js v${yamlConfig.nodeVersion}</strong> executing <code>${yamlConfig.testCmd}</code>.</div>
        `;
      }

      document.getElementById("yamlNameInput").addEventListener("input", (e) => { yamlConfig.name = e.target.value; renderYaml(); });
      document.getElementById("yamlBranchSelect").addEventListener("change", (e) => { yamlConfig.branch = e.target.value; renderYaml(); });
      document.getElementById("yamlPrToggle").addEventListener("change", (e) => { yamlConfig.pr = e.target.value; renderYaml(); });
      document.getElementById("yamlRunnerSelect").addEventListener("change", (e) => { yamlConfig.runner = e.target.value; renderYaml(); });
      document.getElementById("yamlNodeSelect").addEventListener("change", (e) => { yamlConfig.nodeVersion = e.target.value; renderYaml(); });
      document.getElementById("yamlTestCmdSelect").addEventListener("change", (e) => { yamlConfig.testCmd = e.target.value; renderYaml(); });
      document.getElementById("yamlResetBtn").addEventListener("click", () => {
        Object.assign(yamlConfig, { name: "CI Pipeline", branch: "main", pr: "enabled", runner: "ubuntu-latest", nodeVersion: "22", testCmd: "npm test", selectedLineIdx: 0 });
        document.getElementById("yamlNameInput").value = yamlConfig.name;
        document.getElementById("yamlBranchSelect").value = yamlConfig.branch;
        document.getElementById("yamlPrToggle").value = yamlConfig.pr;
        document.getElementById("yamlRunnerSelect").value = yamlConfig.runner;
        document.getElementById("yamlNodeSelect").value = yamlConfig.nodeVersion;
        document.getElementById("yamlTestCmdSelect").value = yamlConfig.testCmd;
        renderYaml();
      });

      renderYaml();
      updateDom();
    })();
  </script>
</body>
</html>
```

---

### 11. `docs.html` (Glossary, Command Reference & YAML Examples)
```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Documentation &amp; Reference | Pipeline Quest</title>
  <link rel="stylesheet" href="assets/styles.css" />
</head>
<body data-base=".">
  <div class="app-bg-grid"></div>
  <div class="app-wrapper">
    <header class="topbar" id="sharedTopbar"></header>

    <main class="container">
      <div class="section-header" style="margin-top:0.5rem;">
        <div>
          <h2>DevOps Documentation &amp; Quick Reference</h2>
          <p>Practical definitions, real Git commands, and GitHub Actions YAML templates.</p>
        </div>
      </div>

      <div class="tab-bar">
        <button class="btn btn-sm btn-primary doc-tab-btn" data-doc-tab="glossary">CI/CD Glossary</button>
        <button class="btn btn-sm btn-ghost doc-tab-btn" data-doc-tab="commands">Git Command Reference</button>
        <button class="btn btn-sm btn-ghost doc-tab-btn" data-doc-tab="examples">GitHub Actions YAML Examples</button>
      </div>

      <div id="docTabContent"></div>
    </main>
  </div>

  <script src="assets/shared.js"></script>
  <script>
    (function () {
      const PQ = window.PipelineQuest;
      PQ.injectTopbarAndModal("docs");

      const GLOSSARY = [
        { term: "Repository", desc: "A project folder tracked by Git, containing source files and complete commit history." },
        { term: "Commit", desc: "An immutable snapshot of staged changes at a point in time." },
        { term: "Branch", desc: "A movable pointer to a commit enabling parallel, isolated development." },
        { term: "Origin", desc: "Git's default nickname for the remote GitHub repository." },
        { term: "Pull Request (PR)", desc: "A proposal to merge a feature branch into another branch with code review and CI checks." },
        { term: "Continuous Integration (CI)", desc: "Automatically building and testing every commit on a shared branch." },
        { term: "Continuous Delivery", desc: "Keeping builds production-ready behind a manual deployment approval gate." },
        { term: "Continuous Deployment", desc: "Automatically releasing every passing `main` build directly to production." },
        { term: "Runner", desc: "A fresh virtual machine executing jobs inside GitHub Actions." },
        { term: "Secrets", desc: "Encrypted credentials stored in GitHub settings and masked in workflow logs." }
      ];

      const COMMANDS = [
        { cmd: "git status", purpose: "Inspect current branch, modified files, and staged changes.", ex: "git status" },
        { cmd: "git checkout -b <branch>", purpose: "Create and switch to a new feature branch.", ex: "git checkout -b feat/login-form" },
        { cmd: "git add <files>", purpose: "Move changes from working directory to staging area.", ex: "git add ." },
        { cmd: "git commit -m \"<msg>\"", purpose: "Save staged snapshot permanently in local Git history.", ex: "git commit -m \"feat: add profile badge\"" },
        { cmd: "git push -u origin <branch>", purpose: "Upload local branch commits to GitHub.", ex: "git push -u origin feat/login-form" },
        { cmd: "git pull origin main", purpose: "Fetch and merge latest changes from GitHub main.", ex: "git pull origin main" },
        { cmd: "npm ci", purpose: "Clean deterministic dependency install in CI runners.", ex: "npm ci" }
      ];

      const EXAMPLES = [
        {
          title: "1. Standard Node.js CI Workflow",
          desc: "Runs clean install, tests, and build on every push to main and Pull Request.",
          code: `name: Node CI\non:\n  push:\n    branches: [main]\n  pull_request:\n\njobs:\n  build-and-test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 22\n      - run: npm ci\n      - run: npm test\n      - run: npm run build`
        },
        {
          title: "2. Multi-Job CI/CD with Production Environment",
          desc: "Uses job dependency (`needs: test`) and GitHub Secrets for deployment.",
          code: `name: Deploy Pipeline\non:\n  push:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci && npm test\n\n  deploy:\n    needs: test\n    runs-on: ubuntu-latest\n    environment: production\n    steps:\n      - uses: actions/checkout@v4\n      - run: echo "Deploying safely"\n        env:\n          DEPLOY_TOKEN: \${{ secrets.PROD_TOKEN }}`
        }
      ];

      function renderTab(name) {
        document.querySelectorAll(".doc-tab-btn").forEach((b) => {
          b.className = `btn btn-sm doc-tab-btn ${b.dataset.docTab === name ? "btn-primary" : "btn-ghost"}`;
        });
        const box = document.getElementById("docTabContent");
        if (name === "glossary") {
          box.innerHTML = `<div class="ref-grid">${GLOSSARY.map((i) => `<div class="card"><span class="badge badge-cyan" style="margin-bottom:0.5rem;">Term</span><h4 style="margin:0 0 0.4rem;">${i.term}</h4><p style="margin:0;font-size:0.86rem;color:var(--text-secondary);">${i.desc}</p></div>`).join("")}</div>`;
        } else if (name === "commands") {
          box.innerHTML = `<div class="ref-grid">${COMMANDS.map((i) => `<div class="card"><code style="font-weight:700;color:var(--accent-cyan);">${PQ.escapeHtml(i.cmd)}</code><p style="margin:0.45rem 0;font-size:0.86rem;color:var(--text-secondary);">${PQ.escapeHtml(i.purpose)}</p><pre class="concept-code">${PQ.escapeHtml(i.ex)}</pre></div>`).join("")}</div>`;
        } else {
          box.innerHTML = `<div style="display:grid;gap:1rem;">${EXAMPLES.map((i) => `<div class="card"><h3 style="margin:0 0 0.35rem;">${i.title}</h3><p style="margin:0 0 0.75rem;font-size:0.86rem;color:var(--text-secondary);">${i.desc}</p><pre class="concept-code">${PQ.escapeHtml(i.code)}</pre></div>`).join("")}</div>`;
        }
      }

      document.querySelectorAll(".doc-tab-btn").forEach((b) => b.addEventListener("click", () => renderTab(b.dataset.docTab)));
      renderTab("glossary");
    })();
  </script>
</body>
</html>
```

---

### 12. `exam.html` (10-Question Final Assessment)
```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Final Assessment | Pipeline Quest</title>
  <link rel="stylesheet" href="assets/styles.css" />
</head>
<body data-base=".">
  <div class="app-bg-grid"></div>
  <div class="app-wrapper">
    <header class="topbar" id="sharedTopbar"></header>

    <main class="container">
      <div class="card" style="max-width:860px;margin:0 auto;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;margin-bottom:1rem;">
          <div>
            <span class="badge badge-purple">Final Certification Assessment</span>
            <h2 style="margin:0.4rem 0 0;">Pipeline Quest — 10-Question DevOps Check</h2>
          </div>
          <a class="btn btn-ghost btn-sm" href="chapters/chapter-6.html">← Back to Chapters</a>
        </div>
        <div id="finalExamContainer"></div>
      </div>
    </main>
  </div>

  <script src="assets/shared.js"></script>
  <script>
    (function () {
      const PQ = window.PipelineQuest;
      const state = PQ.getState();
      PQ.injectTopbarAndModal("chapters");

      const QUESTIONS = [
        { topic: "Git & Branching", q: "Why should new features be built on a dedicated feature branch?", options: ["Keeps `main` stable while isolating work for review", "Skips committing", "Makes runners twice as fast"], answer: 0 },
        { topic: "Git Workflow", q: "Which command sequence stages, commits, and uploads changes?", options: ["git push -> git commit -> git add", "git add . -> git commit -m \"msg\" -> git push", "git status -> git pull -> git checkout"], answer: 1 },
        { topic: "Local vs Remote", q: "When you run `git commit`, where is the snapshot stored?", options: ["In your local repository on your computer", "On GitHub immediately", "On production"], answer: 0 },
        { topic: "Workflow Directory", q: "Where must GitHub Actions YAML files live?", options: ["`.github/workflows/`", "`src/workflows/`", "`actions/config.json`"], answer: 0 },
        { topic: "Workflow Triggers", q: "Which trigger runs automation when a Pull Request is opened or updated?", options: ["`on: pull_request`", "`trigger: merge`", "`when: pr_created`"], answer: 0 },
        { topic: "Runners", q: "What does `runs-on: ubuntu-latest` specify?", options: ["Your local laptop OS", "The GitHub-hosted Linux VM executing the job", "Your database engine"], answer: 1 },
        { topic: "Checkout Action", q: "Why do jobs start with `uses: actions/checkout@v4`?", options: ["It installs Node.js", "It clones your repo files onto the fresh empty runner", "It merges the PR"], answer: 1 },
        { topic: "Branch Protection", q: "If automated unit tests fail on a PR, what should happen?", options: ["Branch protection blocks merging until fixed", "Deploy anyway", "Delete commit history"], answer: 0 },
        { topic: "Delivery vs Deployment", q: "Which releases every passing `main` build automatically with NO manual gate?", options: ["Continuous Integration", "Continuous Delivery", "Continuous Deployment"], answer: 2 },
        { topic: "Secrets", q: "How should production deploy tokens be passed to a workflow?", options: ["Hardcoded in `package.json`", "Referenced via `${{ secrets.PROD_TOKEN }}`", "Written in README"], answer: 1 }
      ];

      function render() {
        const container = document.getElementById("finalExamContainer");
        if (state.finalExamSubmitted) {
          let correct = 0;
          const missed = [];
          QUESTIONS.forEach((q, i) => {
            if (state.finalExamAnswers[i] === q.answer) correct++;
            else if (!missed.includes(q.topic)) missed.push(q.topic);
          });
          const pct = Math.round((correct / QUESTIONS.length) * 100);
          container.innerHTML = `
            <div class="callout ${pct >= 70 ? "success" : "warning"}" style="margin-top:1rem;">
              <h3 style="margin:0 0 0.35rem;">Score: ${correct} / ${QUESTIONS.length} (${pct}%)</h3>
              <div>${pct >= 80 ? "Outstanding work! You are ready for CI/CD workflows." : "Good effort! Review the highlighted topics below."}</div>
            </div>
            <div class="hero-stats" style="margin:1rem 0;">
              <div class="stat-box"><div class="stat-value" style="color:var(--accent-green);">${correct}</div><div class="stat-label">Correct</div></div>
              <div class="stat-box"><div class="stat-value" style="color:var(--accent-red);">${QUESTIONS.length - correct}</div><div class="stat-label">Incorrect</div></div>
              <div class="stat-box"><div class="stat-value">${pct}%</div><div class="stat-label">Accuracy</div></div>
            </div>
            <div class="card" style="background:var(--bg-surface);margin-bottom:1rem;">
              <h4 style="margin:0 0 0.5rem;">Topics Needing Revision</h4>
              ${missed.length === 0 ? '<span class="badge badge-green">None — 100% mastery!</span>' : `<div style="display:flex;flex-wrap:wrap;gap:0.45rem;">${missed.map((t) => `<span class="badge badge-yellow">${t}</span>`).join("")}</div>`}
            </div>
            <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
              <button class="btn btn-primary" id="retakeBtn">↺ Restart Assessment</button>
              <a class="btn btn-ghost" href="chapters/chapter-1.html">Review Chapters</a>
            </div>
          `;
          document.getElementById("retakeBtn").addEventListener("click", () => {
            state.finalExamAnswers = {};
            state.finalExamSubmitted = false;
            PQ.saveState();
            render();
          });
          return;
        }

        const answered = Object.keys(state.finalExamAnswers).length;
        container.innerHTML = `
          ${QUESTIONS.map((qObj, idx) => `
            <div class="quiz-question">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;">
                <strong style="font-size:0.92rem;">${idx + 1}. ${PQ.escapeHtml(qObj.q)}</strong>
                <span class="badge badge-blue">${qObj.topic}</span>
              </div>
              <div class="quiz-options">
                ${qObj.options.map((opt, oIdx) => `
                  <button class="quiz-option" style="${state.finalExamAnswers[idx] === oIdx ? "border-color:var(--accent-cyan);background:var(--cyan-soft);" : ""}" data-q="${idx}" data-o="${oIdx}">
                    ${PQ.escapeHtml(opt)}
                  </button>
                `).join("")}
              </div>
            </div>
          `).join("")}
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:1.25rem;flex-wrap:wrap;gap:0.75rem;">
            <span style="font-size:0.86rem;color:var(--text-secondary);">Answered: ${answered} / ${QUESTIONS.length}</span>
            <button class="btn btn-success" id="submitExamBtn" ${answered < QUESTIONS.length ? "disabled" : ""}>Submit Final Assessment</button>
          </div>
        `;

        container.querySelectorAll("[data-q]").forEach((btn) => {
          btn.addEventListener("click", () => {
            state.finalExamAnswers[Number(btn.dataset.q)] = Number(btn.dataset.o);
            PQ.saveState();
            render();
          });
        });

        document.getElementById("submitExamBtn").addEventListener("click", () => {
          state.finalExamSubmitted = true;
          PQ.saveState();
          render();
        });
      }

      render();
    })();
  </script>
</body>
</html>
```

### How to Run
Create the `pipeline-quest/` folder with `assets/` and `chapters/` subfolders, save each file above, and open `index.html` in your browser (or run `python3 -m http.server 8000` inside `pipeline-quest/`). Progress, quiz scores, and theme preference sync automatically across all pages via `localStorage`.