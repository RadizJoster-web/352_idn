import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchAuthorBySlug } from '@/app/src/queries/authorQueries';
import AuthorProfile from '@/app/src/features/Author';
import { constructMetadata, BASE_URL, SITE_NAME } from '@/app/src/lib/seo';
import { urlFor } from '@/app/src/service/sanity/image';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = await fetchAuthorBySlug(slug);

  if (!author) {
    return constructMetadata({
      title: 'Penulis Tidak Ditemukan',
      description: 'Halaman profil penulis yang Anda cari tidak ditemukan.',
      slug: `penulis/${slug}`,
      noIndex: true,
    });
  }

  const authorImageUrl = author.avatar
    ? urlFor(author.avatar).width(1200).height(630).fit('crop').url()
    : undefined;

  return constructMetadata({
    title: `Profil ${author.name} - Jurnalis Sepak Bola`,
    description:
      author.bio ||
      `Kumpulan artikel, analisis mendalam, dan laporan terkini oleh jurnalis ${author.name} di ${SITE_NAME}.`,
    slug: `penulis/${author.slug || slug}`,
    ogType: 'website',
    ogImage: authorImageUrl,
  });
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = await fetchAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const authorUrl = `${BASE_URL}/penulis/${author.slug || slug}`;
  const authorImageUrl = author.avatar
    ? urlFor(author.avatar).width(800).height(800).fit('crop').url()
    : undefined;

  const socialLinks =
    author.socialLinks?.map((s) => s.url).filter(Boolean) || [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: author.name,
      description: author.bio,
      image: authorImageUrl,
      jobTitle: author.role || 'Jurnalis Sepak Bola',
      worksFor: {
        '@type': 'NewsMediaOrganization',
        name: SITE_NAME,
        url: BASE_URL,
      },
      url: authorUrl,
      sameAs: socialLinks,
    },
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
          name: 'Penulis',
          item: `${BASE_URL}/penulis`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: author.name,
          item: authorUrl,
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
      <AuthorProfile slug={slug} author={author} />
    </>
  );
}

