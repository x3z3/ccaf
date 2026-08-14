export const FETCH_SOURCE_START = 'FETCH_SOURCE_START';
export const FETCH_SOURCE_SUCCESS = 'FETCH_SOURCE_SUCCESS';
export const FETCH_SOURCE_ERROR = 'FETCH_SOURCE_ERROR';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_SEARCH_FIELD = 'SET_SEARCH_FIELD';
export const SELECT_COUNTRY = 'SELECT_COUNTRY';
export const CLEAR_SELECTED_COUNTRY = 'CLEAR_SELECTED_COUNTRY';
export const SET_COMPARE_SLOT = 'SET_COMPARE_SLOT';
export const CLEAR_COMPARE = 'CLEAR_COMPARE';
export const SET_VIEW = 'SET_VIEW';
export const SET_THEME = 'SET_THEME';
export const TOGGLE_THEME = 'TOGGLE_THEME';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const fetchSourceStart = (sourceKey) => ({ type: FETCH_SOURCE_START, sourceKey });
export const fetchSourceSuccess = (sourceKey, items, fetchedAt) => ({
  type: FETCH_SOURCE_SUCCESS,
  sourceKey,
  items,
  fetchedAt,
});
export const fetchSourceError = (sourceKey, message) => ({ type: FETCH_SOURCE_ERROR, sourceKey, message });

export const setSearch = (value) => ({ type: SET_SEARCH, value });
export const setSearchField = (field) => ({ type: SET_SEARCH_FIELD, field });
export const selectCountry = (id) => ({ type: SELECT_COUNTRY, id });
export const clearSelectedCountry = () => ({ type: CLEAR_SELECTED_COUNTRY });
export const setCompareSlot = (slot, id) => ({ type: SET_COMPARE_SLOT, slot, id });
export const clearCompare = () => ({ type: CLEAR_COMPARE });
export const setView = (view) => ({ type: SET_VIEW, view });
export const setTheme = (theme) => ({ type: SET_THEME, theme });
export const toggleTheme = () => ({ type: TOGGLE_THEME });
export const toggleFavorite = (snapshot) => ({ type: TOGGLE_FAVORITE, snapshot });
