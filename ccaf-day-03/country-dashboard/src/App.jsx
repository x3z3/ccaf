import React from 'react';
import { useStore } from './state/StoreContext.jsx';
import { getSelectedCountry } from './state/selectors.js';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import SourceStatusBanner from './components/layout/SourceStatusBanner.jsx';
import SearchBar from './components/search/SearchBar.jsx';
import SearchResultsList from './components/search/SearchResultsList.jsx';
import CountryProfile from './components/country/CountryProfile.jsx';
import CompareView from './components/compare/CompareView.jsx';
import FavoritesPanel from './components/favorites/FavoritesPanel.jsx';

export default function App() {
  const { state } = useStore();
  const selectedCountry = getSelectedCountry(state);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SourceStatusBanner />

      <main className="mx-auto max-w-7xl w-full px-4 py-6 flex-1 space-y-6">
        {state.ui.view === 'search' && (
          <>
            {selectedCountry ? (
              <CountryProfile country={selectedCountry} />
            ) : (
              <>
                <SearchBar />
                <SearchResultsList />
              </>
            )}
          </>
        )}

        {state.ui.view === 'compare' && <CompareView />}

        {state.ui.view === 'favorites' && <FavoritesPanel />}
      </main>

      <Footer />
    </div>
  );
}
