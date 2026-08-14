import { load } from '../lib/storage.js';
import { PAGE_SIZE } from './selectors.js';
import * as actions from './actions.js';

export const NEWS_SOURCE_KEYS = ['hackerNews', 'techcrunch', 'arsTechnica', 'theVerge'];
export const REPO_SOURCE_KEYS = ['githubTrending'];
export const ALL_SOURCE_KEYS = [...NEWS_SOURCE_KEYS, ...REPO_SOURCE_KEYS];

function initialSourceState() {
  const sources = {};
  for (const key of ALL_SOURCE_KEYS) {
    sources[key] = { status: 'idle', error: null, fetchedAt: null, count: 0 };
  }
  return sources;
}

export function createInitialState() {
  const persisted = load();
  return {
    articles: [],
    repos: [],
    sources: initialSourceState(),
    lastUpdated: null,
    ui: {
      theme: persisted.theme,
      search: '',
      activeCategory: 'All',
      visibleCount: PAGE_SIZE,
      bookmarksOnly: false,
    },
    bookmarks: persisted.bookmarks,
  };
}

function computeLastUpdated(sources) {
  let latest = null;
  for (const key of ALL_SOURCE_KEYS) {
    const source = sources[key];
    if (source.status === 'success' && source.fetchedAt) {
      if (!latest || source.fetchedAt > latest) latest = source.fetchedAt;
    }
  }
  return latest;
}

export function reducer(state, action) {
  switch (action.type) {
    case actions.FETCH_SOURCE_START: {
      return {
        ...state,
        sources: {
          ...state.sources,
          [action.sourceKey]: { ...state.sources[action.sourceKey], status: 'loading', error: null },
        },
      };
    }

    case actions.FETCH_SOURCE_SUCCESS: {
      const isRepoSource = REPO_SOURCE_KEYS.includes(action.sourceKey);
      const nextSources = {
        ...state.sources,
        [action.sourceKey]: {
          status: 'success',
          error: null,
          fetchedAt: action.fetchedAt,
          count: action.items.length,
        },
      };

      if (isRepoSource) {
        return {
          ...state,
          repos: action.items,
          sources: nextSources,
          lastUpdated: computeLastUpdated(nextSources),
        };
      }

      const merged = [
        ...state.articles.filter((a) => a.sourceKey !== action.sourceKey),
        ...action.items,
      ].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

      return {
        ...state,
        articles: merged,
        sources: nextSources,
        lastUpdated: computeLastUpdated(nextSources),
      };
    }

    case actions.FETCH_SOURCE_ERROR: {
      return {
        ...state,
        sources: {
          ...state.sources,
          [action.sourceKey]: {
            ...state.sources[action.sourceKey],
            status: 'error',
            error: action.message,
          },
        },
      };
    }

    case actions.SET_SEARCH:
      return { ...state, ui: { ...state.ui, search: action.value, visibleCount: PAGE_SIZE } };

    case actions.SET_CATEGORY:
      return { ...state, ui: { ...state.ui, activeCategory: action.category, visibleCount: PAGE_SIZE } };

    case actions.SET_THEME:
      return { ...state, ui: { ...state.ui, theme: action.theme } };

    case actions.TOGGLE_THEME:
      return { ...state, ui: { ...state.ui, theme: state.ui.theme === 'dark' ? 'light' : 'dark' } };

    case actions.INCREMENT_VISIBLE:
      return { ...state, ui: { ...state.ui, visibleCount: state.ui.visibleCount + action.step } };

    case actions.RESET_VISIBLE:
      return { ...state, ui: { ...state.ui, visibleCount: PAGE_SIZE } };

    case actions.TOGGLE_BOOKMARKS_ONLY:
      return {
        ...state,
        ui: { ...state.ui, bookmarksOnly: !state.ui.bookmarksOnly, visibleCount: PAGE_SIZE },
      };

    case actions.TOGGLE_BOOKMARK_ARTICLE: {
      const exists = state.bookmarks.articles.some((a) => a.id === action.snapshot.id);
      const articles = exists
        ? state.bookmarks.articles.filter((a) => a.id !== action.snapshot.id)
        : [...state.bookmarks.articles, action.snapshot];
      return { ...state, bookmarks: { ...state.bookmarks, articles } };
    }

    case actions.TOGGLE_BOOKMARK_REPO: {
      const exists = state.bookmarks.repos.some((r) => r.id === action.snapshot.id);
      const repos = exists
        ? state.bookmarks.repos.filter((r) => r.id !== action.snapshot.id)
        : [...state.bookmarks.repos, action.snapshot];
      return { ...state, bookmarks: { ...state.bookmarks, repos } };
    }

    default:
      return state;
  }
}
