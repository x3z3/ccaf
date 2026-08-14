import React, { useCallback } from 'react';
import { useStore } from '../../state/StoreContext.jsx';
import { incrementVisible } from '../../state/actions.js';
import { getFilteredArticles, getVisibleArticles, PAGE_SIZE } from '../../state/selectors.js';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll.js';
import NewsCard from './NewsCard.jsx';
import SkeletonCard from './SkeletonCard.jsx';

const NEWS_SOURCE_KEYS = ['hackerNews', 'techcrunch', 'arsTechnica', 'theVerge'];

export default function NewsGrid() {
  const { state, dispatch } = useStore();
  const filtered = getFilteredArticles(state);
  const visible = getVisibleArticles(state);
  const hasMore = visible.length < filtered.length;

  const isInitialLoading =
    state.articles.length === 0 &&
    NEWS_SOURCE_KEYS.some((key) => state.sources[key].status === 'loading');

  const handleIntersect = useCallback(() => {
    if (hasMore) dispatch(incrementVisible(PAGE_SIZE));
  }, [dispatch, hasMore]);

  const sentinelRef = useInfiniteScroll(handleIntersect, { enabled: hasMore });

  if (isInitialLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (filtered.length === 0) {
    return <p className="text-sm text-slate-500 dark:text-slate-400 py-8 text-center">No articles match your filters.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
      {hasMore && <div ref={sentinelRef} className="h-8" />}
    </div>
  );
}
