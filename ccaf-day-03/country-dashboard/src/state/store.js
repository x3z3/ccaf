import { load } from '../lib/storage.js';
import { SOURCE_KEY as COUNTRIES_SOURCE_KEY } from '../lib/sources/worldCountries.js';
import * as actions from './actions.js';

export function createInitialState() {
  const persisted = load();
  return {
    countries: [],
    sources: {
      [COUNTRIES_SOURCE_KEY]: { status: 'idle', error: null, fetchedAt: null, count: 0 },
    },
    ui: {
      theme: persisted.theme,
      search: '',
      searchField: 'all',
      selectedCountryId: null,
      compare: { a: null, b: null },
      view: 'search',
    },
    favorites: persisted.favorites,
  };
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
      return {
        ...state,
        countries: action.items,
        sources: {
          ...state.sources,
          [action.sourceKey]: {
            status: 'success',
            error: null,
            fetchedAt: action.fetchedAt,
            count: action.items.length,
          },
        },
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
      return { ...state, ui: { ...state.ui, search: action.value } };

    case actions.SET_SEARCH_FIELD:
      return { ...state, ui: { ...state.ui, searchField: action.field } };

    case actions.SELECT_COUNTRY:
      return { ...state, ui: { ...state.ui, selectedCountryId: action.id } };

    case actions.CLEAR_SELECTED_COUNTRY:
      return { ...state, ui: { ...state.ui, selectedCountryId: null } };

    case actions.SET_COMPARE_SLOT:
      return {
        ...state,
        ui: { ...state.ui, compare: { ...state.ui.compare, [action.slot]: action.id } },
      };

    case actions.CLEAR_COMPARE:
      return { ...state, ui: { ...state.ui, compare: { a: null, b: null } } };

    case actions.SET_VIEW:
      return { ...state, ui: { ...state.ui, view: action.view } };

    case actions.SET_THEME:
      return { ...state, ui: { ...state.ui, theme: action.theme } };

    case actions.TOGGLE_THEME:
      return { ...state, ui: { ...state.ui, theme: state.ui.theme === 'dark' ? 'light' : 'dark' } };

    case actions.TOGGLE_FAVORITE: {
      const exists = state.favorites.some((f) => f.id === action.snapshot.id);
      const favorites = exists
        ? state.favorites.filter((f) => f.id !== action.snapshot.id)
        : [...state.favorites, action.snapshot];
      return { ...state, favorites };
    }

    default:
      return state;
  }
}
