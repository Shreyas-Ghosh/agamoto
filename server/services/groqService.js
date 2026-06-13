import Groq from 'groq-sdk';
import axios from 'axios';

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
          model: 'qwen3:8b',
          messages: [
            { role: 'system', content: systemMessage(language) },
            { role: 'user', content: prompt(article.bodyText, language) }
          ],
          stream: false,
          format: 'json'
        });
        content = res.data.message.content;
      } else {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const completion = await groq.chat.completions.create({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: systemMessage(language) },
            { role: 'user', content: prompt(article.bodyText, language) }
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