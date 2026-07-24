import React from 'react';
import { Bookmark, BookOpen, CheckCircle, ArrowLeft } from 'lucide-react';
import { Surah } from '../types';

interface SurahCardProps {
  surah: Surah;
  onSelectSurah: (surah: Surah) => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, surahNumber: number) => void;
  isRead: boolean;
  onToggleRead: (e: React.MouseEvent, surahNumber: number) => void;
  viewMode: 'grid' | 'list';
}

export const SurahCard: React.FC<SurahCardProps> = ({
  surah,
  onSelectSurah,
  isFavorite,
  onToggleFavorite,
  isRead,
  onToggleRead,
  viewMode,
}) => {
  const isMeccan = surah.revelationType === 'مكية';

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onSelectSurah(surah)}
        className="group relative bg-white dark:bg-slate-900 hover:bg-emerald-50/50 dark:hover:bg-slate-800/80 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          {/* Surah Number Badge */}
          <div className="w-11 h-11 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-300/50 dark:border-emerald-700/50 flex items-center justify-center font-arabic-title text-emerald-800 dark:text-emerald-300 font-bold text-base shrink-0 group-hover:scale-105 transition-transform">
            {surah.number}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-arabic-title text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                سورة {surah.name}
              </h3>
              <span className="text-xs text-slate-400 font-sans">({surah.englishName})</span>
            </div>
            
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span className={`inline-flex items-center gap-1 font-medium ${isMeccan ? 'text-amber-700 dark:text-amber-400' : 'text-teal-700 dark:text-teal-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isMeccan ? 'bg-amber-500' : 'bg-teal-500'}`} />
                {surah.revelationType}
              </span>
              <span>•</span>
              <span>عدد الآيات: <strong>{surah.versesCount}</strong> آية</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline text-slate-400">{surah.meaning}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={(e) => onToggleFavorite(e, surah.number)}
            className={`p-2 rounded-xl transition-colors ${
              isFavorite
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
                : 'text-slate-300 hover:text-amber-500 dark:text-slate-600 dark:hover:text-amber-400'
            }`}
            title={isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
          >
            <Bookmark className={`w-5 h-5 ${isFavorite ? 'fill-amber-500' : ''}`} />
          </button>

          <button
            onClick={(e) => onToggleRead(e, surah.number)}
            className={`p-2 rounded-xl transition-colors ${
              isRead
                ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50'
                : 'text-slate-300 hover:text-emerald-600 dark:text-slate-600 dark:hover:text-emerald-400'
            }`}
            title={isRead ? 'مُتَدَبَّرة' : 'تحديد كمقروءة'}
          >
            <CheckCircle className={`w-5 h-5 ${isRead ? 'fill-emerald-600 text-white' : ''}`} />
          </button>

          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
        </div>
      </div>
    );
  }

  // Grid View Card
  return (
    <div
      onClick={() => onSelectSurah(surah)}
      className="group relative bg-white dark:bg-slate-900 hover:bg-emerald-50/40 dark:hover:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
    >
      {/* Background watermark number */}
      <span className="absolute -left-2 -bottom-4 text-7xl font-arabic-title font-black text-slate-100 dark:text-slate-800/40 select-none pointer-events-none group-hover:text-emerald-100/60 dark:group-hover:text-slate-800 transition-colors">
        {surah.number}
      </span>

      <div>
        {/* Top Header: Number badge + Revelation Badge + Favorite */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            {/* Islamic Octagon Number Badge */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-950/80 rotate-45 rounded-lg border border-emerald-300 dark:border-emerald-700/60 group-hover:bg-emerald-600 transition-colors" />
              <span className="relative z-10 font-arabic-title font-bold text-sm text-emerald-800 dark:text-emerald-300 group-hover:text-white transition-colors">
                {surah.number}
              </span>
            </div>

            {/* Revelation Type Tag (Makki / Madani) */}
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 ${
                isMeccan
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40'
                  : 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/40'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isMeccan ? 'bg-amber-500' : 'bg-teal-500'}`} />
              {surah.revelationType}
            </span>
          </div>

          {/* Quick Favorite & Read Buttons */}
          <div className="flex items-center gap-1 z-10">
            <button
              onClick={(e) => onToggleFavorite(e, surah.number)}
              className={`p-1.5 rounded-lg transition-all ${
                isFavorite
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/60'
                  : 'text-slate-300 hover:text-amber-500 dark:text-slate-600 dark:hover:text-amber-400'
              }`}
              title={isFavorite ? 'إزالة من المفضلة' : 'حفظ بالمفضلة'}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-500' : ''}`} />
            </button>

            <button
              onClick={(e) => onToggleRead(e, surah.number)}
              className={`p-1.5 rounded-lg transition-all ${
                isRead
                  ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60'
                  : 'text-slate-300 hover:text-emerald-600 dark:text-slate-600 dark:hover:text-emerald-400'
              }`}
              title={isRead ? 'مكتملة التدبر' : 'تحديد كـ "تم التدبر"'}
            >
              <CheckCircle className={`w-4 h-4 ${isRead ? 'fill-emerald-600 text-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Surah Name in Calligraphic Font */}
        <div className="mb-3">
          <h2 className="font-arabic-title text-2xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
            سورة {surah.name}
          </h2>
          <p className="text-xs text-slate-400 font-sans tracking-wide">
            {surah.englishName}
          </p>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed font-sans">
          {surah.meaning}
        </p>
      </div>

      {/* Footer info: Verses count & CTA */}
      <div className="relative z-10 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          عدد الآيات: <span className="text-emerald-700 dark:text-emerald-400">{surah.versesCount}</span>
        </span>

        <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold group-hover:translate-x-[-4px] transition-transform">
          <span>التفاصيل</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
