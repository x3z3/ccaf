import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-10">
      <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-slate-500 dark:text-slate-400">
        Country data from{' '}
        <a
          href="https://github.com/mledoze/countries"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-indigo-500"
        >
          world-countries
        </a>
        , flags from{' '}
        <a
          href="https://flagcdn.com"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-indigo-500"
        >
          flagcdn.com
        </a>
        , population from the{' '}
        <a
          href="https://data.worldbank.org"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-indigo-500"
        >
          World Bank
        </a>
        . No backend, no accounts — favorites are stored locally in your browser.
      </div>
    </footer>
  );
}
