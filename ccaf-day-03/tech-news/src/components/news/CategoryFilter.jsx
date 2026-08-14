import React from 'react';
import { useStore } from '../../state/StoreContext.jsx';
import { setCategory } from '../../state/actions.js';
import { CATEGORIES } from '../../lib/categorize.js';

const OPTIONS = ['All', ...CATEGORIES];

export default function CategoryFilter() {
  const { state, dispatch } = useStore();
  const { activeCategory } = state.ui;

  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => dispatch(setCategory(category))}
          className={`rounded-full px-3 py-1 text-sm font-medium border transition-colors ${
            activeCategory === category
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-400'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
