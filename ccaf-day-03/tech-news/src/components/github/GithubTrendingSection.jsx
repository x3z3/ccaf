import React from 'react';
import { useStore } from '../../state/StoreContext.jsx';
import { getFilteredRepos } from '../../state/selectors.js';
import RepoCard from './RepoCard.jsx';
import SkeletonRepoCard from './SkeletonRepoCard.jsx';

export default function GithubTrendingSection() {
  const { state } = useStore();
  const source = state.sources.githubTrending;
  const repos = getFilteredRepos(state);

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">GitHub Trending</h2>

      {source.status === 'loading' && state.repos.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonRepoCard key={i} />
          ))}
        </div>
      )}

      {source.status === 'error' && state.repos.length === 0 && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          GitHub Trending is temporarily unavailable — the rest of the dashboard is unaffected.
        </p>
      )}

      {state.repos.length > 0 && repos.length === 0 && (
        <p className="text-sm text-slate-500 dark:text-slate-400">No repos match your search.</p>
      )}

      {repos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </section>
  );
}
