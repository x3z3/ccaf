import React from 'react';
import { useStore } from '../../state/StoreContext.jsx';
import { selectCountry } from '../../state/actions.js';
import Flag from '../common/Flag.jsx';
import FavoriteButton from '../favorites/FavoriteButton.jsx';

export default function SearchResultItem({ country }) {
  const { dispatch } = useStore();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => dispatch(selectCountry(country.id))}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') dispatch(selectCountry(country.id));
      }}
      className="w-full flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-left hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors cursor-pointer"
    >
      <Flag src={country.flagPng} alt={country.flagAlt ?? `Flag of ${country.nameCommon}`} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
          {country.nameCommon}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
          {[country.capital, country.region].filter(Boolean).join(' · ') || '—'}
        </div>
      </div>
      <FavoriteButton country={country} />
    </div>
  );
}
