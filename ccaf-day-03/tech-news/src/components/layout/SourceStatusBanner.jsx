import React from 'react';
import { useStore } from '../../state/StoreContext.jsx';

const SOURCE_LABELS = {
  hackerNews: 'Hacker News',
  techcrunch: 'TechCrunch',
  arsTechnica: 'Ars Technica',
  theVerge: 'The Verge',
  githubTrending: 'GitHub Trending',
};

export default function SourceStatusBanner() {
  const { state } = useStore();
  const failedSources = Object.entries(state.sources).filter(([, s]) => s.status === 'error');

  if (failedSources.length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-3">
      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 text-sm px-3 py-2">
        {failedSources.map(([key]) => SOURCE_LABELS[key] || key).join(', ')} unavailable right now — showing results from other sources.
      </div>
    </div>
  );
}
