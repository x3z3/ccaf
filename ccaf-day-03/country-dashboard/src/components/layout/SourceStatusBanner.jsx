import React from 'react';
import { useStore } from '../../state/StoreContext.jsx';

export default function SourceStatusBanner() {
  const { state, refresh } = useStore();
  const source = state.sources.countries;

  if (source.status === 'loading' || source.status === 'idle') {
    return (
      <div className="bg-indigo-50 dark:bg-indigo-950/40 border-b border-indigo-100 dark:border-indigo-900 px-4 py-2 text-sm text-indigo-700 dark:text-indigo-300 text-center">
        Loading country data…
      </div>
    );
  }

  if (source.status === 'error') {
    return (
      <div className="bg-red-50 dark:bg-red-950/40 border-b border-red-100 dark:border-red-900 px-4 py-2 text-sm text-red-700 dark:text-red-300 flex items-center justify-center gap-3">
        <span>Failed to load country data{source.error ? `: ${source.error}` : ''}.</span>
        <button
          type="button"
          onClick={refresh}
          className="underline font-medium hover:text-red-900 dark:hover:text-red-100"
        >
          Retry
        </button>
      </div>
    );
  }

  return null;
}
