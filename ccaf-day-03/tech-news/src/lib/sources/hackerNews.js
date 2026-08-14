import { deriveCategories } from '../categorize.js';
import { estimateReadingTime } from '../readingTime.js';

const ENDPOINT = 'https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=50';

export const SOURCE_KEY = 'hackerNews';
export const SOURCE_NAME = 'Hacker News';

export async function fetchArticles() {
  const res = await fetch(ENDPOINT);
  if (!res.ok) throw new Error(`Hacker News request failed: ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data.hits)) throw new Error('Hacker News response missing hits');

  return data.hits
    .filter((hit) => hit.title)
    .map((hit) => {
      const descriptionText = hit.story_text || hit.title;
      return {
        id: `hn-${hit.objectID}`,
        sourceKey: SOURCE_KEY,
        source: SOURCE_NAME,
        headline: hit.title,
        sourceUrl: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
        publishedAt: hit.created_at,
        thumbnail: null,
        descriptionText,
        categories: deriveCategories(`${hit.title} ${descriptionText}`),
        readingTimeMin: estimateReadingTime(descriptionText),
      };
    });
}
