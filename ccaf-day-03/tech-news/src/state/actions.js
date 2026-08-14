export const FETCH_SOURCE_START = 'FETCH_SOURCE_START';
export const FETCH_SOURCE_SUCCESS = 'FETCH_SOURCE_SUCCESS';
export const FETCH_SOURCE_ERROR = 'FETCH_SOURCE_ERROR';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_THEME = 'SET_THEME';
export const TOGGLE_THEME = 'TOGGLE_THEME';
export const INCREMENT_VISIBLE = 'INCREMENT_VISIBLE';
export const RESET_VISIBLE = 'RESET_VISIBLE';
export const TOGGLE_BOOKMARK_ARTICLE = 'TOGGLE_BOOKMARK_ARTICLE';
export const TOGGLE_BOOKMARK_REPO = 'TOGGLE_BOOKMARK_REPO';
export const TOGGLE_BOOKMARKS_ONLY = 'TOGGLE_BOOKMARKS_ONLY';

export const fetchSourceStart = (sourceKey) => ({ type: FETCH_SOURCE_START, sourceKey });
export const fetchSourceSuccess = (sourceKey, items, fetchedAt) => ({
  type: FETCH_SOURCE_SUCCESS,
  sourceKey,
  items,
  fetchedAt,
});
export const fetchSourceError = (sourceKey, message) => ({ type: FETCH_SOURCE_ERROR, sourceKey, message });
export const setSearch = (value) => ({ type: SET_SEARCH, value });
export const setCategory = (category) => ({ type: SET_CATEGORY, category });
export const setTheme = (theme) => ({ type: SET_THEME, theme });
export const toggleTheme = () => ({ type: TOGGLE_THEME });
export const incrementVisible = (step) => ({ type: INCREMENT_VISIBLE, step });
export const toggleBookmarkArticle = (snapshot) => ({ type: TOGGLE_BOOKMARK_ARTICLE, snapshot });
export const toggleBookmarkRepo = (snapshot) => ({ type: TOGGLE_BOOKMARK_REPO, snapshot });
export const toggleBookmarksOnly = () => ({ type: TOGGLE_BOOKMARKS_ONLY });
