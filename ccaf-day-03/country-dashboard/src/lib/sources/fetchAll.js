import { SOURCE_KEY, fetchRawCountries } from './worldCountries.js';
import { fetchPopulationByCca3 } from './population.js';
import { normalizeCountry } from '../countryFields.js';
import { fetchSourceStart, fetchSourceSuccess, fetchSourceError } from '../../state/actions.js';

export { SOURCE_KEY };

export async function fetchAll(dispatch) {
  dispatch(fetchSourceStart(SOURCE_KEY));
  try {
    const [rawCountries, populationByCca3] = await Promise.all([
      fetchRawCountries(),
      fetchPopulationByCca3().catch((err) => {
        // Population is a secondary enrichment source — its failure shouldn't
        // block the country list from loading, just leave population as null.
        console.error('Failed to fetch population data:', err);
        return {};
      }),
    ]);

    const items = rawCountries.map((raw) => normalizeCountry(raw, populationByCca3[raw.cca3] ?? null));
    dispatch(fetchSourceSuccess(SOURCE_KEY, items, new Date().toISOString()));
  } catch (err) {
    console.error(`Failed to fetch ${SOURCE_KEY}:`, err);
    dispatch(fetchSourceError(SOURCE_KEY, err.message || 'Unknown error'));
  }
}
