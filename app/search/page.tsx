import type { Metadata } from 'next';
import { constructMetadata, BASE_URL, SITE_NAME } from '@/app/src/lib/seo';
import SearchFeature from '@/app/src/features/search';

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim() || '';

  const title = query
    ? `Hasil Pencarian: "${query}"`
    : 'Pencarian Berita Sepak Bola';
  const description = query
    ? `Temukan berita terkini, hasil pertandingan, dan analisis sepak bola untuk pencarian "${query}" di ${SITE_NAME}.`
    : `Cari artikel, analisis taktik, profil timnas, dan berita sepak bola terlengkap di ${SITE_NAME}.`;

  return constructMetadata({
    title,
    description,
    slug: query ? `search?q=${encodeURIComponent(query)}` : 'search',
    noIndex: true, // Best practice SEO: noindex untuk halaman internal search results
  });
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() || '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    name: query ? `Hasil Pencarian untuk ${query}` : 'Pencarian Berita',
    url: query ? `${BASE_URL}/search?q=${encodeURIComponent(query)}` : `${BASE_URL}/search`,
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
          name: 'Pencarian',
          item: `${BASE_URL}/search`,
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
      <SearchFeature query={query} />
    </>
  );
}

