import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary } from '../../lib/i18n/dictionaries';
import { isLocale, localePath } from '../../lib/i18n/locales';
import { personSchema, serializeSchema } from '../../lib/seo/metadata';
import styles from './page.module.css';

export default async function FoundationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getDictionary(locale);
  return (
    <>
      <a className="skip-link" href="#main">{copy.a11y.skipToContent}</a>
      <header className={`container ${styles.header}`}>
        <Link href={localePath(locale)} aria-label={copy.brand.homeLabel} prefetch={false}>
          <Image src="/brand/aw-primary-color.svg" alt="" width={1425} height={326} unoptimized className={styles.logo} />
        </Link>
      </header>
      <main id="main" tabIndex={-1} className={`container ${styles.main}`}>
        <aside className={styles.preview} aria-label={locale === 'ar' ? 'معاينة خاصة' : 'Private preview'}>
          <p>{locale === 'ar' ? 'معاينة خاصة — الأساس التقني فقط. الصفحة الرئيسية قيد الإنجاز.' : 'Private preview — foundation only. The homepage is in progress.'}</p>
          <nav aria-label={locale === 'ar' ? 'اللغة' : 'Language'}>
            <Link href="/en/" lang="en" hrefLang="en" prefetch={false} aria-current={locale === 'en' ? 'page' : undefined}>{copy.nav.languageEn}</Link>
            <Link href="/ar/" lang="ar" hrefLang="ar" prefetch={false} aria-current={locale === 'ar' ? 'page' : undefined}>{copy.nav.languageAr}</Link>
          </nav>
        </aside>
        <div className={styles.introduction}>
          <p><bdi className="latin" dir="ltr">{copy.brand.name} · {copy.brand.role}</bdi></p>
          <p>{copy.hero.location}</p>
          <h1>{copy.hero.title}</h1>
          <p>{copy.hero.body}</p>
        </div>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(personSchema(copy.brand)) }} />
    </>
  );
}
