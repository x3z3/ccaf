import React from 'react';
import { useStore } from '../../state/StoreContext.jsx';
import { clearSelectedCountry } from '../../state/actions.js';
import FavoriteButton from '../favorites/FavoriteButton.jsx';
import OverviewSection from './OverviewSection.jsx';
import GeographySection from './GeographySection.jsx';
import LanguagesCurrencySection from './LanguagesCurrencySection.jsx';
import NationalInfoSection from './NationalInfoSection.jsx';
import StatisticsSection from './StatisticsSection.jsx';

export default function CountryProfile({ country }) {
  const { dispatch } = useStore();

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => dispatch(clearSelectedCountry())}
          className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          ← Back to results
        </button>
        <FavoriteButton country={country} className="text-2xl" />
      </div>

      <OverviewSection country={country} />
      <GeographySection country={country} />
      <LanguagesCurrencySection country={country} />
      <NationalInfoSection country={country} />
      <StatisticsSection country={country} />
    </div>
  );
}
