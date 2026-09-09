'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from '../lib/i18n/dictionaries';
import type { Locale } from '../lib/i18n/locales';
import links from '../../docs/design/v1.0/05-implementation/links.json';

export function SiteHeader({ locale, nav, homeLabel }: { locale: Locale; nav: Dictionary['nav']; homeLabel: string }) {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState('');
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    const desktop = window.matchMedia('(min-width: 960px)');
    const onResize = () => { if (desktop.matches) setOpen(false); };
    updateHash();
    window.addEventListener('hashchange', updateHash);
    desktop.addEventListener('change', onResize);
    return () => { window.removeEventListener('hashchange', updateHash); desktop.removeEventListener('change', onResize); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);
  const navigation = Object.entries(links.navigation).map(([key, href]) => (
    <a key={key} href={href} onClick={() => { setOpen(false); document.querySelector<HTMLElement>(href)?.focus({ preventScroll: true }); }}>{nav[key as keyof typeof links.navigation]}</a>
  ));
  const languages = (['en', 'ar'] as const).map((language) => (
    <Link key={language} href={`${links.home[language]}${hash}`} lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} hrefLang={language} prefetch={false} aria-current={locale === language ? 'page' : undefined} onClick={() => setOpen(false)}>
      {language === 'en' ? nav.languageEn : nav.languageAr}
    </Link>
  ));
  return <>
    <header className="site-header container">
      <Link className="brand" href={links.home[locale]} aria-label={homeLabel} prefetch={false}>
        <Image src="/brand/aw-primary-color.svg" alt="" width={1425} height={326} unoptimized />
      </Link>
      <nav className="desktop-nav" aria-label={nav.menu}>{navigation}</nav>
      <nav className="desktop-locale" aria-label={locale === 'ar' ? 'اللغة' : 'Language'}>{languages}</nav>
      <button className="mobile-toggle" ref={toggle} type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? nav.closeMenu : nav.menu} onClick={() => setOpen(!open)}>
        <svg className="icon" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor"><path d={open ? 'M4 4l12 12M16 4L4 16' : 'M2 5h16M2 10h16M2 15h16'} /></svg>
        {nav.menu}
      </button>
    </header>
    <nav id="mobile-menu" className="mobile-menu container" aria-label={nav.menu} hidden={!open}>
      {navigation}<div className="mobile-locale">{languages}</div>
    </nav>
  </>;
}
