// Free, public, no-auth country dataset (the REST Countries v1-v4 API was
// deprecated and now requires an account + API key, so we use the same
// underlying open dataset directly via CDN instead).
export const SOURCE_KEY = 'countries';

const ENDPOINT = 'https://cdn.jsdelivr.net/npm/world-countries@5/countries.json';

export async function fetchRawCountries() {
  const res = await fetch(ENDPOINT);
  if (!res.ok) throw new Error(`world-countries request failed: ${res.status}`);

  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('world-countries response was not an array');

  return data.filter((raw) => raw && typeof raw === 'object' && raw.cca3);
}
