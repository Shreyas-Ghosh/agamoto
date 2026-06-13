# Contributing to Agamoto

Thank you for your interest in contributing to **Agamoto**! This document provides guidelines and instructions for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## Getting Started

1. **Fork** the repository on GitHub/GitLab
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/agamoto.git
   cd agamoto
   ```
3. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

### Prerequisites

- Node.js 18+
- npm 9+
- *(Optional)* [Ollama](https://ollama.ai) for local AI testing

### Backend

```bash
cd server
cp .env.example .env
# Fill in your API keys in .env
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Making Changes

### Code Style

- **Frontend**: React functional components with hooks. No class components.
- **Styling**: Vanilla CSS with inline styles. **Do NOT use Tailwind CSS** — the project uses a custom glassmorphism design system via `glass-panel` class and CSS custom properties.
- **Backend**: ES Modules (`import`/`export`). No CommonJS (`require`).
- **Formatting**: Use Prettier with the project's `.prettierrc` configuration.

### Key Architecture Rules

1. All components go in `client/src/components/`
2. i18n translations go in `client/src/i18n.js` — every user-visible string must be translated to all 3 languages (EN, HI, TE)
3. AI provider logic lives in `server/services/groqService.js` — both Groq and Ollama are handled here
4. The Groq prompt in `groqService.js` must keep JSON keys in English while translating values to the target language

### Testing Your Changes

```bash
# Build check (client)
cd client && npm run build

# Lint check (client)
cd client && npm run lint

# Server smoke test
cd server && node index.js
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]
```

### Types

| Type | Description |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Code style (formatting, no logic change) |
| `refactor` | Code refactoring |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Build process, tooling, dependencies |

### Examples

```
feat(client): add category filter to event timeline
fix(server): handle empty Serper API response gracefully
docs: update setup instructions in README
chore: add Dockerfile for containerized deployment
```

## Pull Request Process

1. Ensure your code **builds without errors** (`npm run build`)
2. Ensure **no lint errors** (`npm run lint`)
3. Update documentation if you've changed any public APIs or user-facing features
4. Add translations for any new UI strings in all 3 languages
5. Write a clear PR description explaining **what** changed and **why**
6. Request review from a maintainer

### PR Title Format

Follow the same conventional commits format:
```
feat(client): add dark mode toggle
```

## Reporting Issues

When reporting bugs, please include:

1. **Steps to reproduce** the issue
2. **Expected behavior** vs **actual behavior**
3. **Browser and OS** information
4. **Console errors** (if any)
5. **Screenshots** (if applicable)

Use the issue templates when available.

---

## 📄 License

By contributing to Agamoto, you agree that your contributions will be licensed under the [AGPLv3 License](LICENSE).
