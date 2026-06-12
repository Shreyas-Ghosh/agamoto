import Groq from 'groq-sdk';
import axios from 'axios';

const prompt = (text) => `
You are a competitive intelligence analyst. Given the following news article,
extract structured data and return ONLY valid JSON with no explanation.
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

const systemMessage = (language) => {
  if (language === 'hi') return 'You MUST respond entirely in Hindi. Every text field in the JSON must be written in Hindi script. Do not use English in any field.';
  if (language === 'te') return 'You MUST respond entirely in Telugu. Every text field in the JSON must be written in Telugu script. Do not use English in any field.';
  return 'Respond in English.';
};

export async function extractSignals(articles, language = 'en', provider = 'groq') {
  const results = await Promise.all(articles.map(async (article) => {
    try {
      let content = '';

      if (provider === 'ollama') {
        const res = await axios.post('http://localhost:11434/api/chat', {
          model: 'llama3.2',
          messages: [
            { role: 'system', content: systemMessage(language) },
            { role: 'user', content: prompt(article.bodyText) }
          ],
          stream: false,
          format: 'json'
        });
        content = res.data.message.content;
      } else {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const completion = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemMessage(language) },
            { role: 'user', content: prompt(article.bodyText) }
          ],
          response_format: { type: 'json_object' },
        });
        content = completion.choices[0].message.content;
      }

      const parsed = JSON.parse(content);
      return { ...parsed, title: article.title, url: article.url, date: article.date };
    } catch (err) {
      console.error(`AI extraction failed for provider ${provider}:`, err.message);
      return null;
    }
  }));
  return results.filter(Boolean);
}