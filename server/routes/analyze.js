import express from 'express';
import { fetchNews } from '../services/newsService.js';
import { extractSignals } from '../services/groqService.js';

const router = express.Router();

// In-memory cache with 5-minute TTL
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

function getCacheKey(company, language, provider) {
  return `${company.toLowerCase().trim()}:${language}:${provider}`;
}

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

router.post('/analyze', async (req, res) => {
  try {
    let { company, language = 'en', provider = 'groq' } = req.body;
    if (!company || typeof company !== 'string') {
      return res.status(400).json({ error: 'Company name required' });
    }

    // Sanitize input
    company = company.trim().slice(0, 100);

    // Check cache
    const cacheKey = getCacheKey(company, language, provider);
    const cached = getCached(cacheKey);
    if (cached) {
      return res.json({ ...cached, cached: true });
    }

    const articles = await fetchNews(company);
    const signals = await extractSignals(articles, language, provider);

    // Aggregate sentiment by date
    const sentimentByDate = {};
    signals.forEach(({ date, sentiment }) => {
      if (!sentimentByDate[date]) sentimentByDate[date] = [];
      sentimentByDate[date].push(sentiment);
    });
    const sentimentChart = Object.entries(sentimentByDate).map(([date, values]) => ({
      date,
      sentiment: values.reduce((a, b) => a + b, 0) / values.length
    })).sort((a, b) => new Date(a.date) - new Date(b.date));

    // Aggregate SWOT
    const swot = { strengths: [], weaknesses: [], opportunities: [], threats: [] };
    signals.forEach(({ swot: s }) => {
      if (s?.strength) swot.strengths.push(s.strength);
      if (s?.weakness) swot.weaknesses.push(s.weakness);
      if (s?.opportunity) swot.opportunities.push(s.opportunity);
      if (s?.threat) swot.threats.push(s.threat);
    });

    const result = { signals, sentimentChart, swot, articleCount: articles.length };

    // Store in cache
    cache.set(cacheKey, { data: result, timestamp: Date.now() });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

export default router;