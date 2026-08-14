import React from 'react';
import { useStore } from '../../state/StoreContext.jsx';
import { setSearch, setSearchField } from '../../state/actions.js';

const FIELDS = [
  { key: 'all', label: 'All fields' },
  { key: 'name', label: 'Name' },
  { key: 'capital', label: 'Capital' },
  { key: 'region', label: 'Region' },
  { key: 'currency', label: 'Currency' },
  { key: 'language', label: 'Language' },
];

export default function SearchBar() {
  const { state, dispatch } = useStore();
  const { ui } = state;

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        type="search"
        value={ui.search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        placeholder="Search by name, capital, region, currency, or language…"
        className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        autoFocus
      />
      <select
        value={ui.searchField}
        onChange={(e) => dispatch(setSearchField(e.target.value))}
        className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
      >
        {FIELDS.map((f) => (
          <option key={f.key} value={f.key}>
            {f.label}
          </option>
        ))}
      </select>
    </div>
  );
}
