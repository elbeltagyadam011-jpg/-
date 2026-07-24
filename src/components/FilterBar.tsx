import React from 'react';
import { Filter, SortAsc, Grid, List, Bookmark, Search, X } from 'lucide-react';
import { FilterType, SortType } from '../types';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  activeFilter: FilterType;
  setActiveFilter: (val: FilterType) => void;
  activeSort: SortType;
  setActiveSort: (val: SortType) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (val: 'grid' | 'list') => void;
  totalResultsCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  activeSort,
  setActiveSort,
  viewMode,
  setViewMode,
  totalResultsCount,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 dark:border-slate-800 mb-6 space-y-4">
      
      {/* Prominent Fast Search Bar */}
      <div className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث سريع: اكتب اسم السورة (مثال: البقرة، الكهف، يس، Yasin)..."
            className="w-full bg-slate-50 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 rounded-2xl py-3 pr-11 pl-12 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-all"
          />
          <Search className="w-5 h-5 absolute right-4 text-emerald-600 dark:text-emerald-400 pointer-events-none" />

          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3.5 p-1 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-200 dark:bg-slate-700 rounded-full transition-colors flex items-center justify-center"
              title="مسح البحث"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="hidden sm:inline-block absolute left-3.5 text-[11px] font-sans font-medium text-slate-400 dark:text-slate-500 px-2 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-700/60">
              بحث سريع ⚡
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Filter Type Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap ml-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            التصفية:
          </span>

          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'all'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            جميع السور
          </button>

          <button
            onClick={() => setActiveFilter('مكية')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeFilter === 'مكية'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            مكية (86)
          </button>

          <button
            onClick={() => setActiveFilter('مدنية')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeFilter === 'مدنية'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            مدنية (28)
          </button>

          <button
            onClick={() => setActiveFilter('favorites')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeFilter === 'favorites'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            المفضلة فقط
          </button>
        </div>

        {/* Sort & View Mode controls */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
          
          {/* Results count */}
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            عرض <strong className="text-emerald-700 dark:text-emerald-400">{totalResultsCount}</strong> سورة
          </span>

          <div className="flex items-center gap-2">
            {/* Sort selector */}
            <div className="relative">
              <select
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value as SortType)}
                className="appearance-none bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-1.5 pr-8 pl-3 text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="number-asc">حسب ترتيب المصحف (1 - 114)</option>
                <option value="number-desc">ترتيب عكسي (114 - 1)</option>
                <option value="verses-desc">الأكثر آيات</option>
                <option value="verses-asc">الأقل آيات</option>
                <option value="name">أبجدياً (أ - ي)</option>
              </select>
              <SortAsc className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* View mode toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
                title="عرض شبكي"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
                title="عرض قائمة"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
