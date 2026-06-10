import express from 'express';
import { fetchNews } from '../services/newsService.js';
import { extractSignals } from '../services/groqService.js';

const router = express.Router();

router.post('/analyze', async (req, res) => {
  try {
    const { company } = req.body;
    if (!company) return res.status(400).json({ error: 'Company name required' });

    const articles = await fetchNews(company);
    const signals = await extractSignals(articles);

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

    res.json({ signals, sentimentChart, swot });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

export default router;