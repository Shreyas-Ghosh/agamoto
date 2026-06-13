# Agamoto: Project Handoff Document

This document contains all the necessary context to seamlessly continue development on the **Agamoto** project in a new AI session.

## 1. Project Overview
- **Name:** Agamoto
- **Main Goal:** A web application for competitive intelligence analysis. Users enter a company name, and the application generates a comprehensive intelligence report (sentiment analysis, SWOT, and event timeline) based on recent news articles.
- **Current Status:** The core functionality, including the new UI redesign, AI integration, multi-lingual support, and a localized review system, is working and recently pushed. The app is deployed on Vercel (frontend) and Render (backend).
- **Key Requirements:**
  - Fast and fluid UX using React.
  - Integration with LLMs to process and extract insights from text.
  - Full internationalization support (English, Hindi, Telugu).
  - Ability to choose between a cloud AI provider (Groq) and a local AI provider (Ollama).

## 2. Technical Context
- **Workspace Path:** `/home/shreyas/Shreyas/agamoto`
- **Frontend Stack (Client):**
  - **Framework:** React 19 + Vite (`client/` folder)
  - **Styling:** Custom CSS (glassmorphism, blue/purple gradients, yellow accents, floating bubbles). No Tailwind.
  - **Libraries:** `react-i18next` (localization), `recharts` (sentiment charts), `html2canvas` & `jspdf` (PDF export).
  - **Environment Variables:** `VITE_API_URL` points to the backend (falls back to `http://localhost:3001` locally).
- **Backend Stack (Server):**
  - **Framework:** Node.js + Express (`server/` folder)
  - **AI Integration:** `groq-sdk` for cloud LLM, `axios` for local Ollama API (`http://localhost:11434/api/chat`).
  - **Environment Variables:** `GROQ_API_KEY` (required for cloud fallback), `PORT` (default 3001).
- **Version Control:** Connected to GitHub (`https://github.com/Shreyas-Ghosh/agamoto.git`) and GitLab (`https://code.swecha.org/Shreyas.Ghosh/agamoto.git`).
- **Commands Used:**
  - Client: `npm run dev` / `npm run build`
  - Server: `npm start` (or `node index.js` / `node test.js` for testing)
  - Git: standard HTTPS push commands.

## 3. Decisions Made
- **UI/UX:** Moved to a highly polished, professional glassmorphism look with an animated dark background (`#0a0514` base).
- **AI Models:**
  - **Ollama:** Switched to `qwen3:8b` (instead of `llama3.2`) because the user has this model installed locally.
  - **Groq:** Switched to `llama-3.1-8b-instant` (instead of 70b) to avoid strict daily token rate limits.
- **Data Persistence:** The newly added User Review System stores reviews in the browser's `localStorage` rather than a backend database to keep the architecture simple.
- **PDF Export Fix:** `html2canvas` defaults to a transparent background which renders white on PDF. Explicitly set `backgroundColor: '#0a0514'` during export so white text remains visible.

## 4. Work Completed
- **UI Redesign:** Implemented a new design system in `App.jsx` and `index.css`.
- **Localization (i18n):** Translated all UI text to Hindi and Telugu. Fixed the backend AI prompt so that it explicitly translates its generated JSON values (`key_signals`, `swot`, `summary`) into the target language chosen by the user.
- **BYOK (Bring Your Own Key) / Local AI:** Added a dropdown in the UI to toggle between `groq` and `ollama`. The backend routes the request based on this toggle.
- **Review System:** Created `ReviewSystem.jsx` with 25 pre-made realistic reviews using Indian names (e.g., Aarav Sharma). Users can submit new reviews which persist in `localStorage`.
- **Git Push:** Successfully staged, committed, and pushed changes to both GitHub and GitLab main branches. (Restored HTTPS remotes after temporarily trying SSH).

## 5. Current State
- **What is working:** The app correctly fetches news, analyzes it via the chosen AI provider (translating the output if required), and displays it on the glassmorphic dashboard. PDF export works with the correct dark background. The review system successfully adds and persists reviews.
- **What is not working / Bugs:** There are no known active bugs. The recent rate-limit and missing model issues were resolved.
- **Where we left off:** The user confirmed that the AI is now working properly after the model changes. This document is being generated immediately after resolving that issue.

## 6. Open Tasks & Next Steps
There are no immediate critical errors. Potential next steps depending on user preference:
1. Ensure the user can easily host or connect to a public Ollama instance if they want the "BYOK" feature to work in the production environment (currently it points to `localhost:11434`, which only works locally).
2. Continue building out robust testing for the API routes.
3. Potentially migrate `localStorage` reviews to a real database (MongoDB / PostgreSQL) if the user wants global persistence in production.

## 7. Important Conversation History
- **Preferences:** The user strongly values a professional but colorful UI ("pretty colors like blue and purple with hints of yellow and make gradients and floating bubbly stuff behind but keep it professional").
- **Language Requirements:** Whenever translating to Hindi/Telugu, the AI *must* output valid JSON where the keys remain in English, but the *values* are translated into the native script. This took iterations to get right in `groqService.js`.
- **Vercel/Render Deployment:** The user has the frontend deployed on Vercel and the backend on Render. It's important that any environment variables or API URLs added handle this gracefully (e.g., using `import.meta.env.VITE_API_URL` with a local fallback).

## 8. Copy-Paste Context
### 8.1 Backend Prompt Engineering (`server/services/groqService.js`)
*This is critical for maintaining the i18n capabilities of the AI:*
```javascript
const prompt = (text, language) => {
  const targetLang = language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English';
  return `
You are a competitive intelligence analyst. Given the following news article,
extract structured data and return ONLY valid JSON with no explanation.
{
  "sentiment": 0.0,
  "category": "product launch",
  "key_signals": ["signal 1 in ${targetLang}", "signal 2 in ${targetLang}"],
  "swot": {
    "strength": "text in ${targetLang} or null",
    "weakness": "text in ${targetLang} or null",
    "opportunity": "text in ${targetLang} or null",
    "threat": "text in ${targetLang} or null"
  },
  "summary": "one sentence summary in ${targetLang}"
}
IMPORTANT RULES:
1. The JSON keys MUST remain in English.
2. The JSON values for 'key_signals', 'swot' fields, and 'summary' MUST be written entirely in ${targetLang}.
3. 'sentiment' is a float from -1.0 (very negative) to 1.0 (very positive).
4. 'category' MUST be one of these exact English strings: "product launch" | "funding" | "partnership" | "regulatory" | "executive" | "other"

Article:
${text}
`;
};
```

### 8.2 Client API Fetch Fallback (`client/src/App.jsx`)
*This allows the code to work in both local and production environments:*
```javascript
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const res = await fetch(`${apiUrl}/api/analyze`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ company: companyName, language: i18n.language, provider }),
});
```

### 8.3 PDF Export Configuration (`client/src/components/ExportButton.jsx`)
*Crucial fix to ensure white text shows up:*
```javascript
const canvas = await html2canvas(element, { 
  scale: 2, 
  backgroundColor: '#0a0514' 
});
```
