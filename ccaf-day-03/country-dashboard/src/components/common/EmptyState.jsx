import React from 'react';

export default function EmptyState({ icon = '🌍', title, description }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 text-slate-500 dark:text-slate-400">
      <div className="text-4xl mb-3" aria-hidden="true">{icon}</div>
      <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{title}</div>
      {description && <div className="text-xs mt-1 max-w-sm">{description}</div>}
    </div>
  );
}
