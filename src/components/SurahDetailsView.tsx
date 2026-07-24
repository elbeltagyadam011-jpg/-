import React, { useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  History,
  FileText,
  Lightbulb,
  MapPin,
  Quote,
  Library,
  Share2,
  Check,
  Info,
  Sparkles,
  PenTool,
  Save,
  CheckCircle,
  Layers,
  ListFilter
} from 'lucide-react';
import { Surah, ActiveTab } from '../types';
import { getSurahPlaceholderDetails } from '../data/surahs';

interface SurahDetailsViewProps {
  surah: Surah;
  allSurahs: Surah[];
  onBack: () => void;
  onSelectSurah: (surah: Surah) => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, surahNumber: number) => void;
}

export const SurahDetailsView: React.FC<SurahDetailsViewProps> = ({
  surah,
  allSurahs,
  onBack,
  onSelectSurah,
  isFavorite,
  onToggleFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab | 'all'>('all');
  const [copied, setCopied] = useState(false);
  const [userNote, setUserNote] = useState<string>(() => {
    return localStorage.getItem(`tadabbur_note_surah_${surah.number}`) || '';
  });
  const [noteSaved, setNoteSaved] = useState(false);

  const details = getSurahPlaceholderDetails(surah);

  const prevSurah = surah.number > 1 ? allSurahs[surah.number - 2] : null;
  const nextSurah = surah.number < 114 ? allSurahs[surah.number] : null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveNote = () => {
    localStorage.setItem(`tadabbur_note_surah_${surah.number}`, userNote);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const tabs: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview | نظرة عامة', icon: BookOpen },
    { id: 'tafsir', label: 'Tafsir | التفسير', icon: FileText },
    { id: 'stories', label: 'Stories | القصص', icon: History },
    { id: 'lessons', label: 'Lessons | الدروس', icon: Lightbulb },
    { id: 'reasons', label: 'Reason of Revelation | أسباب النزول', icon: MapPin },
    { id: 'references', label: 'References | المراجع', icon: Library },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      
      {/* Navigation & Action Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        
        {/* Back button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لقائمة السور</span>
        </button>

        {/* Prev / Next Surah Quick Jumps */}
        <div className="flex items-center gap-2">
          {prevSurah ? (
            <button
              onClick={() => onSelectSurah(prevSurah)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-950/40 text-slate-600 dark:text-slate-300 hover:text-emerald-700 text-xs font-semibold transition-colors"
              title={`السورة السابقة: سورة ${prevSurah.name}`}
            >
              <ChevronRight className="w-4 h-4" />
              <span className="hidden sm:inline">السورة السابقة ({prevSurah.name})</span>
              <span className="sm:hidden">السابقة</span>
            </button>
          ) : (
            <span className="text-xs text-slate-300 dark:text-slate-700 px-3 py-1.5">بداية القرآن</span>
          )}

          <span className="text-slate-300 dark:text-slate-700">|</span>

          {nextSurah ? (
            <button
              onClick={() => onSelectSurah(nextSurah)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-950/40 text-slate-600 dark:text-slate-300 hover:text-emerald-700 text-xs font-semibold transition-colors"
              title={`السورة التالية: سورة ${nextSurah.name}`}
            >
              <span className="hidden sm:inline">السورة التالية ({nextSurah.name})</span>
              <span className="sm:hidden">التالية</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-xs text-slate-300 dark:text-slate-700 px-3 py-1.5">نهاية القرآن</span>
          )}
        </div>

        {/* Favorite & Share */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => onToggleFavorite(e, surah.number)}
            className={`p-2 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold ${
              isFavorite
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
            <span className="hidden sm:inline">{isFavorite ? 'في المفضلة' : 'حفظ'}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
            title="مشاركة الرابط"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'تم النسخ' : 'مشاركة'}</span>
          </button>
        </div>

      </div>

      {/* Surah Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white p-6 sm:p-10 shadow-xl border border-emerald-700/30 text-center">
        
        {/* Geometric Accent background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          
          {/* Surah Number Octagonal Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-amber-300 font-arabic-title text-2xl font-bold shadow-inner">
            {surah.number}
          </div>

          {/* Surah Name */}
          <h1 className="font-arabic-title text-4xl sm:text-5xl font-black text-amber-100 tracking-wide">
            سورة {surah.name}
          </h1>

          <p className="text-emerald-200/80 text-sm font-sans">
            {surah.englishName} • {surah.meaning}
          </p>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-600/30 text-emerald-200">
              النوع: <strong className="text-white">{surah.revelationType}</strong>
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-600/30 text-emerald-200">
              عدد الآيات: <strong className="text-white">{surah.versesCount} آية</strong>
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-600/30 text-emerald-200">
              رقم السورة: <strong className="text-white">#{surah.number}</strong>
            </span>
          </div>

          {/* Basmala Banner if not Surah At-Tawbah (9) */}
          {surah.number !== 9 && (
            <div className="pt-6 border-t border-emerald-800/40">
              <p className="font-quran text-2xl sm:text-3xl text-amber-200/90 leading-loose">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </p>
            </div>
          )}

          {/* Placeholder Notice Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-sans mt-2">
            <Info className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>تننويه: كافة الأقسام المعروضة تحتوي على نصوص توضيحية مؤقتة بانتظار المادة الرسمية.</span>
          </div>

        </div>
      </div>

      {/* Sections Sticky Tabs */}
      <div className="sticky top-16 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-2 border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>عرض كافة الأقسام</span>
          </button>

          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sections Content Container */}
      <div className="space-y-8">
        
        {/* 1. SECTION: OVERVIEW (نظرة عامة) */}
        {(activeTab === 'all' || activeTab === 'overview') && (
          <section id="overview" className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-arabic-title text-2xl font-bold text-slate-800 dark:text-slate-100">
                  نظرة عامة (Overview)
                </h2>
                <p className="text-xs text-slate-400">التعريف بالسورة ومحاورها الرئيسة</p>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none space-y-4 font-sans text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              <p className="bg-emerald-50/60 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-200/50 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200">
                {details.overview}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-xs text-slate-400 block mb-1">النمط البلاغي</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                    سياق {surah.revelationType === 'مكية' ? 'بناء العقيدة والتفكر الكوني' : 'التشريعات والتنظيم الاجتماعي'}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-xs text-slate-400 block mb-1">حجم السورة</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                    {surah.versesCount > 100 ? 'من طوال السور' : surah.versesCount > 30 ? 'من المئين والمثاني' : 'من قصار السور (المفصّل)'}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-xs text-slate-400 block mb-1">حالة التفسير والتأمل</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm">
                    جاهز للتصفح المبدئي
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. SECTION: STORIES (القصص) */}
        {(activeTab === 'all' || activeTab === 'stories') && (
          <section id="stories" className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
                <History className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-arabic-title text-2xl font-bold text-slate-800 dark:text-slate-100">
                  القصص (Stories)
                </h2>
                <p className="text-xs text-slate-400">السياق القصصي والتاريخي والأحداث المرافقة</p>
              </div>
            </div>

            <div className="bg-amber-50/50 dark:bg-amber-950/20 p-5 rounded-2xl border border-amber-200/60 dark:border-amber-800/40 text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-3">
              <p>{details.story}</p>
              <div className="text-xs text-amber-800 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-900/40 p-3 rounded-lg inline-block">
                ملاحظة: هذا موضع مخصص لسرد القصة الخلفية والقصص المتضمنة في سورة {surah.name}.
              </div>
            </div>
          </section>
        )}

        {/* 3. SECTION: TAFSIR (التفسير) */}
        {(activeTab === 'all' || activeTab === 'tafsir') && (
          <section id="tafsir" className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-arabic-title text-2xl font-bold text-slate-800 dark:text-slate-100">
                  التفسير والبيان (Tafsir)
                </h2>
                <p className="text-xs text-slate-400">شرح معاني المقاطع والآيات حسب التسلسل</p>
              </div>
            </div>

            <div className="space-y-4">
              {details.tafsir.map((item, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 text-xs font-bold">
                      {item.versesRange}
                    </span>
                    <span className="text-xs text-slate-400 font-sans">قسم تفسيري #{idx + 1}</span>
                  </div>
                  <h3 className="font-arabic-title text-base font-bold text-slate-800 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. SECTION: LESSONS (الدروس والعبر) */}
        {(activeTab === 'all' || activeTab === 'lessons') && (
          <section id="lessons" className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-arabic-title text-2xl font-bold text-slate-800 dark:text-slate-100">
                  الدروس والعبر (Lessons)
                </h2>
                <p className="text-xs text-slate-400">التوجيهات والفوائد التربوية والعملية</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {details.lessons.map((lesson, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/30 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                    {lesson}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. SECTION: REASON OF REVELATION (أسباب النزول) */}
        {(activeTab === 'all' || activeTab === 'reasons') && (
          <section id="reasons" className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-arabic-title text-2xl font-bold text-slate-800 dark:text-slate-100">
                  أسباب النزول (Reason of Revelation)
                </h2>
                <p className="text-xs text-slate-400">الوقائع والأسئلة التي نزلت فيها السورة أو بعض آياتها</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-xl border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              <p>{details.reasonOfRevelation}</p>
            </div>
          </section>
        )}


        {/* 7. SECTION: REFERENCES (المراجع والمصادر) */}
        {(activeTab === 'all' || activeTab === 'references') && (
          <section id="references" className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400">
                <Library className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-arabic-title text-2xl font-bold text-slate-800 dark:text-slate-100">
                  المراجع والمصادر (References)
                </h2>
                <p className="text-xs text-slate-400">أهم المصادر التفاسيرية وكتب العلوم القرآنية المستخدمة</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {details.references.map((ref, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                      {ref.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                      المؤلف: {ref.author}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 text-xs font-semibold shrink-0">
                    {ref.type}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BONUS: USER PERSONAL REFLECTIONS / TADABBUR NOTEBOOK */}
        <section className="bg-gradient-to-br from-emerald-900/10 via-teal-900/10 to-slate-900/10 dark:from-slate-900 dark:to-emerald-950/40 rounded-2xl p-6 sm:p-8 border border-emerald-500/30 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-600 text-white">
                <PenTool className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-arabic-title text-xl font-bold text-slate-800 dark:text-slate-100">
                  دفتر خَواطِرِي وَتَدَبُّرِي لِسُورَةِ {surah.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">سجّل تأملاتك وملاحظاتك الشخصية أثناء تدبرك للسورة (محفوظة محلياً)</p>
              </div>
            </div>

            <button
              onClick={handleSaveNote}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              {noteSaved ? <CheckCircle className="w-4 h-4 text-emerald-200" /> : <Save className="w-4 h-4" />}
              <span>{noteSaved ? 'تم الحفظ!' : 'حفظ الخاطرة'}</span>
            </button>
          </div>

          <textarea
            value={userNote}
            onChange={(e) => setUserNote(e.target.value)}
            rows={4}
            placeholder={`دون هنا أفكارك وتأملاتك الخاطرة حول سورة ${surah.name}...`}
            className="w-full bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 rounded-xl p-4 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed resize-y"
          />
        </section>

      </div>
    </div>
  );
};
