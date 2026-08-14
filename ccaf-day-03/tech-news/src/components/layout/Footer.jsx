import React, { useState } from 'react';
import { useStore } from '../../state/StoreContext.jsx';
import { getTotalItemsLoaded } from '../../state/selectors.js';

export default function Footer() {
  const { state, refresh } = useStore();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  return (
    <footer className="mt-10 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-6 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
        <span>{getTotalItemsLoaded(state)} items loaded</span>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
          className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1.5 font-medium text-slate-700 dark:text-slate-300 disabled:opacity-50"
        >
          {refreshing ? 'Refreshing…' : 'Refresh'}
        </button>

        <span className="text-xs">
          Sources: Hacker News · TechCrunch · Ars Technica · The Verge · GitHub Trending, via rss2json.com
        </span>
      </div>
    </footer>
  );
}
