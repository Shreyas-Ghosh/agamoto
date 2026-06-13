# Agamoto — User Manual

## 📋 Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Using the Dashboard](#using-the-dashboard)
- [AI Provider Selection](#ai-provider-selection)
- [Language Support](#language-support)
- [Understanding the Report](#understanding-the-report)
- [Exporting Reports](#exporting-reports)
- [Review System](#review-system)
- [Troubleshooting](#troubleshooting)

---

## Overview

**Agamoto** is an AI-powered competitive intelligence dashboard. Enter any company name, and Agamoto will:

1. Fetch the latest news articles about that company
2. Analyze each article using AI to extract structured intelligence
3. Present a visual dashboard with sentiment trends, SWOT analysis, and a news timeline
4. Allow you to export the report as a PDF

---

## Getting Started

### Accessing the App

- **Production**: Visit the deployed URL on Vercel
- **Local Development**: Run `npm run dev` in the `client/` folder and open `http://localhost:5173`

### Requirements

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for news fetching and cloud AI)

---

## Using the Dashboard

### Step 1: Enter a Company Name

In the search bar at the top of the page, type the name of the company you want to analyze (e.g., "OpenAI", "Tesla", "Infosys").

### Step 2: Click Search

Press **Enter** or click the **Search** button. The analysis takes approximately **20–30 seconds** as it:
- Fetches 10–15 recent news articles
- Scrapes article content
- Sends each article through AI for structured extraction

A loading skeleton will appear while the analysis is in progress.

### Step 3: Review the Dashboard

Once complete, you'll see four sections:

1. **Company Header** — The company name and export button
2. **Sentiment Trend Chart** — A line chart showing sentiment over time
3. **SWOT Analysis** — Strengths, Weaknesses, Opportunities, and Threats
4. **News Event Timeline** — Individual news articles with AI-extracted signals

---

## AI Provider Selection

Agamoto supports two AI providers, selectable from the navbar:

### Groq (Cloud) — Default

- Uses `llama-3.1-8b-instant` model
- Requires internet connection
- Fast and reliable
- Free tier available at [console.groq.com](https://console.groq.com)

### Ollama (Local)

- Uses `qwen3:8b` model running locally
- Requires [Ollama](https://ollama.ai) installed and running on your machine
- No data leaves your machine — full privacy
- Only works in local development (not on deployed version)

**To switch**: Click the **GROQ** or **OLLAMA** button in the top navigation bar.

---

## Language Support

Agamoto supports three languages:

| Language | Code | Button Label |
|---|---|---|
| English | `en` | English |
| Hindi | `hi` | हिंदी |
| Telugu | `te` | తెలుగు |

**To switch**: Click the language pill in the top navigation bar.

When you switch languages:
- All UI text updates immediately
- The **next** search will instruct the AI to generate its analysis in the selected language
- Previously loaded results remain in their original language

> **Note**: The AI generates SWOT entries, key signals, and summaries in the selected language. JSON keys remain in English for technical compatibility.

---

## Understanding the Report

### Sentiment Trend Chart

- **Y-axis**: Sentiment score from -1.0 (very negative) to +1.0 (very positive)
- **X-axis**: Date of the news article
- **Zero line**: Dashed line at 0 represents neutral sentiment
- Hover over data points to see exact values

### SWOT Analysis

Each quadrant aggregates insights across all analyzed articles:

| Quadrant | Color | Meaning |
|---|---|---|
| 💪 Strengths | Green | Positive internal factors |
| ⚠️ Weaknesses | Red | Negative internal factors |
| 🚀 Opportunities | Blue | Positive external factors |
| 🔥 Threats | Orange | Negative external factors |

### News Event Timeline

Each card shows:
- **Category pill**: Color-coded (blue=product launch, green=funding, purple=partnership, red=regulatory, yellow=executive, gray=other)
- **Sentiment pill**: Green (positive), Red (negative), Gray (neutral)
- **Date**: When the article was published
- **Title**: Clickable link to the original article
- **Summary**: One-sentence AI-generated summary
- **Key Signals**: Strategic takeaways extracted by the AI

---

## Exporting Reports

1. Run a search and wait for results to load
2. Click the **Export PDF** button below the company name
3. A PDF file named `<CompanyName>_Intelligence_Report.pdf` will download automatically

The PDF captures the full dashboard including:
- Company header
- Sentiment chart
- SWOT analysis
- Event timeline

> **Note**: The PDF uses the dark background theme to ensure white text is visible.

---

## Review System

At the bottom of the page, you'll find the user review system:

### Reading Reviews
- Scroll through existing reviews from other users
- Each review shows the author's name, star rating, and comment

### Writing a Review
1. Enter your name
2. Select a star rating (1–5)
3. Write your experience
4. Click **Submit**

Reviews are stored in your browser's local storage and persist across sessions.

---

## Troubleshooting

### "Something went wrong" error

- Check your internet connection
- Ensure the backend server is running (for local development)
- Check the browser console for specific error messages

### Analysis takes too long

- The analysis typically takes 20–30 seconds
- If it takes longer, the news API or AI provider may be experiencing high traffic
- Try again in a few minutes

### Ollama not working

- Ensure Ollama is installed and running: `ollama serve`
- Verify the model is downloaded: `ollama pull qwen3:8b`
- Ollama only works locally (localhost:11434), not on deployed versions

### PDF export shows blank/white

- This is typically a browser rendering issue
- Try using Chrome or Edge for best PDF export results
- Ensure the dashboard has fully loaded before exporting

### Language not changing in AI output

- Language selection affects the **next** search, not the current results
- Select your language **before** running a search

---

## Keyboard Shortcuts

| Action | Shortcut |
|---|---|
| Search | `Enter` (when focused on search bar) |

---

## Support

For issues and feature requests, please open an issue on the project's [GitHub repository](https://github.com/Shreyas-Ghosh/agamoto/issues) or [GitLab repository](https://code.swecha.org/Shreyas.Ghosh/agamoto/-/issues).
