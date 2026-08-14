import React from 'react';
import { useStore } from '../../state/StoreContext.jsx';
import { getSearchResults } from '../../state/selectors.js';
import SearchResultItem from './SearchResultItem.jsx';
import EmptyState from '../common/EmptyState.jsx';

export default function SearchResultsList() {
  const { state } = useStore();
  const results = getSearchResults(state);

  if (!state.ui.search.trim()) {
    return (
      <EmptyState
        icon="🔎"
        title="Search for a country"
        description="Try a name, capital, region, currency, or language."
      />
    );
  }

  if (results.length === 0) {
    return (
      <EmptyState
        icon="🤷"
        title="No matches"
        description={`No countries matched "${state.ui.search}".`}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {results.map((country) => (
        <SearchResultItem key={country.id} country={country} />
      ))}
    </div>
  );
}
