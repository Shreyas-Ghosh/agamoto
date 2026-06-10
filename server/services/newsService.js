import axios from 'axios';
import * as cheerio from 'cheerio';

export async function fetchNews(company) {
  const response = await axios.post('https://google.serper.dev/news', 
    { q: `${company} news`, num: 15 },
    { headers: { 'X-API-KEY': process.env.SERPER_API_KEY, 'Content-Type': 'application/json' } }
  );

  const articles = response.data.news || [];

  const scraped = await Promise.allSettled(articles.map(async (article) => {
    try {
      const { data } = await axios.get(article.link, { 
        timeout: 4000,
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      const $ = cheerio.load(data);
      const bodyText = $('p').map((_, el) => $(el).text()).get().join(' ').slice(0, 3000);
      return { title: article.title, url: article.link, date: article.date, bodyText };
    } catch {
      // Use just the title/snippet if scraping fails
      return { title: article.title, url: article.link, date: article.date, bodyText: article.snippet || article.title };
    }
  }));

  return scraped
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
}