import React from 'react';
import { useStore } from '../../state/StoreContext.jsx';
import { toggleFavorite } from '../../state/actions.js';
import { isFavorite } from '../../state/selectors.js';
import { toFavoriteSnapshot } from '../../lib/countryFields.js';

export default function FavoriteButton({ country, className = '' }) {
  const { state, dispatch } = useStore();
  const active = isFavorite(state, country.id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        dispatch(toggleFavorite(toFavoriteSnapshot(country)));
      }}
      aria-pressed={active}
      aria-label={active ? `Remove ${country.nameCommon} from favorites` : `Add ${country.nameCommon} to favorites`}
      className={`text-lg leading-none ${active ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600 hover:text-amber-400'} ${className}`}
    >
      {active ? '★' : '☆'}
    </button>
  );
}
