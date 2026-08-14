import React from 'react';

export default function BookmarkButton({ isBookmarked, onToggle, className = '' }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isBookmarked}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      className={`rounded-full p-1.5 text-lg leading-none transition-colors ${
        isBookmarked ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'
      } ${className}`}
    >
      {isBookmarked ? '★' : '☆'}
    </button>
  );
}
