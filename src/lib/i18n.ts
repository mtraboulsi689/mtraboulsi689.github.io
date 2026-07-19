// Localized data fields: either a plain string (used for both languages —
// e.g. proper nouns, or data written by scripts that only know English) or
// an object with per-language variants.
export type Localized = string | { en: string; fr?: string };

export type Language = 'en' | 'fr';

export function pickLocalized(value: Localized | undefined, language: Language): string {
  if (value === undefined) return '';
  if (typeof value === 'string') return value;
  return value[language] ?? value.en;
}
