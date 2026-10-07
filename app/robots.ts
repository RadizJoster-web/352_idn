import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/app/src/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/', '/search'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/studio/', '/search'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
