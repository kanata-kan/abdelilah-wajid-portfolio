/** @type {import('next').NextConfig} */
const config = {
  trailingSlash: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
};

export default config;
