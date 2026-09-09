import type { Metadata } from 'next';
import { localePath, locales, type Locale } from '../i18n/locales.ts';

export function siteOrigin(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined;
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_ORIGIN must be an HTTPS origin without credentials, path, query or fragment.');
  }
  return url.origin;
}

export function pageMetadata(locale: Locale, copy: { title: string; description: string }, origin?: string): Metadata {
  const base = siteOrigin(origin);
  return {
    ...copy,
    robots: { index: false, follow: false },
    icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
    ...(base ? {
      metadataBase: new URL(base),
      alternates: {
        canonical: `${base}${localePath(locale)}`,
        languages: Object.fromEntries(locales.map((language) => [language, `${base}${localePath(language)}`])),
      },
      openGraph: {
        ...copy,
        type: 'website',
        url: `${base}${localePath(locale)}`,
        locale: locale === 'ar' ? 'ar_MA' : 'en_US',
        alternateLocale: locale === 'ar' ? 'en_US' : 'ar_MA',
      },
    } : {}),
  };
}

export function personSchema(copy: { name: string; role: string }) {
  // Only identity actually displayed in this shell. URL-based graph awaits D07.
  return { '@context': 'https://schema.org', '@type': 'Person', name: copy.name, jobTitle: copy.role };
}

export function serializeSchema(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
