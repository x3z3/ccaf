// localStorage load/save/seed/sanitize. This is the only module allowed to touch localStorage.
const STORAGE_KEY = 'countryDashboard.state.v1';

export function defaultState() {
  return {
    theme: 'light',
    favorites: [],
  };
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.length > 0;
}

function validateFavoriteSnapshot(raw) {
  if (!raw || typeof raw !== 'object') return null;
  if (!isNonEmptyString(raw.id) || !isNonEmptyString(raw.nameCommon)) return null;
  return {
    id: raw.id,
    nameCommon: raw.nameCommon,
    capital: typeof raw.capital === 'string' ? raw.capital : null,
    region: typeof raw.region === 'string' ? raw.region : null,
    flagPng: typeof raw.flagPng === 'string' ? raw.flagPng : null,
    favoritedAt: isNonEmptyString(raw.favoritedAt) ? raw.favoritedAt : new Date().toISOString(),
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
      favorites: sanitizeArray(parsed.favorites, validateFavoriteSnapshot),
    };
  } catch {
    return defaultState();
  }
}

export function save({ theme, favorites }) {
  try {
    const payload = { version: 1, theme, favorites };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error('Failed to save country dashboard state:', err);
  }
}

export function load() {
  let raw = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to read country dashboard state:', err);
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
