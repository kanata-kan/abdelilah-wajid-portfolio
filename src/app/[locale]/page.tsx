import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getDictionary } from '../../lib/i18n/dictionaries';
import { isLocale } from '../../lib/i18n/locales';
import { personSchema, serializeSchema } from '../../lib/seo/metadata';
import { SiteHeader } from '../../components/site-header';
import { BidiText } from '../../components/bidi-text';
import links from '../../generated/design-v1/links.json';
import styles from './page.module.css';

function Arrow() {
  return <svg className="icon icon-forward" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor"><path d="M3 10h14m-6-6 6 6-6 6" /></svg>;
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getDictionary(locale);
  // Interface annotations for the private preview, separate from frozen copy.
  const pending = locale === 'ar' ? 'الرابط النهائي قيد الاعتماد' : 'Final destination pending';
  const secondaryImagePending = locale === 'ar' ? 'لقطة المشروع قيد الاعتماد' : 'Project capture pending approval';
  return <>
    <a className="skip-link" href="#main">{copy.a11y.skipToContent}</a>
    <SiteHeader locale={locale} nav={copy.nav} homeLabel={copy.brand.homeLabel} />
    <main id="main" tabIndex={-1}>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="small"><BidiText>{copy.hero.eyebrow}</BidiText></p>
          <h1 id="hero-title">{copy.hero.title}</h1>
          <p>{copy.hero.body}</p>
          <div className="hero-actions">
            <a className="button" href={links.actions.heroPrimary}>{copy.hero.primaryAction}<Arrow /></a>
            <a className={styles.textAction} href={links.actions.heroSecondary}>{copy.hero.secondaryAction}</a>
          </div>
        </div>
        <figure>
          <picture>
            <source media="(max-width: 599px)" srcSet="/images/profile/abdelilah-wajid-product-engineer-portrait-mobile.webp" />
            <Image className="portrait" src="/images/profile/abdelilah-wajid-product-engineer-portrait-desktop.webp" alt={copy.a11y.portraitFinal} width={1200} height={800} fetchPriority="high" unoptimized />
          </picture>
          <figcaption className="portrait-caption caption">{copy.hero.location}</figcaption>
        </figure>
      </section>
      <p className="mobile-bridge container">{copy.hero.mobileBridge}</p>
      <section id="work" tabIndex={-1} className="featured section container" aria-labelledby="work-title">
        <div className="featured-intro">
          <p className="small"><span className="desktop-only"><BidiText>{copy.work.desktopEyebrow}</BidiText></span><span className="mobile-only"><BidiText>{copy.work.mobileEyebrow}</BidiText></span></p>
          <h2 id="work-title" className="featured-title"><span className="desktop-only"><BidiText>{copy.work.desktopTitle}</BidiText></span><span className="mobile-only">{copy.work.mobileTitle}</span></h2>
          <p>{copy.work.description}</p>
          <p className="featured-role small">{copy.work.role}</p>
        </div>
        <figure className="featured-figure">
          <Image className="youin-preview" src="/images/work/youin/guest-review-management.webp" alt={copy.a11y.youinPreview} width={1535} height={742} sizes="(max-width: 599px) 100vw, (max-width: 959px) 84vw, 54vw" unoptimized />
          <figcaption className="featured-status-desktop caption">{copy.work.status}</figcaption>
        </figure>
        <div className="featured-reasoning">
          {(['problem', 'decision', 'result'] as const).map((key) => <div key={key} className="reason"><h3>{copy.work[`${key}Label`]}</h3><p>{copy.work[key]}</p></div>)}
          <p className="featured-status-mobile caption">{copy.work.status}</p>
          <p className="case-action">{copy.work.action}</p><p className={`caption ${styles.pending}`}>{pending}</p>
        </div>
      </section>
      <section className="section container" aria-labelledby="other-work-title">
        <h2 id="other-work-title" className="other-work-title">{copy.otherWork.title}</h2>
        {(['electro', 'elmoussaif'] as const).map((key) => <article className="project-row" key={key}>
          <div><h3><bdi dir="ltr" className="latin">{copy.otherWork[key].name}</bdi></h3><p className="small"><span className="desktop-only"><BidiText>{copy.otherWork[key].description}</BidiText></span><span className="mobile-only"><BidiText>{copy.otherWork[key].descriptionMobile}</BidiText></span></p></div>
          <div className={`${styles.slot} ${styles.thumbnail}`}>{secondaryImagePending}</div>
        </article>)}
      </section>
      <section className="rescue container" aria-labelledby="rescue-title">
        <div><p className="small"><BidiText>{copy.rescue.eyebrow}</BidiText></p><h2 id="rescue-title">{copy.rescue.title}</h2><p>{copy.rescue.body}</p></div>
        <a className="button" href={links.actions.rescue}>{copy.rescue.action}<Arrow /></a>
      </section>
      <section id="approach" tabIndex={-1} className="section container" aria-labelledby="approach-title">
        <h2 id="approach-title" className="approach-title">{copy.approach.title}</h2>
        <div className="approach-steps">{copy.approach.steps.map((step) => <div className="approach-step" key={step.number}><h3><bdi dir="ltr" className={`latin ${styles.number}`}>{step.number}</bdi> {step.title}</h3><p>{step.body}</p></div>)}</div>
      </section>
      <section id="about" tabIndex={-1} className="about section container" aria-labelledby="about-title">
        <div><h2 id="about-title">{copy.about.title}</h2><p><BidiText>{copy.about.body}</BidiText></p></div>
        <div className="capabilities"><h2>{copy.about.capabilitiesTitle}</h2><ul>{copy.about.capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul></div>
      </section>
    </main>
    <footer id="contact" tabIndex={-1} className="contact">
      <div className="container"><div className="contact-main"><div><h2>{copy.contact.title}</h2><p>{copy.contact.body}</p></div><div><p>{copy.contact.action}</p><p className="caption">{pending}</p></div></div><p className="copyright caption"><BidiText>{copy.contact.copyright}</BidiText></p>
        <p className={`caption ${styles.preview}`}>{locale === 'ar' ? 'معاينة خاصة — صور المشاريع الثانوية والروابط النهائية قيد الاعتماد.' : 'Private preview — secondary project captures and final destinations pending approval.'}</p>
      </div>
    </footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(personSchema(copy.brand)) }} />
  </>;
}
