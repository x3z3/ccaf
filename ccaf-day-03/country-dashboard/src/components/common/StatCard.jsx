import React from 'react';

export default function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3">
      <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
        {value === null || value === undefined || value === '' ? 'N/A' : value}
      </div>
    </div>
  );
}
