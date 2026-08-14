import React from 'react';
import { formatNumber, formatArea, formatList } from '../../lib/format.js';

const ROWS = [
  { label: 'Capital', get: (c) => c.capital },
  { label: 'Population', get: (c) => formatNumber(c.population) },
  { label: 'Area', get: (c) => formatArea(c.area) },
  { label: 'Region', get: (c) => [c.region, c.subregion].filter(Boolean).join(' / ') || null },
  {
    label: 'Currency',
    get: (c) => formatList(c.currencies.map((cur) => [cur.name, cur.symbol].filter(Boolean).join(' '))),
  },
  { label: 'Languages', get: (c) => formatList(c.languages) },
  { label: 'Timezones', get: (c) => formatList(c.timezones) },
];

function Cell({ country, row }) {
  if (!country) return <span className="text-slate-400 dark:text-slate-600">—</span>;
  const value = row.get(country);
  return value === null || value === undefined || value === '' ? (
    <span className="text-slate-400 dark:text-slate-600">—</span>
  ) : (
    value
  );
}

export default function CompareTable({ a, b }) {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
      {ROWS.map((row, i) => (
        <div
          key={row.label}
          className={`grid grid-cols-1 sm:grid-cols-[160px_1fr_1fr] gap-2 px-4 py-3 text-sm ${
            i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'
          }`}
        >
          <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 sm:pt-0.5">
            {row.label}
          </div>
          <div>
            <Cell country={a} row={row} />
          </div>
          <div>
            <Cell country={b} row={row} />
          </div>
        </div>
      ))}
    </div>
  );
}
