import 'dotenv/config';
import { extractSignals } from './services/groqService.js';

const dummyArticles = [
  {
    title: 'Test Article',
    url: 'http://example.com',
    date: '1 day ago',
    bodyText: 'Microsoft today announced a new AI feature that increases revenue by 10%. However, regulatory concerns loom.'
  }
];

async function test() {
  console.log('Testing Groq...');
  const groqRes = await extractSignals(dummyArticles, 'en', 'groq');
  console.log('Groq result:', JSON.stringify(groqRes, null, 2));

  console.log('\nTesting Ollama...');
  try {
    const ollamaRes = await extractSignals(dummyArticles, 'en', 'ollama');
    console.log('Ollama result:', JSON.stringify(ollamaRes, null, 2));
  } catch (err) {
    console.log('Ollama failed:', err.message);
  }
}

test();
