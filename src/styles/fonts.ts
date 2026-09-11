import localFont from 'next/font/local';

export const inter = localFont({
  src: '../generated/design-v1/fonts/Inter-Variable.woff2',
  variable: '--font-inter', weight: '100 900', display: 'swap', preload: false,
});

export const arabic = localFont({
  src: [
    { path: '../generated/design-v1/fonts/IBMPlexSansArabic-Regular.woff2', weight: '400' },
    { path: '../generated/design-v1/fonts/IBMPlexSansArabic-Medium.woff2', weight: '500' },
    { path: '../generated/design-v1/fonts/IBMPlexSansArabic-SemiBold.woff2', weight: '600' },
    { path: '../generated/design-v1/fonts/IBMPlexSansArabic-Bold.woff2', weight: '700' },
  ],
  variable: '--font-arabic', display: 'swap', preload: false,
});
