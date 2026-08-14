import React from 'react';
import { useStore } from '../../state/StoreContext.jsx';
import { clearCompare } from '../../state/actions.js';
import { getCompareCountries } from '../../state/selectors.js';
import CompareCountryPicker from './CompareCountryPicker.jsx';
import CompareTable from './CompareTable.jsx';

export default function CompareView() {
  const { state, dispatch } = useStore();
  const { a, b } = getCompareCountries(state);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Compare countries
        </h2>
        {(a || b) && (
          <button
            type="button"
            onClick={() => dispatch(clearCompare())}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-red-500"
          >
            Reset
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <CompareCountryPicker slot="a" country={a} />
        <CompareCountryPicker slot="b" country={b} />
      </div>

      {(a || b) && <CompareTable a={a} b={b} />}
    </div>
  );
}
