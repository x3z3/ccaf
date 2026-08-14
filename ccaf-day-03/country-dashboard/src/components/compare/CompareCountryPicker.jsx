import React, { useState } from 'react';
import { useStore } from '../../state/StoreContext.jsx';
import { setCompareSlot } from '../../state/actions.js';
import { matchesSearch } from '../../state/selectors.js';
import Flag from '../common/Flag.jsx';

export default function CompareCountryPicker({ slot, country }) {
  const { state, dispatch } = useStore();
  const [query, setQuery] = useState('');

  const results = query.trim()
    ? state.countries.filter((c) => matchesSearch(c, query, 'all')).slice(0, 8)
    : [];

  if (country) {
    return (
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 flex items-center gap-3">
        <Flag src={country.flagPng} alt={`Flag of ${country.nameCommon}`} />
        <div className="flex-1 text-sm font-medium">{country.nameCommon}</div>
        <button
          type="button"
          onClick={() => dispatch(setCompareSlot(slot, null))}
          className="text-xs text-slate-500 dark:text-slate-400 hover:text-red-500"
        >
          Change
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Choose country ${slot.toUpperCase()}…`}
        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg max-h-64 overflow-auto">
          {results.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                dispatch(setCompareSlot(slot, c.id));
                setQuery('');
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Flag src={c.flagPng} alt="" className="w-6 h-4" />
              {c.nameCommon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
