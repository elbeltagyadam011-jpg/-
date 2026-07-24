import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { SurahCard } from './components/SurahCard';
import { SurahDetailsView } from './components/SurahDetailsView';
import { FavoritesView } from './components/FavoritesView';
import { Footer } from './components/Footer';
import { SURAHS_DATA } from './data/surahs';
import { Surah, FilterType, SortType } from './types';
import { matchSurah } from './utils/search';
import { SearchX } from 'lucide-react';

export default function App() {
  // Theme dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('tadabbur_theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Current View & Selected Surah
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [pageMode, setPageMode] = useState<'home' | 'favorites'>('home');

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [activeSort, setActiveSort] = useState<SortType>('number-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Favorites state stored in localStorage
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('tadabbur_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Read status state stored in localStorage
  const [readSurahs, setReadSurahs] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('tadabbur_read');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Apply dark mode class to html document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tadabbur_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tadabbur_theme', 'light');
    }
  }, [darkMode]);

  // Persist Favorites
  useEffect(() => {
    localStorage.setItem('tadabbur_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Persist Read status
  useEffect(() => {
    localStorage.setItem('tadabbur_read', JSON.stringify(readSurahs));
  }, [readSurahs]);

  // Handle Toggle Favorite
  const handleToggleFavorite = (e: React.MouseEvent, surahNumber: number) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(surahNumber)
        ? prev.filter((id) => id !== surahNumber)
        : [...prev, surahNumber]
    );
  };

  // Handle Toggle Read
  const handleToggleRead = (e: React.MouseEvent, surahNumber: number) => {
    e.stopPropagation();
    setReadSurahs((prev) =>
      prev.includes(surahNumber)
        ? prev.filter((id) => id !== surahNumber)
        : [...prev, surahNumber]
    );
  };

  // Select Surah & Scroll to Top
  const handleSelectSurah = (surah: Surah) => {
    setSelectedSurah(surah);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to Home
  const handleGoHome = () => {
    setSelectedSurah(null);
    setPageMode('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Favorites Page
  const handleOpenFavorites = () => {
    setSelectedSurah(null);
    setPageMode('favorites');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear all favorites
  const handleClearAllFavorites = () => {
    setFavorites([]);
  };

  // Current Navbar View Mode
  const navbarView = selectedSurah ? 'details' : pageMode === 'favorites' ? 'favorites' : 'home';

  // Filtered & Sorted Surahs for Home Page
  const filteredSurahs = useMemo(() => {
    return SURAHS_DATA.filter((surah) => {
      // Search filter using normalized Arabic & English matching
      const matchesSearch = matchSurah(surah, searchQuery);

      if (!matchesSearch) return false;

      // Revelation / Favorites filter
      if (activeFilter === 'مكية') return surah.revelationType === 'مكية';
      if (activeFilter === 'مدنية') return surah.revelationType === 'مدنية';
      if (activeFilter === 'favorites') return favorites.includes(surah.number);

      return true;
    }).sort((a, b) => {
      if (activeSort === 'number-asc') return a.number - b.number;
      if (activeSort === 'number-desc') return b.number - a.number;
      if (activeSort === 'verses-desc') return b.versesCount - a.versesCount;
      if (activeSort === 'verses-asc') return a.versesCount - b.versesCount;
      if (activeSort === 'name') return a.name.localeCompare(b.name, 'ar');
      return a.number - b.number;
    });
  }, [searchQuery, activeFilter, activeSort, favorites]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        favoritesCount={favorites.length}
        onGoHome={handleGoHome}
        onOpenFavorites={handleOpenFavorites}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentView={navbarView}
        selectedSurahName={selectedSurah?.name}
        allSurahs={SURAHS_DATA}
        onSelectSurah={handleSelectSurah}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {selectedSurah ? (
          /* 1. Surah Details Page */
          <SurahDetailsView
            surah={selectedSurah}
            allSurahs={SURAHS_DATA}
            onBack={handleGoHome}
            onSelectSurah={handleSelectSurah}
            isFavorite={favorites.includes(selectedSurah.number)}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : pageMode === 'favorites' ? (
          /* 2. Dedicated Favorites Page */
          <FavoritesView
            allSurahs={SURAHS_DATA}
            favoriteIds={favorites}
            onSelectSurah={handleSelectSurah}
            onToggleFavorite={handleToggleFavorite}
            onClearAllFavorites={handleClearAllFavorites}
            onBackToHome={handleGoHome}
            readSurahs={readSurahs}
            onToggleRead={handleToggleRead}
          />
        ) : (
          /* 3. Home Page: Hero + Search & Filters + Surahs Grid */
          <div>
            <HeroBanner />

            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              activeSort={activeSort}
              setActiveSort={setActiveSort}
              viewMode={viewMode}
              setViewMode={setViewMode}
              totalResultsCount={filteredSurahs.length}
            />

            {/* Surahs Grid / List */}
            {filteredSurahs.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5'
                    : 'flex flex-col gap-3'
                }
              >
                {filteredSurahs.map((surah) => (
                  <SurahCard
                    key={surah.number}
                    surah={surah}
                    onSelectSurah={handleSelectSurah}
                    isFavorite={favorites.includes(surah.number)}
                    onToggleFavorite={handleToggleFavorite}
                    isRead={readSurahs.includes(surah.number)}
                    onToggleRead={handleToggleRead}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 my-8 max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                  <SearchX className="w-8 h-8" />
                </div>
                <h3 className="font-arabic-title text-xl font-bold text-slate-800 dark:text-slate-100">
                  لم نجد أي سورة متطابقة
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeFilter === 'favorites' && favorites.length === 0
                    ? 'لم تقم بإضافة أي سورة إلى قائمة المفضلة بعد. اضغط على أيقونة الإشارة المرجعية بأي سورة لحفظها هنا.'
                    : 'جرب البحث بكلمات أخرى أو إعادة ضبط التصفية لعرض السور.'}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors"
                >
                  إعادة ضبط البحث
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
