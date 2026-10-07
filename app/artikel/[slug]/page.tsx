import type { Metadata } from 'next';
import ArticleDetailPage from '@/app/src/pages/ArticleDetailPage';
import { fetchArticleBySlug } from '@/app/src/queries/articleQueries';
import { constructMetadata } from '@/app/src/lib/seo';
import { urlFor } from '@/app/src/service/sanity/image';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return constructMetadata({
      title: 'Artikel Tidak Ditemukan',
      description:
        'Halaman berita sepak bola yang Anda cari tidak ditemukan atau telah dipindahkan.',
      slug: `artikel/${slug}`,
      noIndex: true,
    });
  }

  const ogImageUrl = article.seoImage
    ? urlFor(article.seoImage).width(1200).height(630).fit('crop').url()
    : article.mainImage
    ? urlFor(article.mainImage).width(1200).height(630).fit('crop').url()
    : undefined;

  return constructMetadata({
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    slug: `artikel/${article.slug || slug}`,
    ogType: 'article',
    ogImage: ogImageUrl,
    publishedAt: article.publishedAt,
    author: article.author?.name,
    section: article.category?.title,
  });
}

export default function Page({ params }: Props) {
  return <ArticleDetailPage params={params} />;
}

