import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden animate-pulse">
      <div className="h-36 bg-slate-200 dark:bg-slate-800" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-800 mt-2" />
        <div className="h-8 w-full rounded bg-slate-200 dark:bg-slate-800 mt-2" />
      </div>
    </div>
  );
}
