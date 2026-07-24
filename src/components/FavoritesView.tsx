import React, { useState, useMemo } from 'react';
import { Surah, SortType, RevelationType } from '../types';
import { SurahCard } from './SurahCard';
import { matchSurah } from '../utils/search';
import { Bookmark, ArrowRight, Trash2, Search, Filter, Grid, List, Sparkles, BookOpen, Layers } from 'lucide-react';

interface FavoritesViewProps {
  allSurahs: Surah[];
  favoriteIds: number[];
  onSelectSurah: (surah: Surah) => void;
  onToggleFavorite: (e: React.MouseEvent, surahNumber: number) => void;
  onClearAllFavorites: () => void;
  onBackToHome: () => void;
  readSurahs: number[];
  onToggleRead: (e: React.MouseEvent, surahNumber: number) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  allSurahs,
  favoriteIds,
  onSelectSurah,
  onToggleFavorite,
  onClearAllFavorites,
  onBackToHome,
  readSurahs,
  onToggleRead,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | RevelationType>('all');
  const [sortType, setSortType] = useState<SortType>('number-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  // Get all favorited Surah objects
  const favoriteSurahs = useMemo(() => {
    return allSurahs.filter((s) => favoriteIds.includes(s.number));
  }, [allSurahs, favoriteIds]);

  // Statistics
  const makkiCount = useMemo(() => favoriteSurahs.filter((s) => s.revelationType === 'مكية').length, [favoriteSurahs]);
  const madaniCount = useMemo(() => favoriteSurahs.filter((s) => s.revelationType === 'مدنية').length, [favoriteSurahs]);
  const totalVerses = useMemo(() => favoriteSurahs.reduce((sum, s) => sum + s.versesCount, 0), [favoriteSurahs]);

  // Filtered & Sorted favorited surahs
  const filteredFavorites = useMemo(() => {
    return favoriteSurahs
      .filter((surah) => {
        const matchesSearch = matchSurah(surah, searchQuery);
        if (!matchesSearch) return false;
        if (filterType === 'مكية') return surah.revelationType === 'مكية';
        if (filterType === 'مدنية') return surah.revelationType === 'مدنية';
        return true;
      })
      .sort((a, b) => {
        if (sortType === 'number-asc') return a.number - b.number;
        if (sortType === 'number-desc') return b.number - a.number;
        if (sortType === 'verses-desc') return b.versesCount - a.versesCount;
        if (sortType === 'verses-asc') return a.versesCount - b.versesCount;
        if (sortType === 'name') return a.name.localeCompare(b.name, 'ar');
        return a.number - b.number;
      });
  }, [favoriteSurahs, searchQuery, filterType, sortType]);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Top Header Navigation Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 transition-colors text-xs font-semibold"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى فهرس السور</span>
        </button>

        {favoriteIds.length > 0 && (
          <button
            onClick={() => setShowConfirmClear(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-medium transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>إزالة جميع المفضلة</span>
          </button>
        )}
      </div>

      {/* Confirmation Modal for Clear All */}
      {showConfirmClear && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 text-center animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-arabic-title text-xl font-bold text-slate-800 dark:text-slate-100">
              تأكيد مسح المفضلة
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              هل أنت أخيرًا متأكد من إزالة جميع السور المحفوظة من قائمة المفضلة؟
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClearAllFavorites();
                  setShowConfirmClear(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
              >
                نعم، مسح الكل
              </button>
              <button
                onClick={() => setShowConfirmClear(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner for Favorites Page */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-800 via-amber-900 to-amber-950 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/20 text-xs font-semibold backdrop-blur-xs">
            <Bookmark className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>السور المحفوظة ومتابعة التلاوة</span>
          </div>

          <h1 className="font-arabic-title text-3xl sm:text-4xl font-extrabold text-amber-100 tracking-wide">
            قائمة المفضلة الخاصة بك
          </h1>

          <p className="text-xs sm:text-sm text-amber-100/80 max-w-2xl leading-relaxed">
            مساحتك الخاصة للوصول السريع إلى السور التي تود المداومة على قراءتها وتدبرها واستخلاص العبر منها.
          </p>

          {/* Key Stats Bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
            <div className="bg-amber-950/40 border border-amber-500/20 rounded-2xl p-3 text-center">
              <div className="text-2xl font-bold font-arabic-title text-amber-200">{favoriteIds.length}</div>
              <div className="text-[11px] text-amber-300/70">سورة محددة</div>
            </div>
            <div className="bg-amber-950/40 border border-amber-500/20 rounded-2xl p-3 text-center">
              <div className="text-2xl font-bold font-arabic-title text-amber-200">{makkiCount}</div>
              <div className="text-[11px] text-amber-300/70">سور مكية</div>
            </div>
            <div className="bg-amber-950/40 border border-amber-500/20 rounded-2xl p-3 text-center">
              <div className="text-2xl font-bold font-arabic-title text-amber-200">{madaniCount}</div>
              <div className="text-[11px] text-amber-300/70">سور مدنية</div>
            </div>
            <div className="bg-amber-950/40 border border-amber-500/20 rounded-2xl p-3 text-center">
              <div className="text-2xl font-bold font-arabic-title text-amber-200">{totalVerses}</div>
              <div className="text-[11px] text-amber-300/70">إجمالي الآيات</div>
            </div>
          </div>
        </div>

        {/* Decorative Watermark Background */}
        <div className="absolute left-[-20px] bottom-[-20px] opacity-10 pointer-events-none select-none text-white">
          <Bookmark className="w-72 h-72" />
        </div>
      </div>

      {favoriteIds.length > 0 ? (
        <div className="space-y-5">
          {/* Controls & Quick Filter in Favorites */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search within favorites */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث داخل المفضلة..."
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pr-9 pl-3 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
              <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                  filterType === 'all'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                الكل ({favoriteSurahs.length})
              </button>
              <button
                onClick={() => setFilterType('مكية')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                  filterType === 'مكية'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                مكية ({makkiCount})
              </button>
              <button
                onClick={() => setFilterType('مدنية')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                  filterType === 'مدنية'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                مدنية ({madaniCount})
              </button>
            </div>

            {/* View Mode Grid/List */}
            <div className="flex items-center gap-1.5 self-end md:self-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="عرض الشبكة"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="عرض القائمة"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredFavorites.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5'
                  : 'flex flex-col gap-3'
              }
            >
              {filteredFavorites.map((surah) => (
                <SurahCard
                  key={surah.number}
                  surah={surah}
                  onSelectSurah={onSelectSurah}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                  isRead={readSurahs.includes(surah.number)}
                  onToggleRead={onToggleRead}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 text-center border border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                لا توجد نتائج تطابق خيارات التصفية داخل مفضلتك.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 my-6 max-w-lg mx-auto space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>

          <h3 className="font-arabic-title text-2xl font-bold text-slate-800 dark:text-slate-100">
            قائمة المفضلة فارغة حالياً
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
            لم تقم بتمييز أي سورة حتى الآن. يمكنك حفظ أي سورة للرجوع إليها بسرعة من خلال النقر على أيقونة الإشارة المرجعية (🔖) في البطاقات.
          </p>

          <div className="pt-2">
            <button
              onClick={onBackToHome}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 mx-auto"
            >
              <BookOpen className="w-4 h-4" />
              <span>تصفح الفهرس الكامل (114 سورة)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
