import type { Metadata } from 'next';
import LatestArticles from '@/app/src/pages/LatestArticlePage';
import { constructMetadata, BASE_URL, SITE_NAME } from '@/app/src/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Berita Sepak Bola Terbaru & Terkini Hari Ini',
  description: `Update berita sepak bola terbaru hari ini. Berita Timnas Indonesia, hasil pertandingan terkini, transfer pemain, dan analisis taktis di ${SITE_NAME}.`,
  slug: 'artikel-terbaru',
  ogType: 'website',
});

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Berita Sepak Bola Terbaru Hari Ini',
    url: `${BASE_URL}/artikel-terbaru`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: BASE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Artikel Terbaru',
          item: `${BASE_URL}/artikel-terbaru`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LatestArticles />
    </>
  );
}

