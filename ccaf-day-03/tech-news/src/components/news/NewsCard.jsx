import React from 'react';
import { useStore } from '../../state/StoreContext.jsx';
import { toggleBookmarkArticle } from '../../state/actions.js';
import { isArticleBookmarked } from '../../state/selectors.js';
import { formatRelativeTime } from '../../lib/time.js';
import BookmarkButton from '../bookmarks/BookmarkButton.jsx';

export default function NewsCard({ article }) {
  const { state, dispatch } = useStore();
  const bookmarked = isArticleBookmarked(state, article.id);

  const handleToggleBookmark = () => {
    dispatch(
      toggleBookmarkArticle({
        id: article.id,
        type: 'article',
        headline: article.headline,
        source: article.source,
        sourceUrl: article.sourceUrl,
        publishedAt: article.publishedAt,
        thumbnail: article.thumbnail,
        readingTimeMin: article.readingTimeMin,
        categories: article.categories,
        bookmarkedAt: new Date().toISOString(),
      })
    );
  };

  return (
    <article className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
      <div className="h-36 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        {article.thumbnail ? (
          <img src={article.thumbnail} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <span className="text-3xl text-slate-300 dark:text-slate-600" aria-hidden="true">📰</span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium text-indigo-600 dark:text-indigo-400">{article.source}</span>
          <BookmarkButton isBookmarked={bookmarked} onToggle={handleToggleBookmark} />
        </div>

        <h3 className="font-semibold leading-snug line-clamp-3">{article.headline}</h3>

        <div className="mt-auto flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2">
          <span>{formatRelativeTime(article.publishedAt)} · {article.readingTimeMin} min read</span>
        </div>

        {article.categories.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {article.categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] text-slate-600 dark:text-slate-300"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        <a
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block rounded-lg bg-indigo-600 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-indigo-700"
        >
          Read
        </a>
      </div>
    </article>
  );
}
