import React from 'react';

export default function SkeletonRepoCard() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 animate-pulse space-y-2">
      <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
      <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-800 mt-2" />
    </div>
  );
}
