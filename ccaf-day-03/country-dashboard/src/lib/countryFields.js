function toFiniteOrNull(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function toStringOrNull(value) {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

function callingCode(idd) {
  if (!idd || typeof idd !== 'object') return null;
  const root = toStringOrNull(idd.root);
  if (!root) return null;
  const suffix = Array.isArray(idd.suffixes) && idd.suffixes.length > 0 ? idd.suffixes[0] : '';
  return `${root}${suffix}`;
}

function flagUrls(cca2) {
  const code = typeof cca2 === 'string' ? cca2.toLowerCase() : null;
  if (!code) return { flagPng: null, flagSvg: null };
  return {
    flagPng: `https://flagcdn.com/w320/${code}.png`,
    flagSvg: `https://flagcdn.com/${code}.svg`,
  };
}

function googleMapsUrl(latlng) {
  if (!Array.isArray(latlng) || latlng.length !== 2) return null;
  return `https://www.google.com/maps?q=${latlng[0]},${latlng[1]}`;
}

// Flattens a raw world-countries dataset object (+ an optionally-known population
// figure from a separate source) into a UI-ready shape where every field is a
// safe type (string/number/null or array), never undefined — this is the single
// place "field missing from the data source" is resolved.
export function normalizeCountry(raw, population) {
  const area = toFiniteOrNull(raw.area);
  const pop = toFiniteOrNull(population);
  const languages = raw.languages ? Object.values(raw.languages) : [];
  const nativeNames = raw.name?.native
    ? Object.values(raw.name.native)
        .map((n) => toStringOrNull(n?.common))
        .filter(Boolean)
    : [];
  const currencies = raw.currencies
    ? Object.entries(raw.currencies).map(([code, c]) => ({
        code,
        name: toStringOrNull(c?.name),
        symbol: toStringOrNull(c?.symbol),
      }))
    : [];
  const { flagPng, flagSvg } = flagUrls(raw.cca2);

  return {
    id: raw.cca3,
    cca2: toStringOrNull(raw.cca2),
    nameCommon: toStringOrNull(raw.name?.common) ?? 'Unknown',
    nameOfficial: toStringOrNull(raw.name?.official) ?? 'Unknown',
    capital: Array.isArray(raw.capital) && raw.capital.length > 0 ? raw.capital[0] : null,
    population: pop,
    area,
    region: toStringOrNull(raw.region),
    subregion: toStringOrNull(raw.subregion),
    // Not provided by this data source (world-countries has no timezone data).
    timezones: [],
    flagSvg,
    flagPng,
    flagAlt: `Flag of ${toStringOrNull(raw.name?.common) ?? 'this country'}`,
    // Not provided by this data source.
    coatOfArmsSvg: null,
    coatOfArmsPng: null,
    // Not provided by this data source.
    continents: [],
    borders: Array.isArray(raw.borders) ? raw.borders : [],
    latlng: Array.isArray(raw.latlng) && raw.latlng.length === 2 ? raw.latlng : null,
    googleMapsUrl: googleMapsUrl(raw.latlng),
    languages,
    nativeNames,
    currencies,
    callingCode: callingCode(raw.idd),
    tlds: Array.isArray(raw.tld) ? raw.tld : [],
    // Not provided by this data source.
    drivingSide: null,
    landlocked: Boolean(raw.landlocked),
    hasCoastline: !raw.landlocked,
    independent: Boolean(raw.independent),
    populationDensity: pop !== null && area ? pop / area : null,
    borderCount: Array.isArray(raw.borders) ? raw.borders.length : 0,
    // Unknown rather than 0 — this data source has no timezone info.
    timezoneCount: null,
    languageCount: languages.length,
  };
}

export function toFavoriteSnapshot(country) {
  return {
    id: country.id,
    nameCommon: country.nameCommon,
    capital: country.capital,
    region: country.region,
    flagPng: country.flagPng,
    favoritedAt: new Date().toISOString(),
  };
}
