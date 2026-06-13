# AGENTS.md — AI Agent Guidelines for Agamoto

This document provides context and guidelines for AI coding agents working on the Agamoto codebase.

## Project Overview

Agamoto is a competitive intelligence dashboard built with React 19 + Vite (frontend) and Node.js + Express (backend). It fetches news articles, analyzes them with LLMs, and presents structured intelligence reports.

## Architecture

```
client/                    # React 19 + Vite frontend
├── src/
│   ├── App.jsx            # Main app component, dashboard layout
│   ├── index.css          # Global styles, animations, design tokens
│   ├── i18n.js            # Translations (EN, HI, TE)
│   ├── main.jsx           # React entry point
│   └── components/
│       ├── SearchBar.jsx       # Company name input
│       ├── SentimentChart.jsx  # Recharts line chart
│       ├── EventTimeline.jsx   # News cards with pills
│       ├── SWOTCard.jsx        # 2x2 SWOT grid
│       ├── ExportButton.jsx    # PDF export via html2canvas + jsPDF
│       └── ReviewSystem.jsx    # User reviews with localStorage

server/                    # Node.js + Express backend
├── index.js               # Server entry, CORS, routes
├── routes/
│   └── analyze.js         # POST /api/analyze (with in-memory cache)
└── services/
    ├── newsService.js     # Serper.dev API + Cheerio scraping
    └── groqService.js     # Groq (cloud) + Ollama (local) AI
```

## Critical Rules

### Styling
- **DO NOT use Tailwind CSS.** Tailwind is NOT installed.
- Use **inline styles** and the **`glass-panel`** CSS class for glassmorphism panels.
- CSS custom properties are defined in `index.css` under `:root` (e.g., `--glass-bg`, `--glass-border`, `--bg-dark`).
- Fonts: `'Playfair Display'` for headings, `'Inter'` for body text.
- Color palette: dark purple base (`#0a0514`), blue/purple/yellow accent bubbles, white text.

### Internationalization (i18n)
- All user-visible strings MUST be added to `i18n.js` in all 3 languages: English, Hindi, Telugu.
- AI-generated content is translated via the prompt in `groqService.js`.
- JSON keys in AI output MUST remain in English; only values are translated.

### AI Integration
- `groqService.js` handles both Groq and Ollama providers.
- Groq model: `llama-3.1-8b-instant` (chosen to avoid rate limits).
- Ollama model: `qwen3:8b` (user's locally installed model).
- The system message forces language-specific output for Hindi/Telugu.

### Backend
- ES Modules only (`import`/`export`), no CommonJS.
- Express 5 is used (not Express 4).
- In-memory cache in `analyze.js` with 5-minute TTL — be aware of this when debugging "stale" results.
- `SERPER_API_KEY` and `GROQ_API_KEY` are required environment variables.

### Frontend
- React 19 with functional components and hooks only.
- `VITE_API_URL` env var points to backend; falls back to `http://localhost:3001`.
- PDF export uses `html2canvas` with `backgroundColor: '#0a0514'` to prevent white background issues.

## Common Tasks

### Adding a new UI string
1. Add the key to all 3 language objects in `client/src/i18n.js`
2. Use `const { t } = useTranslation()` in the component
3. Reference with `t('yourKey')`

### Adding a new component
1. Create in `client/src/components/`
2. Use `glass-panel` class for panel styling
3. Use inline styles matching the existing design system
4. Import and place in `App.jsx`

### Modifying the AI prompt
1. Edit `server/services/groqService.js`
2. Ensure the prompt still enforces English JSON keys with translated values
3. Test with all 3 languages

### Adding a new API route
1. Create in `server/routes/`
2. Import and mount in `server/index.js` under `/api`

## Testing

- **Client build**: `cd client && npm run build`
- **Client lint**: `cd client && npm run lint`
- **Server startup**: `cd server && node index.js`
- **Health check**: `GET /api/health`

## Deployment

- Frontend: Vercel (auto-deploys from `main` branch)
- Backend: Render (auto-deploys from `main` branch)
- Environment variables must be set in both platforms' dashboards.
