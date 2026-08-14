import { stripHtml, extractFirstImgSrc, simpleHash } from '../text.js';
import { deriveCategories } from '../categorize.js';
import { estimateReadingTime } from '../readingTime.js';

const RSS2JSON_ENDPOINT = 'https://api.rss2json.com/v1/api.json?rss_url=';

export async function fetchRssAsArticles(feedUrl, sourceKey, sourceName) {
  const res = await fetch(RSS2JSON_ENDPOINT + encodeURIComponent(feedUrl));
  if (!res.ok) throw new Error(`${sourceName} request failed: ${res.status}`);
  const data = await res.json();
  if (data.status !== 'ok' || !Array.isArray(data.items)) {
    throw new Error(`${sourceName} feed conversion failed`);
  }

  return data.items.map((item) => {
    const descriptionText = stripHtml(item.description || item.content || '');
    const headline = item.title || '(untitled)';
    return {
      id: `${sourceKey}-${simpleHash(item.link || headline)}`,
      sourceKey,
      source: sourceName,
      headline,
      sourceUrl: item.link,
      publishedAt: item.pubDate,
      thumbnail: item.thumbnail || extractFirstImgSrc(item.description) || null,
      descriptionText,
      categories: deriveCategories(`${headline} ${descriptionText}`),
      readingTimeMin: estimateReadingTime(descriptionText),
    };
  });
}
