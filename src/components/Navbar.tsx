import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Moon, Sun, Bookmark, Search, X, ChevronLeft, Sparkles } from 'lucide-react';
import { Surah } from '../types';
import { matchSurah } from '../utils/search';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  favoritesCount: number;
  onGoHome: () => void;
  onOpenFavorites: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentView: 'home' | 'details' | 'favorites';
  selectedSurahName?: string;
  allSurahs?: Surah[];
  onSelectSurah?: (surah: Surah) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  favoritesCount,
  onGoHome,
  onOpenFavorites,
  searchQuery,
  setSearchQuery,
  currentView,
  selectedSurahName,
  allSurahs = [],
  onSelectSurah,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter matching surahs for live instant dropdown
  const matchingSurahs = searchQuery.trim() && allSurahs.length > 0
    ? allSurahs.filter((surah) => matchSurah(surah, searchQuery)).slice(0, 8)
    : [];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/85 dark:bg-slate-900/85 border-b border-emerald-900/10 dark:border-emerald-500/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onGoHome}
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="text-right">
              <span className="font-arabic-title text-2xl font-bold bg-gradient-to-l from-emerald-800 to-teal-900 dark:from-emerald-400 dark:to-teal-200 bg-clip-text text-transparent block leading-none">
                تَدَبُّر
              </span>
              <span className="text-[11px] text-emerald-800/70 dark:text-emerald-400/70 font-sans tracking-wide block">
                تأمل في سور القرآن
              </span>
            </div>
          </button>

          {currentView === 'details' && selectedSurahName && (
            <div className="hidden lg:flex items-center gap-2 pr-4 border-r border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300">
              <span className="text-slate-400">/</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold font-arabic-title">
                سورة {selectedSurahName}
              </span>
            </div>
          )}
        </div>

        {/* Global Search input with instant auto-complete suggestions */}
        <div ref={containerRef} className="flex-1 max-w-md relative mx-2">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsFocused(true);
              }}
              onFocus={() => setIsFocused(true)}
              placeholder="ابحث عن اسم السورة بالعرية أو English..."
              className="w-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 rounded-full py-2 pr-10 pl-9 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-400" />
            
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsFocused(false);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-200 dark:bg-slate-700 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
                title="مسح"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Instant Search Suggestions Overlay Dropdown */}
          {isFocused && searchQuery.trim().length > 0 && (
            <div className="absolute top-full right-0 left-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 divide-y divide-slate-100 dark:divide-slate-800 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>نتائج البحث الفوري ({matchingSurahs.length})</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400">انقر لفتح السورة</span>
              </div>

              {matchingSurahs.length > 0 ? (
                <div className="max-h-80 overflow-y-auto">
                  {matchingSurahs.map((surah) => (
                    <button
                      key={surah.number}
                      onClick={() => {
                        if (onSelectSurah) {
                          onSelectSurah(surah);
                        }
                        setIsFocused(false);
                      }}
                      className="w-full text-right p-3 hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40 transition-colors flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold font-arabic-title group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          {surah.number}
                        </div>
                        <div>
                          <div className="font-arabic-title text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                            سورة {surah.name}
                          </div>
                          <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                            <span>{surah.englishName}</span>
                            <span>•</span>
                            <span>{surah.revelationType}</span>
                            <span>•</span>
                            <span>{surah.versesCount} آية</span>
                          </div>
                        </div>
                      </div>

                      <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:-translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400">
                  لا توجد سورة تطابق كلمة البحث "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions & Controls */}
        <div className="flex items-center gap-2">
          {/* Favorites quick button */}
          <button
            onClick={onOpenFavorites}
            className={`relative px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-xs sm:text-sm font-semibold ${
              currentView === 'favorites'
                ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="المفضلة"
          >
            <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${currentView === 'favorites' ? 'fill-amber-500 text-amber-500' : 'text-amber-600 dark:text-amber-400'}`} />
            <span className="hidden sm:inline">المفضلة</span>
            {favoritesCount > 0 && (
              <span className="bg-amber-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Theme mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={darkMode ? 'الوضع المضيء' : 'الوضع الليلي'}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>

          {/* Home shortcut button if in details */}
          {currentView === 'details' && (
            <button
              onClick={onGoHome}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>قائمة السور</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
