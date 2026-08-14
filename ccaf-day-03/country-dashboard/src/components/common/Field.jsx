import React from 'react';

export default function Field({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="text-sm text-slate-900 dark:text-slate-100">
        {value === null || value === undefined || value === '' ? (
          <span className="text-slate-400 dark:text-slate-600">—</span>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
