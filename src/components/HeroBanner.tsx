import React from 'react';
import { BookOpen, Sparkles, Compass, ShieldCheck, Info } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 lg:p-10 mb-8 shadow-xl shadow-emerald-950/20 border border-emerald-700/30">
      
      {/* Decorative Islamic Geometric Patterns background overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-12 -top-12 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl">
        
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-medium mb-4 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>منصة تدبر القرآن الكريم الرقمية</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-arabic-title text-emerald-50 leading-tight mb-3">
          فَهْمٌ.. تَأَمُّلٌ.. وَتَدَبُّرٌ لِسُوَرِ القُرْآنِ الكَرِيمِ
        </h1>

        <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl leading-relaxed mb-6">
          استكشف سور القرآن الـ 114 بأسلوب حديث وميسّر. تعرف على نظرة عامة لكل سورة، قصتها، تفسيرها، دراستها، أسباب نزولها والآيات المحورية.
        </p>

        {/* Notice Badge as requested ("Use placeholders only") */}
        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-200 text-xs mb-6 max-w-full">
          <Info className="w-4 h-4 text-amber-300 shrink-0" />
          <span>تنبيه: محتوى السور الحالي عبارة عن نماذج نصية توضيحية (Placeholders) بانتظار اعتماد المادة الإسلامية.</span>
        </div>

        {/* Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-emerald-700/40">
          <div className="bg-emerald-950/40 backdrop-blur-sm p-3 rounded-2xl border border-emerald-600/20">
            <span className="text-xs text-emerald-300 block mb-1">إجمالي السور</span>
            <span className="text-2xl font-bold font-arabic-title text-amber-300">114</span>
            <span className="text-[11px] text-emerald-200/70 block">سورة كاملة</span>
          </div>

          <div className="bg-emerald-950/40 backdrop-blur-sm p-3 rounded-2xl border border-emerald-600/20">
            <span className="text-xs text-emerald-300 block mb-1">السور المكية</span>
            <span className="text-2xl font-bold font-arabic-title text-emerald-200">86</span>
            <span className="text-[11px] text-emerald-200/70 block">نزلت بمكة المكرمة</span>
          </div>

          <div className="bg-emerald-950/40 backdrop-blur-sm p-3 rounded-2xl border border-emerald-600/20">
            <span className="text-xs text-emerald-300 block mb-1">السور المدنية</span>
            <span className="text-2xl font-bold font-arabic-title text-teal-200">28</span>
            <span className="text-[11px] text-emerald-200/70 block">نزلت بالمدينة المنورة</span>
          </div>

          <div className="bg-emerald-950/40 backdrop-blur-sm p-3 rounded-2xl border border-emerald-600/20">
            <span className="text-xs text-emerald-300 block mb-1">عدد الآيات</span>
            <span className="text-2xl font-bold font-arabic-title text-amber-200">6236</span>
            <span className="text-[11px] text-emerald-200/70 block">آية كريمة</span>
          </div>
        </div>

      </div>
    </div>
  );
};
