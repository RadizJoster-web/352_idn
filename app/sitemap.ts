import type { MetadataRoute } from 'next';
import { sanityFetch } from '@/app/src/service/sanity/fetcher';
import { BASE_URL } from '@/app/src/lib/seo';

type SlugItem = {
  slug: string;
  publishedAt?: string;
  _updatedAt?: string;
};

// Revalidasi sitemap secara berkala (setiap 1 jam)
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // 1. Halaman Statis Utama & Informasi Portal
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/artikel-terbaru`,
      lastModified: currentDate,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tentang-kami`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/redaksi`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/kontak`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/pedoman-media-siber`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 2. Halaman Dinamis dari Sanity CMS (Artikel, Kategori, Penulis)
  try {
    const [articles, categories, authors] = await Promise.all([
      sanityFetch<SlugItem[]>(
        `*[_type == "article" && defined(slug.current)] | order(publishedAt desc) {
          "slug": slug.current,
          publishedAt,
          _updatedAt
        }`,
        {},
        ['sitemap-articles'],
      ),
      sanityFetch<SlugItem[]>(
        `*[_type == "category" && defined(slug.current)] {
          "slug": slug.current,
          _updatedAt
        }`,
        {},
        ['sitemap-categories'],
      ),
      sanityFetch<SlugItem[]>(
        `*[_type == "author" && defined(slug.current)] {
          "slug": slug.current,
          _updatedAt
        }`,
        {},
        ['sitemap-authors'],
      ),
    ]);

    const articleRoutes: MetadataRoute.Sitemap = (articles || []).map(
      (article) => ({
        url: `${BASE_URL}/artikel/${article.slug}`,
        lastModified: article.publishedAt || article._updatedAt || currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      }),
    );

    const categoryRoutes: MetadataRoute.Sitemap = (categories || []).map(
      (category) => ({
        url: `${BASE_URL}/kategori/${category.slug}`,
        lastModified: category._updatedAt || currentDate,
        changeFrequency: 'daily',
        priority: 0.7,
      }),
    );

    const authorRoutes: MetadataRoute.Sitemap = (authors || []).map(
      (author) => ({
        url: `${BASE_URL}/penulis/${author.slug}`,
        lastModified: author._updatedAt || currentDate,
        changeFrequency: 'weekly',
        priority: 0.6,
      }),
    );

    return [
      ...staticRoutes,
      ...categoryRoutes,
      ...articleRoutes,
      ...authorRoutes,
    ];
  } catch (error) {
    console.error(
      '[Sitemap Error] Gagal mengambil data dinamis dari Sanity:',
      error,
    );
    return staticRoutes;
  }
}
