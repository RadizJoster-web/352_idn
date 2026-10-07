import type { Metadata } from 'next';
import CategoryPage from '@/app/src/pages/CategoryPage';
import { fetchCategoryBySlug } from '@/app/src/queries/categoryQueries';
import { constructMetadata, BASE_URL, SITE_NAME } from '@/app/src/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await fetchCategoryBySlug(slug);

  if (!category) {
    return constructMetadata({
      title: 'Kategori Tidak Ditemukan',
      description: 'Kategori berita yang Anda cari tidak ditemukan.',
      slug: `kategori/${slug}`,
      noIndex: true,
    });
  }

  const title = `Berita ${category.title} Terkini & Analisis`;
  const description =
    category.description ||
    `Kumpulan berita, analisis taktik, klasemen, dan kabar terbaru seputar ${category.title} di ${SITE_NAME}.`;

  return constructMetadata({
    title,
    description,
    slug: `kategori/${category.slug || slug}`,
    ogType: 'website',
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const category = await fetchCategoryBySlug(slug);

  const categoryUrl = `${BASE_URL}/kategori/${category?.slug || slug}`;
  const categoryTitle = category?.title || slug;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Berita ${categoryTitle}`,
    description:
      category?.description ||
      `Kumpulan berita sepak bola terkini untuk kategori ${categoryTitle}.`,
    url: categoryUrl,
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
          name: 'Kategori',
          item: `${BASE_URL}/kategori`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: categoryTitle,
          item: categoryUrl,
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
      <CategoryPage params={params} />
    </>
  );
}

