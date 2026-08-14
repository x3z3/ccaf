import React from 'react';
import { useStore } from '../../state/StoreContext.jsx';
import { selectCountry, setView } from '../../state/actions.js';
import Flag from '../common/Flag.jsx';
import EmptyState from '../common/EmptyState.jsx';

export default function FavoritesPanel() {
  const { state, dispatch } = useStore();
  const { favorites } = state;

  if (favorites.length === 0) {
    return (
      <EmptyState
        icon="⭐"
        title="No favorites yet"
        description="Star a country from search or its profile to save it here."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {favorites.map((favorite) => (
        <button
          key={favorite.id}
          type="button"
          onClick={() => {
            dispatch(selectCountry(favorite.id));
            dispatch(setView('search'));
          }}
          className="w-full flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-left hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors"
        >
          <Flag src={favorite.flagPng} alt={`Flag of ${favorite.nameCommon}`} />
          <div className="min-w-0">
            <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
              {favorite.nameCommon}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {[favorite.capital, favorite.region].filter(Boolean).join(' · ') || '—'}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
