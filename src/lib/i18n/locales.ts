export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function localePath(locale: Locale): `/${Locale}/` {
  return `/${locale}/`;
}

export function direction(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

// Only implemented routes belong here. Root, case slugs and x-default await D02.
export const routes = locales.map((locale) => ({ locale, path: localePath(locale), released: false }));
