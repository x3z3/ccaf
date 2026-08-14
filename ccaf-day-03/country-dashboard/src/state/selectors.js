const MAX_RESULTS = 50;

function haystackFor(country, field) {
  switch (field) {
    case 'name':
      return `${country.nameCommon} ${country.nameOfficial}`;
    case 'capital':
      return country.capital ?? '';
    case 'region':
      return `${country.region ?? ''} ${country.subregion ?? ''}`;
    case 'currency':
      return country.currencies.map((c) => `${c.name ?? ''} ${c.code}`).join(' ');
    case 'language':
      return country.languages.join(' ');
    case 'all':
    default:
      return [
        country.nameCommon,
        country.nameOfficial,
        country.capital,
        country.region,
        country.subregion,
        ...country.currencies.map((c) => `${c.name ?? ''} ${c.code}`),
        ...country.languages,
      ]
        .filter(Boolean)
        .join(' ');
  }
}

export function matchesSearch(country, query, field) {
  if (!query) return false;
  return haystackFor(country, field).toLowerCase().includes(query.trim().toLowerCase());
}

export function getSearchResults(state) {
  const { search, searchField } = state.ui;
  if (!search.trim()) return [];
  return state.countries
    .filter((country) => matchesSearch(country, search, searchField))
    .slice(0, MAX_RESULTS);
}

export function getSelectedCountry(state) {
  return state.countries.find((c) => c.id === state.ui.selectedCountryId) ?? null;
}

export function getCountryById(state, id) {
  return state.countries.find((c) => c.id === id) ?? null;
}

let cachedCountries = null;
let cachedMap = null;

export function getCountryNameMap(state) {
  if (cachedCountries === state.countries && cachedMap) return cachedMap;
  cachedCountries = state.countries;
  cachedMap = new Map(state.countries.map((c) => [c.id, c.nameCommon]));
  return cachedMap;
}

export function getCompareCountries(state) {
  return {
    a: getCountryById(state, state.ui.compare.a),
    b: getCountryById(state, state.ui.compare.b),
  };
}

export function isFavorite(state, id) {
  return state.favorites.some((f) => f.id === id);
}
