import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  fetchArticleBySlug,
  fetchRelatedArticles,
} from '@/app/src/queries/articleQueries';
import { urlFor } from '@/app/src/service/sanity/image';
import { constructMetadata } from '@/app/src/lib/seo';
import NewsArticleSchema from '@/app/src/components/NewsArticleSchema';
import SanityImage from '@/app/src/components/media/SanityImage';
import ArticleHeader from '@/app/src/features/article/ArticleHeader';
import ArticleBody from '@/app/src/features/article/ArticleBody';
import RelatedArticles from '@/app/src/components/article/RelatedArticles';
import { Sidebar } from '@/app/src/components/Sidebar';
import { AdUnit } from '@/app/src/components/AdsUnit';

type Props = {
  params: Promise<{ slug: string }>;
};

// -------------------------------------------------------------
// 1. GENERATE METADATA (Diterapkan di Server untuk SEO)
// -------------------------------------------------------------
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return constructMetadata({ title: 'Artikel Tidak Ditemukan' });
  }

  return constructMetadata({
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    slug: `artikel/${article.slug}`,
    ogType: 'article',
    ogImage: article.seoImage
      ? urlFor(article.seoImage).width(1200).url()
      : urlFor(article.mainImage).width(1200).url(),
    publishedAt: article.publishedAt,
    author: article.author?.name,
    section: article.category?.title,
  });
}

// -------------------------------------------------------------
// 2. PAGE COMPONENT (Server Component)
// -------------------------------------------------------------
export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = await fetchRelatedArticles(
    article.category.slug,
    article._id,
    4,
  );

  const mainImageAlt =
    (article.mainImage as { alt?: string } | undefined)?.alt || article.title;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://352.idn';

  return (
    <>
      {/* Schema JSON-LD untuk Google Bot */}
      <NewsArticleSchema
        headline={article.title}
        image={[urlFor(article.mainImage).width(1200).url()]}
        datePublished={article.publishedAt}
        author={{ name: article.author.name }}
        url={`${baseUrl}/artikel/${article.slug}`}
      />

      <article className="mx-auto max-w-[var(--container-max)] px-4 py-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          {/* Konten Utama */}
          <div className="min-w-0 max-w-full lg:max-w-[760px] xl:max-w-[800px] mx-auto lg:mx-0">
            <ArticleHeader article={article} />

            <div className="relative mb-8 overflow-hidden rounded-lg">
              <SanityImage
                source={article.mainImage}
                alt={article.title}
                preset="featured"
                priority={true}
                className="w-full object-cover"
              />

              <div className="p-4 bg-primary-soft">
                <p className="text-xs text-text-muted italic">{mainImageAlt}</p>
              </div>
            </div>

            <ArticleBody content={article.content} />

            {/* Ads Display */}
            <AdUnit
              adSlot="8209186098"
              adFormat="fluid"
              adLayout="in-article"
              style={{ display: 'block', textAlign: 'center' }}
            />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        </div>

        <RelatedArticles articles={related} />
      </article>
    </>
  );
}
