import React from 'react';
import { useStore } from '../../state/StoreContext.jsx';
import { selectCountry } from '../../state/actions.js';

export default function BorderCountryChip({ code, name }) {
  const { state, dispatch } = useStore();
  const known = state.countries.some((c) => c.id === code);

  return (
    <button
      type="button"
      disabled={!known}
      onClick={() => known && dispatch(selectCountry(code))}
      className="rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-xs text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-60 disabled:hover:border-slate-300"
    >
      {name}
    </button>
  );
}
