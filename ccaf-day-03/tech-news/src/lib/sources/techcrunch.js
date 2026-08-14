import { fetchRssAsArticles } from './rssToJson.js';

export const SOURCE_KEY = 'techcrunch';
export const SOURCE_NAME = 'TechCrunch';
const FEED_URL = 'https://techcrunch.com/feed/';

export function fetchArticles() {
  return fetchRssAsArticles(FEED_URL, SOURCE_KEY, SOURCE_NAME);
}
