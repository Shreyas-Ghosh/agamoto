import Groq from 'groq-sdk';

const prompt = (text) => `
You are a competitive intelligence analyst. Given the following news article,
extract structured data and return ONLY valid JSON with no explanation:

{
  "sentiment": 0.0,
  "category": "product launch",
  "key_signals": ["signal 1", "signal 2"],
  "swot": {
    "strength": null,
    "weakness": null,
    "opportunity": null,
    "threat": null
  },
  "summary": "one sentence summary"
}

sentiment is a float from -1.0 (very negative) to 1.0 (very positive).
category is one of: "product launch" | "funding" | "partnership" | "regulatory" | "executive" | "other"
key_signals are 2-3 strategic takeaways, max 10 words each.

Article:
${text}
`;

export async function extractSignals(articles) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const results = await Promise.all(articles.map(async (article) => {
    try {
      const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt(article.bodyText) }],
        response_format: { type: 'json_object' },
      });
      const parsed = JSON.parse(completion.choices[0].message.content);
      return { ...parsed, title: article.title, url: article.url, date: article.date };
    } catch {
      return null;
    }
  }));

  return results.filter(Boolean);
}