import { Surah } from '../types';

/**
 * Normalizes Arabic text by removing tashkeel (diacritics) and unifying letter variations
 * (alefs, ta marbouta, alef maqsura) to allow fast, forgiving search matches.
 */
export function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '') // Remove short vowels / tashkeel
    .replace(/[أإآ]/g, 'ا')               // Normalize Alef variants
    .replace(/ة/g, 'ه')                   // Normalize Ta Marbouta to Ha
    .replace(/ى/g, 'ي')                   // Normalize Alef Maqsura to Ya
    .trim()
    .toLowerCase();
}

/**
 * Checks if a Surah matches the search query.
 * Matches on: Arabic name, English name, Surah number, and Surah meaning.
 */
export function matchSurah(surah: Surah, query: string): boolean {
  const q = query.trim();
  if (!q) return true;

  const normalizedQuery = normalizeArabic(q);
  const normalizedArabicName = normalizeArabic(surah.name);
  const normalizedMeaning = normalizeArabic(surah.meaning);
  const englishName = surah.englishName.toLowerCase();
  const surahNum = surah.number.toString();

  return (
    normalizedArabicName.includes(normalizedQuery) ||
    englishName.includes(q.toLowerCase()) ||
    surahNum === q ||
    normalizedMeaning.includes(normalizedQuery)
  );
}
