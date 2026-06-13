# Changelog

All notable changes to Agamoto will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-06-13

### Added
- In-memory caching for API responses (5-minute TTL)
- Health check endpoint (`GET /api/health`)
- Loading skeleton with shimmer animations
- Fade-in animations on dashboard sections
- Two additional animated background bubbles
- Responsive design with media queries for mobile
- `.editorconfig`, `CONTRIBUTING.md`, `USER_MANUAL.md`, `AGENTS.md`
- `SECURITY.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md`
- `.env.example` for both server and client
- `Dockerfile` and `.dockerignore` for containerization
- Prettier configuration

### Changed
- Migrated SWOTCard, EventTimeline, and SentimentChart from Tailwind classes to vanilla CSS inline styles
- Updated SentimentChart tooltip and axis colors to match dark theme
- Modernized README with proper project documentation
- Updated `index.html` with SEO meta tags and proper title
- Enhanced `.gitignore` with comprehensive ignore rules

### Fixed
- Critical styling bug: three components used Tailwind CSS classes without Tailwind being installed
- PDF export now correctly captures dark backgrounds

### Removed
- Unused `App.css` (leftover Vite scaffold styles)

## [1.0.0] - 2026-06-12

### Added
- Initial release
- Company search with Serper.dev news API
- AI-powered analysis via Groq (cloud) and Ollama (local)
- Sentiment trend chart (Recharts)
- SWOT analysis card
- News event timeline with category pills
- PDF export (jsPDF + html2canvas)
- Multi-language support (English, Hindi, Telugu)
- User review system with localStorage persistence
- Glassmorphism UI with animated background bubbles
- AI provider toggle (Groq / Ollama)
