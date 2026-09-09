import 'server-only';
import en from '../../../docs/design/v1.0/05-implementation/content/en.json';
import ar from '../../../docs/design/v1.0/05-implementation/content/ar.json';
import type { Locale } from './locales';

export type Dictionary = Omit<typeof en, 'locale' | 'direction'> & {
  locale: string;
  direction: string;
};

// Use the frozen sources directly: no second editable copy or fallback locale.
const dictionaries = { en, ar } satisfies Record<Locale, Dictionary>;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
