import React from 'react';
import { useStore } from '../../state/StoreContext.jsx';
import { setView, toggleTheme } from '../../state/actions.js';

const TABS = [
  { key: 'search', label: 'Search' },
  { key: 'compare', label: 'Compare' },
  { key: 'favorites', label: 'Favorites' },
];

export default function Header() {
  const { state, dispatch } = useStore();
  const { ui, favorites } = state;

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 font-bold text-lg text-indigo-600 dark:text-indigo-400 shrink-0">
          <span aria-hidden="true">🌍</span>
          <span>Country Intelligence</span>
        </div>

        <nav className="flex items-center gap-1 flex-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => dispatch(setView(tab.key))}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                ui.view === tab.key
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
              {tab.key === 'favorites' && favorites.length > 0 ? ` (${favorites.length})` : ''}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => dispatch(toggleTheme())}
          aria-label="Toggle dark mode"
          className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-sm shrink-0"
        >
          {ui.theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </header>
  );
}
