import React from 'react';
import { useStore } from '../../state/StoreContext.jsx';
import { toggleBookmarkRepo } from '../../state/actions.js';
import { isRepoBookmarked } from '../../state/selectors.js';
import BookmarkButton from '../bookmarks/BookmarkButton.jsx';

function formatStars(count) {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
}

export default function RepoCard({ repo }) {
  const { state, dispatch } = useStore();
  const bookmarked = isRepoBookmarked(state, repo.id);

  const handleToggleBookmark = () => {
    dispatch(
      toggleBookmarkRepo({
        id: repo.id,
        type: 'repo',
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stars,
        growthToday: repo.growthToday,
        repoUrl: repo.repoUrl,
        avatarUrl: repo.avatarUrl,
        bookmarkedAt: new Date().toISOString(),
      })
    );
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <a
          href={repo.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline break-all"
        >
          {repo.name}
        </a>
        <BookmarkButton isBookmarked={bookmarked} onToggle={handleToggleBookmark} />
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{repo.description}</p>

      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-auto">
        <span>⭐ {formatStars(repo.stars)}</span>
        <span>{repo.language}</span>
        <span>
          {repo.growthToday !== null ? `+${repo.growthToday} today` : (
            <span className="italic text-slate-400 dark:text-slate-500">growth data unavailable</span>
          )}
        </span>
      </div>
    </div>
  );
}
