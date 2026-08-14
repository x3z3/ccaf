import React from 'react';
import StatCard from '../common/StatCard.jsx';
import { formatArea, formatDensity } from '../../lib/format.js';

export default function StatisticsSection({ country }) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
        Statistics
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <StatCard label="Population density" value={formatDensity(country.populationDensity)} />
        <StatCard label="Area" value={formatArea(country.area)} />
        <StatCard label="Borders" value={country.borderCount} />
        <StatCard label="Time zones" value={country.timezoneCount} />
        <StatCard label="Languages" value={country.languageCount} />
      </div>
    </section>
  );
}
