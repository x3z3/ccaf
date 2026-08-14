import React from 'react';

export default function LoadingSkeleton({ rows = 4 }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-4 rounded bg-slate-200 dark:bg-slate-800" style={{ width: `${80 - i * 10}%` }} />
      ))}
    </div>
  );
}
