// Free, public, no-auth population data (world-countries has no population
// field), keyed by ISO 3166-1 alpha-3 code to match cca3.
const ENDPOINT =
  'https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&mrnev=1&per_page=300';

export async function fetchPopulationByCca3() {
  const res = await fetch(ENDPOINT);
  if (!res.ok) throw new Error(`World Bank population request failed: ${res.status}`);

  const data = await res.json();
  const rows = Array.isArray(data) && Array.isArray(data[1]) ? data[1] : [];

  const map = {};
  for (const row of rows) {
    if (typeof row.countryiso3code === 'string' && typeof row.value === 'number') {
      map[row.countryiso3code] = row.value;
    }
  }
  return map;
}
