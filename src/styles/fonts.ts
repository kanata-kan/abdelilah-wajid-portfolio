import localFont from 'next/font/local';

export const inter = localFont({
  src: '../../docs/design/v1.0/05-implementation/fonts/Inter-Variable.woff2',
  variable: '--font-inter', weight: '100 900', display: 'swap', preload: false,
});

export const arabic = localFont({
  src: [
    { path: '../../docs/design/v1.0/05-implementation/fonts/IBMPlexSansArabic-Regular.woff2', weight: '400' },
    { path: '../../docs/design/v1.0/05-implementation/fonts/IBMPlexSansArabic-Medium.woff2', weight: '500' },
    { path: '../../docs/design/v1.0/05-implementation/fonts/IBMPlexSansArabic-SemiBold.woff2', weight: '600' },
    { path: '../../docs/design/v1.0/05-implementation/fonts/IBMPlexSansArabic-Bold.woff2', weight: '700' },
  ],
  variable: '--font-arabic', display: 'swap', preload: false,
});
