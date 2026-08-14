import React, { useEffect, useState } from 'react';
import { useStore } from '../../state/StoreContext.jsx';
import { setSearch, toggleTheme } from '../../state/actions.js';
import { toggleBookmarksOnly } from '../../state/actions.js';
import { formatRelativeTime } from '../../lib/time.js';

export default function Header() {
  const { state, dispatch } = useStore();
  const { ui, lastUpdated, bookmarks } = state;
  const [, forceTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => forceTick((n) => n + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  const bookmarkCount = bookmarks.articles.length + bookmarks.repos.length;

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 font-bold text-lg text-indigo-600 dark:text-indigo-400 shrink-0">
          <span aria-hidden="true">📡</span>
          <span>Tech News</span>
        </div>

        <div className="flex-1 min-w-[180px]">
          <input
            type="search"
            value={ui.search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            placeholder="Search headlines, repos, categories…"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="button"
          onClick={() => dispatch(toggleBookmarksOnly())}
          className={`relative rounded-lg px-3 py-1.5 text-sm font-medium border ${
            ui.bookmarksOnly
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          Bookmarks{bookmarkCount > 0 ? ` (${bookmarkCount})` : ''}
        </button>

        <button
          type="button"
          onClick={() => dispatch(toggleTheme())}
          aria-label="Toggle dark mode"
          className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-sm"
        >
          {ui.theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">
          {lastUpdated ? `Updated ${formatRelativeTime(lastUpdated)}` : 'Loading…'}
        </span>
      </div>
    </header>
  );
}
