import React from 'react';
import { useStore } from '../../state/StoreContext.jsx';
import { getCountryNameMap } from '../../state/selectors.js';
import Field from '../common/Field.jsx';
import BorderCountryChip from './BorderCountryChip.jsx';
import { formatList } from '../../lib/format.js';

export default function GeographySection({ country }) {
  const { state } = useStore();
  const nameMap = getCountryNameMap(state);

  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
        Geography
      </h2>
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
        <Field label="Continent(s)" value={formatList(country.continents)} />
        <Field
          label="Coordinates"
          value={country.latlng ? `${country.latlng[0]}°, ${country.latlng[1]}°` : null}
        />
        <Field
          label="Map"
          value={
            country.googleMapsUrl ? (
              <a
                href={country.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="underline text-indigo-600 dark:text-indigo-400"
              >
                View on Google Maps
              </a>
            ) : null
          }
        />
        <Field label="Coastline" value={country.hasCoastline ? 'Present' : 'Landlocked'} />
      </dl>

      <div className="mt-4">
        <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Bordering countries
        </div>
        {country.borders.length === 0 ? (
          <div className="text-sm text-slate-400 dark:text-slate-600">
            {country.hasCoastline ? 'No land borders' : '—'}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {country.borders.map((code) => (
              <BorderCountryChip key={code} code={code} name={nameMap.get(code) ?? code} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
