# Pipeline Quest

A browser-based, story-driven learning lab for Git, GitHub Actions, CI/CD, and DevOps fundamentals.

## Overview

Pipeline Quest follows a junior engineer from creating their first feature branch through automated testing and production deployment. It requires no build process or runtime dependencies.

## Topics Covered

- Git repositories, branches, commits, staging, and remotes
- Push, pull, and Pull Request workflows
- GitHub Actions workflows and YAML
- Jobs, steps, runners, and workflow dependencies
- Automated testing and branch protection
- Continuous Delivery and Continuous Deployment
- GitHub environments and secrets

## Features

- Six interactive story chapters
- Chapter quizzes and a 10-question final assessment
- 10-stage CI/CD pipeline simulator
- Optional test-failure simulation
- Interactive GitHub Actions YAML editor
- Git command, terminology, and YAML reference
- Light and dark themes
- Browser-based progress persistence

## Run Locally

No package installation is required. From the project root:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/` in your browser.

You can also open `index.html` directly.

## Project Structure

```text
ci-cd-for-all/
├── index.html          # Dashboard and learning roadmap
├── chapters/
│   ├── chapter-1.html  # Git and feature branches
│   ├── chapter-2.html  # Commits and pushes
│   ├── chapter-3.html  # GitHub Actions triggers
│   ├── chapter-4.html  # Jobs, steps, and runners
│   ├── chapter-5.html  # Testing and failures
│   └── chapter-6.html  # Delivery and deployment
├── playground.html     # Pipeline and YAML simulators
├── docs.html           # Command and concept reference
├── exam.html           # Final assessment
└── assets/
    ├── shared.js       # Shared state and navigation
    └── styles.css      # Application styles
```

## Learning Flow

1. Open `index.html`.
2. Complete Chapters 1–6.
3. Use the playground to inspect the CI/CD stages.
4. Explore Git commands and workflow YAML in `docs.html`.
5. Take the final assessment.

## Progress Storage

Progress is saved in browser `localStorage`:

- `pipeline_quest_state_v1` — chapters, quizzes, theme, and exam state
- `pipelineQuestDocsGame` — documentation missions and XP

Progress is stored locally and is not sent to a server. Clearing browser storage resets the application.

## Simulation Scope

The pipeline visualizer and YAML editor are browser-based educational simulations. They do not execute real GitHub Actions runners or deploy applications.
