import { fetchRssAsArticles } from './rssToJson.js';

export const SOURCE_KEY = 'arsTechnica';
export const SOURCE_NAME = 'Ars Technica';
const FEED_URL = 'https://feeds.arstechnica.com/arstechnica/index';

export function fetchArticles() {
  return fetchRssAsArticles(FEED_URL, SOURCE_KEY, SOURCE_NAME);
}
