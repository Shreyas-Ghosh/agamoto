# Competitive Intelligence Dashboard — Project Spec

> **Hackathon project** | Solo | 2-day build  
> **Topic:** General | **Track:** AI / Productivity

---

## 1. Problem Statement

Tracking competitors is time-consuming and scattered. Analysts manually browse news, copy-paste into spreadsheets, and form gut-feel opinions. There is no fast, unified way to go from a company name to a structured intelligence brief.

**This project solves that:** type a company name, get a live dashboard of news sentiment, strategic signals, a SWOT summary, and an exportable report — all in under 30 seconds.

---

## 2. Proposed Solution

A web application that accepts a company name, aggregates recent news via a search API, runs each article through Groq (LLaMA 3.3) to extract structured signals, and renders a visual intelligence dashboard with charts, a news timeline, a SWOT card, and a one-click PDF export.

---

## 3. Core Features

### MVP (must have by demo)
- [ ] Company search input
- [ ] News article fetch via Serper / Tavily API (10–20 results)
- [ ] Per-article AI extraction via Groq API (sentiment score, category, key signals, SWOT, summary)
- [ ] Sentiment trend chart (Recharts line chart)
- [ ] News event timeline (chronological cards)
- [ ] SWOT summary card (aggregated across all articles)
- [ ] PDF export (jsPDF + html2canvas)

### Stretch goals (if time permits)
- [ ] Multi-company comparison (side-by-side sentiment)
- [ ] Category filter (product launch / funding / regulatory / etc.)
- [ ] Caching layer so repeated searches don't re-hit the API
- [ ] Shareable link per company report

---

## 4. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React + Vite | UI framework |
| Charting | Recharts | Sentiment line chart |
| Styling | Tailwind CSS | Utility-first layout |
| Backend | Node.js + Express | API server, pipeline orchestration |
| News data | Serper.dev API | Fetch recent news articles |
| Scraping | Axios + Cheerio | Extract article body text from URLs |
| AI extraction | Groq API (`llama-3.3-70b-versatile`) | Structured JSON extraction per article |
| PDF export | jsPDF + html2canvas | One-click downloadable report |
| Deployment | Vercel (frontend) + Render (backend) | Free-tier hosting |

---

## 5. System Architecture

```
User
 │
 │  POST /api/analyze { company: "OpenAI" }
 ▼
Express Server
 ├── newsService.js      → Serper API → fetch 10-20 article URLs
 │                       → Cheerio scrape → extract body text
 │
 └── groqService.js    → Groq API (parallel Promise.all)
                         → Returns per-article JSON:
                           { sentiment, category, key_signals, swot, summary }
 │
 │  Aggregator: merge sentiments, combine SWOT entries, sort by date
 │
 │  JSON response → React frontend
 ▼
React Dashboard
 ├── SearchBar
 ├── SentimentChart     (Recharts)
 ├── EventTimeline      (news cards)
 ├── SWOTCard           (S/W/O/T grid)
 └── ExportButton       (jsPDF)
```

---

## 6. Groq Extraction Prompt

Each article is sent to Groq with the following prompt. The `response_format: { type: "json_object" }` parameter enforces clean JSON output — no prose wrapping:

```
You are a competitive intelligence analyst. Given the following news article,
extract structured data and return ONLY valid JSON with no explanation:

{
  "sentiment": float,         // -1.0 (very negative) to 1.0 (very positive)
  "category": string,         // one of: "product launch" | "funding" | "partnership" | "regulatory" | "executive" | "other"
  "key_signals": [string],    // 2-3 strategic takeaways, max 10 words each
  "swot": {
    "strength": string|null,
    "weakness": string|null,
    "opportunity": string|null,
    "threat": string|null
  },
  "summary": string           // 1-sentence plain English summary
}

Article:
{article_text}
```

---

## 7. Folder Structure

```
ci-dashboard/
├── server/
│   ├── index.js
│   ├── routes/
│   │   └── analyze.js
│   ├── services/
│   │   ├── newsService.js
│   │   └── groqService.js
│   └── .env                  # GROQ_API_KEY, SERPER_API_KEY
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── SentimentChart.jsx
│   │   │   ├── EventTimeline.jsx
│   │   │   ├── SWOTCard.jsx
│   │   │   └── ExportButton.jsx
│   │   └── api/
│   │       └── analyze.js
│   └── vite.config.js
│
├── SPEC.md                   ← this file
└── README.md
```

---

## 8. Data Flow (Step by Step)

1. User types a company name and hits Search
2. Frontend sends `POST /api/analyze` with `{ company }`
3. Server calls Serper API → returns list of news article URLs + titles + dates
4. Server scrapes each URL with Cheerio to extract clean article body text
5. Server sends all articles to Groq in **parallel** (`Promise.all`) with the extraction prompt
6. Groq (LLaMA 3.3) returns structured JSON for each article
7. Server aggregator merges results: averages sentiment by date, combines SWOT entries, sorts events chronologically
8. Server returns a single JSON payload to the frontend
9. React renders: sentiment chart, event timeline, SWOT card
10. User optionally clicks Export → jsPDF screenshots the dashboard and downloads a PDF

---

## 9. API Keys Needed

| Service | Free Tier | Sign Up |
|---|---|---|
| Groq | Free, no credit card | https://console.groq.com |
| Serper.dev | 2,500 free queries | https://serper.dev |

---

## 10. Key Technical Decisions

- **Parallel API calls** — articles are processed with `Promise.all()`, not sequentially. For 15 articles this reduces Groq wait time from ~45s to ~5s.
- **Groq over other LLM APIs** — completely free, no credit card, and LLaMA 3.3 70B is fast and accurate enough for structured extraction. `response_format: { type: "json_object" }` enforces clean JSON output.
- **Cheerio over Puppeteer** — no headless browser needed, much faster and no extra dependencies.
- **Recharts over D3** — simpler React integration, sufficient for a sentiment line chart.
- **jsPDF + html2canvas** — two-line PDF export by screenshotting the rendered dashboard div.
- **No database** — results are ephemeral per search. A simple in-memory cache (JS Map) is enough for demo purposes.

---

## 11. Success Criteria (Demo Checklist)

- [ ] Search returns results in under 30 seconds
- [ ] Sentiment chart renders with at least 5 data points
- [ ] SWOT card has at least one entry per quadrant
- [ ] Event timeline shows at least 5 news items
- [ ] PDF export downloads successfully
- [ ] No crashes during live demo
