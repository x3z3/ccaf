import * as hackerNews from './hackerNews.js';
import * as techcrunch from './techcrunch.js';
import * as arsTechnica from './arsTechnica.js';
import * as theVerge from './theVerge.js';
import * as githubTrending from './githubTrending.js';
import { fetchSourceStart, fetchSourceSuccess, fetchSourceError } from '../../state/actions.js';

const NEWS_SOURCES = [
  { key: hackerNews.SOURCE_KEY, fetch: hackerNews.fetchArticles },
  { key: techcrunch.SOURCE_KEY, fetch: techcrunch.fetchArticles },
  { key: arsTechnica.SOURCE_KEY, fetch: arsTechnica.fetchArticles },
  { key: theVerge.SOURCE_KEY, fetch: theVerge.fetchArticles },
];

const REPO_SOURCES = [{ key: githubTrending.SOURCE_KEY, fetch: githubTrending.fetchRepos }];

async function runSource(dispatch, sourceKey, fetchFn) {
  dispatch(fetchSourceStart(sourceKey));
  try {
    const items = await fetchFn();
    dispatch(fetchSourceSuccess(sourceKey, items, new Date().toISOString()));
  } catch (err) {
    console.error(`Failed to fetch ${sourceKey}:`, err);
    dispatch(fetchSourceError(sourceKey, err.message || 'Unknown error'));
  }
}

export function fetchAll(dispatch) {
  const allSources = [...NEWS_SOURCES, ...REPO_SOURCES];
  return Promise.allSettled(allSources.map((source) => runSource(dispatch, source.key, source.fetch)));
}
