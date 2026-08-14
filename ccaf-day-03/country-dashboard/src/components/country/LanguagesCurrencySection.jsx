import React from 'react';
import Field from '../common/Field.jsx';
import { formatList } from '../../lib/format.js';

export default function LanguagesCurrencySection({ country }) {
  const currencyLabel = country.currencies.length
    ? country.currencies
        .map((c) => [c.name, c.symbol].filter(Boolean).join(' '))
        .filter(Boolean)
        .join(', ')
    : null;

  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
        Languages &amp; Currency
      </h2>
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
        <Field label="Official language(s)" value={formatList(country.languages)} />
        <Field label="Native name(s)" value={formatList(country.nativeNames)} />
        <Field label="Currency" value={currencyLabel} />
      </dl>
    </section>
  );
}
