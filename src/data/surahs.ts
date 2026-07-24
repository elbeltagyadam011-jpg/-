import { Surah, SurahDetails } from '../types';
import surahsRaw from './surahs.json';

export const SURAHS_DATA: Surah[] = surahsRaw as Surah[];



/**
 * Returns structured placeholder details for a given Surah.
 * Strictly adheres to user requirement: "Do not generate Islamic content yet. Use placeholders only."
 */
export function getSurahPlaceholderDetails(surah: Surah): SurahDetails {
  return {
    surahNumber: surah.number,
    overview: `[نظرة عامة توضيحية لسورة ${surah.name}] - هنا يوضع ملخص عام يتضمن المحاور الرئيسة لسورة ${surah.name}، وترتيبها بين السور (${surah.number})، وطبيعة نزولها (${surah.revelationType})، وعدد آياتها (${surah.versesCount} آية). هذا نص تجريبي مخصص لهيكلة الواجهة.`,
    story: `[قصة السورة - نص تجريبي] - تتضمن سورة ${surah.name} مجموعة من العبر والقصص الموجهة للتأمل. هذا القسم سيحتوي مستقبلاً على العرض الكامل والسرد القصصي والتاريخي المتعلق بالسورة حسب المصادر المعتمَدة.`,
    tafsir: [
      {
        versesRange: `الآيات (1 - ${Math.min(5, surah.versesCount)})`,
        title: 'المقطع الأول: الافتتاح والمقاصد العامة',
        summary: `[تفسير توضيحي للمقطع الأول من سورة ${surah.name}] - شرح وتفسير ميسّر للآيات الأولى يسلط الضوء على المعاني اللغوية والبيانية والربط بين أجزاء النص.`
      },
      {
        versesRange: `الآيات (${Math.min(6, surah.versesCount)} - ${Math.min(15, surah.versesCount)})`,
        title: 'المقطع الثاني: المحاور الوسطى والتربوية',
        summary: `[تفسير توضيحي للمقطع الثاني من سورة ${surah.name}] - بيان الأحكام والمفاهيم والأفكار الرئيسة المطروحة في السورة.`
      },
      {
        versesRange: `الآيات الخاتمة (${Math.max(1, surah.versesCount - 5)} - ${surah.versesCount})`,
        title: 'المقطع الأخير: خاتمة السورة والوصايا',
        summary: `[تفسير توضيحي لختام السورة] - بيان للنتائج والتوجيهات الإيمانية التي خُتمت بها السورة.`
      }
    ],
    lessons: [
      `[درس مستفاد 1] - التأمل في التوجيهات الأخلاقية والتربوية التي تقدمها سورة ${surah.name}.`,
      `[درس مستفاد 2] - تعزيز قيم الصبر والتفكر في الآيات والأحكام.`,
      `[درس مستفاد 3] - التطبيق العملي للتعليمات الواردة في النص القرآني في الحياة اليومية.`,
      `[درس مستفاد 4] - فهم الحكمة من تنوع الخطاب بين الترغيب والترهيب والقصص.`,
    ],
    reasonOfRevelation: `[أسباب النزول - نص توضيحي] - سيُعرض هنا السياق التاريخي والأسباب المأثورة لنزول سورة ${surah.name} أو بعض آياتها، وفق ما ثبت في كتب أسباب النزول المعتمدة.`,
    keyVerses: [
      {
        verseNumber: 1,
        textPlaceholder: `﴿ [نص الآية الأولى من سورة ${surah.name} - موضع نص آية تجريبي] ﴾`,
        reflectionNote: 'تأمل توضيحي حول دلالة الافتتاح والألفاظ الواردة فيها.'
      },
      {
        verseNumber: Math.floor(surah.versesCount / 2) || 1,
        textPlaceholder: `﴿ [نص الآية الوسطى من سورة ${surah.name} - موضع نص آية تجريبي] ﴾`,
        reflectionNote: 'تأمل توضيحي حول المحور المركز للسورة ورسالتها الإيمانية.'
      },
      {
        verseNumber: surah.versesCount,
        textPlaceholder: `﴿ [نص الآية الأخيرة من سورة ${surah.name} - موضع نص آية تجريبي] ﴾`,
        reflectionNote: 'تأمل توضيحي حول ارتباط الخاتمة بالافتتاحية وتكامل المعنى.'
      }
    ],
    references: [
      { title: 'تفسير ابن كثير (تفسير القرآن العظيم)', author: 'الإمام ابن كثير', type: 'تفسير' },
      { title: 'التفسير الميسر', author: 'نخبة من العلماء', type: 'تفسير ميسر' },
      { title: 'في ظلال القرآن', author: 'سيد قطب', type: 'تدبر وبيان' },
      { title: 'أسباب النزول', author: 'الإمام الواحدي', type: 'علوم القرآن' }
    ]
  };
}
