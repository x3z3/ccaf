import React from 'react';
import Field from '../common/Field.jsx';
import Flag from '../common/Flag.jsx';
import { formatNumber, formatArea, formatList } from '../../lib/format.js';

export default function OverviewSection({ country }) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
        Overview
      </h2>
      <div className="flex items-start gap-4">
        <Flag
          src={country.flagPng}
          alt={country.flagAlt ?? `Flag of ${country.nameCommon}`}
          className="w-24 h-16"
        />
        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 flex-1">
          <Field label="Official name" value={country.nameOfficial} />
          <Field label="Capital" value={country.capital} />
          <Field label="Population" value={formatNumber(country.population)} />
          <Field label="Area" value={formatArea(country.area)} />
          <Field label="Region" value={country.region} />
          <Field label="Subregion" value={country.subregion} />
          <Field label="Timezone(s)" value={formatList(country.timezones)} />
        </dl>
      </div>
    </section>
  );
}
