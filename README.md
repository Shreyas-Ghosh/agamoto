# Agamoto

**AI-Powered Competitive Intelligence Dashboard**

Type a company name → get an instant intelligence brief with sentiment analysis, SWOT breakdown, strategic signals, and a news timeline — all powered by LLMs.

---

## ✨ Features

- **Instant Intelligence Reports** — Enter any company name and get a structured competitive intelligence dashboard in under 30 seconds
- **AI-Powered Analysis** — Each news article is processed through LLMs (Groq cloud or Ollama local) to extract sentiment, SWOT, and strategic signals
- **Sentiment Trend Chart** — Visualize how market sentiment changes over time with an interactive line chart
- **SWOT Analysis** — Auto-generated Strengths, Weaknesses, Opportunities, and Threats aggregated across all articles
- **News Event Timeline** — Categorized, chronological view of recent news with sentiment indicators
- **Multi-Language Support** — Full UI and AI output in English, Hindi (हिंदी), and Telugu (తెలుగు)
- **PDF Export** — One-click download of the full intelligence report
- **BYOK / Local AI** — Toggle between Groq (cloud) and Ollama (local) for privacy-sensitive analysis
- **User Reviews** — Community review system with persistent localStorage storage

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Styling | Custom CSS (glassmorphism, no Tailwind) |
| Charts | Recharts |
| i18n | react-i18next |
| PDF Export | jsPDF + html2canvas |
| Backend | Node.js + Express |
| News Data | Serper.dev API |
| Scraping | Axios + Cheerio |
| AI (Cloud) | Groq API (`llama-3.1-8b-instant`) |
| AI (Local) | Ollama (`qwen3:8b`) |
| Deployment | Vercel (frontend) + Render (backend) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- API keys: [Groq](https://console.groq.com) (free) and [Serper.dev](https://serper.dev) (2,500 free queries)
- *(Optional)* [Ollama](https://ollama.ai) for local AI

### 1. Clone

```bash
git clone https://github.com/Shreyas-Ghosh/agamoto.git
cd agamoto
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
SERPER_API_KEY=your_serper_api_key
PORT=3001
```

Start the server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🌐 Environment Variables

| Variable | Location | Description |
|---|---|---|
| `GROQ_API_KEY` | Server `.env` | Groq API key for cloud AI |
| `SERPER_API_KEY` | Server `.env` | Serper.dev API key for news search |
| `PORT` | Server `.env` | Server port (default: 3001) |
| `VITE_API_URL` | Client `.env.production` | Backend URL for production builds |

---

## 📦 Deployment

- **Frontend:** Deployed on [Vercel](https://vercel.com). Set `VITE_API_URL` in Vercel environment settings.
- **Backend:** Deployed on [Render](https://render.com). Set `GROQ_API_KEY` and `SERPER_API_KEY` in Render environment settings.

---

## 📁 Project Structure

```
agamoto/
├── server/
│   ├── index.js              # Express server entry
│   ├── routes/
│   │   └── analyze.js        # POST /api/analyze (with caching)
│   └── services/
│       ├── newsService.js     # Serper API + Cheerio scraping
│       └── groqService.js     # Groq/Ollama AI extraction
│
├── client/
│   ├── index.html
│   └── src/
│       ├── App.jsx            # Main app with dashboard
│       ├── index.css          # Global styles + animations
│       ├── i18n.js            # EN/HI/TE translations
│       └── components/
│           ├── SearchBar.jsx
│           ├── SentimentChart.jsx
│           ├── EventTimeline.jsx
│           ├── SWOTCard.jsx
│           ├── ExportButton.jsx
│           └── ReviewSystem.jsx
│
├── SPEC.md
└── README.md
```

---

## 📄 License

MIT
