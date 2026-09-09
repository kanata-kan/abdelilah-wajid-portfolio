import test from 'node:test';
import assert from 'node:assert/strict';
import { isLocale, localePath, direction, routes } from '../src/lib/i18n/locales.ts';
import { pageMetadata, siteOrigin, personSchema, serializeSchema } from '../src/lib/seo/metadata.ts';

test('route registry rejects unknown locales and contains only the private implemented pair', () => {
  for (const value of ['fr', 'EN', 'ar-MA', '', '../en', '__proto__']) assert.equal(isLocale(value), false);
  assert.equal(isLocale('en'), true);
  assert.equal(isLocale('ar'), true);
  assert.equal(direction('ar'), 'rtl');
  assert.equal(direction('en'), 'ltr');
  assert.deepEqual(routes.map((route) => route.path), ['/en/', '/ar/']);
  assert.ok(routes.every((route) => !route.released));
});

test('no origin means no invented canonical, alternate or share destination', () => {
  const metadata = pageMetadata('ar', { title: 'عنوان', description: 'وصف' });
  assert.equal(metadata.title, 'عنوان');
  assert.equal(metadata.alternates, undefined);
  assert.equal(metadata.openGraph, undefined);
  assert.deepEqual(metadata.robots, { index: false, follow: false });
});

test('configured origin produces self canonicals and reciprocal actual locale URLs, never x-default', () => {
  for (const locale of ['en', 'ar'] as const) {
    const metadata = pageMetadata(locale, { title: 'Title', description: 'Description' }, 'https://portfolio.example/');
    assert.equal(metadata.alternates?.canonical, `https://portfolio.example${localePath(locale)}`);
    assert.deepEqual(metadata.alternates?.languages, { en: 'https://portfolio.example/en/', ar: 'https://portfolio.example/ar/' });
    assert.deepEqual(metadata.robots, { index: false, follow: false });
  }
});

test('origin validation rejects unsafe and non-origin configuration', () => {
  for (const value of ['http://example.com', 'https://user:pass@example.com', 'https://example.com/path', 'https://example.com/?q=1', 'https://example.com/#hash', 'not a url']) {
    assert.throws(() => siteOrigin(value));
  }
  assert.equal(siteOrigin(''), undefined);
  assert.equal(siteOrigin('https://EXAMPLE.com/'), 'https://example.com');
});

test('Person contains visible identity only and serialization cannot close a script element', () => {
  assert.deepEqual(personSchema({ name: 'Name', role: 'Role' }), { '@context': 'https://schema.org', '@type': 'Person', name: 'Name', jobTitle: 'Role' });
  const serialized = serializeSchema({ name: '</script><script>alert(1)</script>' });
  assert.equal(serialized.includes('<'), false);
  assert.equal(JSON.parse(serialized).name, '</script><script>alert(1)</script>');
});
