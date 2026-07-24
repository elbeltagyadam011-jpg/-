export type RevelationType = 'مكية' | 'مدنية';

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  revelationType: RevelationType;
  versesCount: number;
  meaning: string;
}

export interface KeyVersePlaceholder {
  verseNumber: number;
  textPlaceholder: string;
  reflectionNote: string;
}

export interface TafsirSectionPlaceholder {
  versesRange: string;
  title: string;
  summary: string;
}

export interface ReferenceItem {
  title: string;
  author: string;
  type: string;
}

export interface SurahDetails {
  surahNumber: number;
  overview: string;
  story: string;
  tafsir: TafsirSectionPlaceholder[];
  lessons: string[];
  reasonOfRevelation: string;
  keyVerses: KeyVersePlaceholder[];
  references: ReferenceItem[];
}

export type ActiveTab = 
  | 'overview' 
  | 'tafsir' 
  | 'stories' 
  | 'lessons' 
  | 'reasons' 
  | 'references';

export type FilterType = 'all' | 'مكية' | 'مدنية' | 'favorites';
export type SortType = 'number-asc' | 'number-desc' | 'verses-desc' | 'verses-asc' | 'name';
