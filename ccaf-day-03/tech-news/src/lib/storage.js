// localStorage load/save/seed/sanitize. This is the only module allowed to touch localStorage.
const STORAGE_KEY = 'techNewsDashboard.state.v1';

export function defaultState() {
  return {
    theme: 'light',
    bookmarks: { articles: [], repos: [] },
  };
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.length > 0;
}

function toFiniteOrNull(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function validateArticleSnapshot(raw) {
  if (!raw || typeof raw !== 'object') return null;
  if (!isNonEmptyString(raw.id) || !isNonEmptyString(raw.headline) || !isNonEmptyString(raw.sourceUrl)) return null;
  return {
    id: raw.id,
    type: 'article',
    headline: raw.headline,
    source: typeof raw.source === 'string' ? raw.source : '',
    sourceUrl: raw.sourceUrl,
    publishedAt: typeof raw.publishedAt === 'string' ? raw.publishedAt : null,
    thumbnail: typeof raw.thumbnail === 'string' ? raw.thumbnail : null,
    readingTimeMin: toFiniteOrNull(raw.readingTimeMin) ?? 1,
    categories: Array.isArray(raw.categories) ? raw.categories.filter((c) => typeof c === 'string') : [],
    bookmarkedAt: isNonEmptyString(raw.bookmarkedAt) ? raw.bookmarkedAt : new Date().toISOString(),
  };
}

function validateRepoSnapshot(raw) {
  if (!raw || typeof raw !== 'object') return null;
  if (!isNonEmptyString(raw.id) || !isNonEmptyString(raw.name) || !isNonEmptyString(raw.repoUrl)) return null;
  return {
    id: raw.id,
    type: 'repo',
    name: raw.name,
    description: typeof raw.description === 'string' ? raw.description : '',
    language: typeof raw.language === 'string' ? raw.language : 'Unknown',
    stars: toFiniteOrNull(raw.stars) ?? 0,
    growthToday: toFiniteOrNull(raw.growthToday),
    repoUrl: raw.repoUrl,
    avatarUrl: typeof raw.avatarUrl === 'string' ? raw.avatarUrl : null,
    bookmarkedAt: isNonEmptyString(raw.bookmarkedAt) ? raw.bookmarkedAt : new Date().toISOString(),
  };
}

function sanitizeArray(rawArray, validator) {
  if (!Array.isArray(rawArray)) return [];
  return rawArray.map(validator).filter(Boolean);
}

function sanitize(parsed) {
  try {
    if (!parsed || typeof parsed !== 'object') return defaultState();
    return {
      theme: parsed.theme === 'dark' ? 'dark' : 'light',
      bookmarks: {
        articles: sanitizeArray(parsed.bookmarks?.articles, validateArticleSnapshot),
        repos: sanitizeArray(parsed.bookmarks?.repos, validateRepoSnapshot),
      },
    };
  } catch {
    return defaultState();
  }
}

export function save({ theme, bookmarks }) {
  try {
    const payload = { version: 1, theme, bookmarks };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error('Failed to save tech news dashboard state:', err);
  }
}

export function load() {
  let raw = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to read tech news dashboard state:', err);
    return defaultState();
  }

  if (raw === null) {
    const state = defaultState();
    save(state);
    return state;
  }

  let parsed = null;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = null;
  }

  if (parsed === null || typeof parsed !== 'object') {
    const state = defaultState();
    save(state);
    return state;
  }

  return sanitize(parsed);
}
