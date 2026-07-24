import React from 'react';
import { BookOpen, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand info */}
        <div className="flex items-center gap-3 text-right">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="font-arabic-title text-xl font-bold text-slate-800 dark:text-slate-100 block leading-tight">
              تطبيق تَدَبُّر
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              دليل السور القرآنية وتسهيل متعة التفكر
            </span>
          </div>
        </div>

        {/* Center message */}
        <div className="text-center text-xs text-slate-500 dark:text-slate-400 space-y-1">
          <p className="flex items-center justify-center gap-1">
            <span>تم تطوير الواجهة بأسلوب عصري يدعم كافة الشاشات واللغة العربية</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 inline" />
          </p>
          <p className="text-[11px] text-slate-400">
            جميع البيانات النمطية الحالية هي نماذج توضيحية لربط المادة المعتمدة لاحقاً.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
          تطبيق تدبر © {new Date().getFullYear()} • جميع الحقوق محفوظة
        </div>

      </div>
    </footer>
  );
};
