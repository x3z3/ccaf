import React from 'react';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import SourceStatusBanner from './components/layout/SourceStatusBanner.jsx';
import CategoryFilter from './components/news/CategoryFilter.jsx';
import NewsGrid from './components/news/NewsGrid.jsx';
import GithubTrendingSection from './components/github/GithubTrendingSection.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SourceStatusBanner />

      <main className="mx-auto max-w-7xl w-full px-4 py-6 flex-1 space-y-10">
        <section>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
            <h2 className="text-lg font-semibold">Trending News</h2>
            <CategoryFilter />
          </div>
          <NewsGrid />
        </section>

        <GithubTrendingSection />
      </main>

      <Footer />
    </div>
  );
}
