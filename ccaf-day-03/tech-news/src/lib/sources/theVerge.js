import { fetchRssAsArticles } from './rssToJson.js';

export const SOURCE_KEY = 'theVerge';
export const SOURCE_NAME = 'The Verge';
const FEED_URL = 'https://www.theverge.com/rss/index.xml';

export function fetchArticles() {
  return fetchRssAsArticles(FEED_URL, SOURCE_KEY, SOURCE_NAME);
}
