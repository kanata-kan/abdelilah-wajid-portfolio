import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { direction, isLocale, locales } from '../../lib/i18n/locales';
import { getDictionary } from '../../lib/i18n/dictionaries';
import { pageMetadata } from '../../lib/seo/metadata';
import { inter, arabic } from '../../styles/fonts';
import '../../styles/globals.css';

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: Omit<Props, 'children'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, getDictionary(locale).meta, process.env.SITE_ORIGIN);
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} dir={direction(locale)} className={`${inter.variable} ${arabic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
