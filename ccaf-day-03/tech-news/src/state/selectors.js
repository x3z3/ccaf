export const PAGE_SIZE = 12;
export const REPO_LIMIT = 25;

function matchesSearch(haystack, query) {
  if (!query) return true;
  return haystack.toLowerCase().includes(query.toLowerCase());
}

export function getFilteredArticles(state) {
  const { search, activeCategory, bookmarksOnly } = state.ui;

  if (bookmarksOnly) {
    return state.bookmarks.articles.filter((article) => {
      const inCategory = activeCategory === 'All' || article.categories.includes(activeCategory);
      const inSearch = matchesSearch(`${article.headline} ${article.categories.join(' ')}`, search);
      return inCategory && inSearch;
    });
  }

  return state.articles.filter((article) => {
    const inCategory = activeCategory === 'All' || article.categories.includes(activeCategory);
    const inSearch = matchesSearch(`${article.headline} ${article.categories.join(' ')}`, search);
    return inCategory && inSearch;
  });
}

export function getVisibleArticles(state) {
  return getFilteredArticles(state).slice(0, state.ui.visibleCount);
}

export function getFilteredRepos(state) {
  const { search, bookmarksOnly } = state.ui;
  const source = bookmarksOnly ? state.bookmarks.repos : state.repos;
  const filtered = source.filter((repo) => matchesSearch(`${repo.name}`, search));
  return bookmarksOnly ? filtered : filtered.slice(0, REPO_LIMIT);
}

export function isArticleBookmarked(state, articleId) {
  return state.bookmarks.articles.some((a) => a.id === articleId);
}

export function isRepoBookmarked(state, repoId) {
  return state.bookmarks.repos.some((r) => r.id === repoId);
}

export function getTotalItemsLoaded(state) {
  return state.articles.length + state.repos.length;
}
