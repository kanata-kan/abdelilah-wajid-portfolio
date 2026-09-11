import 'server-only';
import en from '../../generated/design-v1/content/en.json';
import ar from '../../generated/design-v1/content/ar.json';
import type { Locale } from './locales';
import type { Dictionary } from './types';

export type { Dictionary } from './types';

// Use the frozen sources directly: no second editable copy or fallback locale.
const dictionaries = { en, ar } satisfies Record<Locale, Dictionary>;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
