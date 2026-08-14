import React from 'react';
import Field from '../common/Field.jsx';
import Flag from '../common/Flag.jsx';
import { formatList } from '../../lib/format.js';

export default function NationalInfoSection({ country }) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
        National Info
      </h2>
      <div className="flex items-start gap-6 mb-4">
        <div className="flex flex-col items-center gap-1">
          <Flag src={country.flagPng} alt={`Flag of ${country.nameCommon}`} className="w-20 h-14" />
          <span className="text-xs text-slate-500 dark:text-slate-400">Flag</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Flag
            src={country.coatOfArmsPng}
            alt={`Coat of arms of ${country.nameCommon}`}
            className="w-16 h-16"
            fallbackText="N/A"
          />
          <span className="text-xs text-slate-500 dark:text-slate-400">Coat of arms</span>
        </div>
      </div>
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
        <Field label="Calling code" value={country.callingCode} />
        <Field label="Internet TLD" value={formatList(country.tlds)} />
        <Field label="Driving side" value={country.drivingSide ? capitalize(country.drivingSide) : null} />
      </dl>
    </section>
  );
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
