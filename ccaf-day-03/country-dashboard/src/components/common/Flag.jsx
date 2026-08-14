import React from 'react';

export default function Flag({ src, alt, className = 'w-10 h-7', fallbackText }) {
  if (!src) {
    return (
      <div
        className={`${className} shrink-0 flex items-center justify-center rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-semibold text-slate-500 dark:text-slate-400`}
        aria-label={alt}
      >
        {fallbackText ?? '—'}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} shrink-0 object-cover rounded border border-slate-200 dark:border-slate-800 bg-white`}
    />
  );
}
