import type { MetadataRoute } from 'next';

// Private foundation policy only. robots.txt is not access control.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', disallow: '/' } };
}
