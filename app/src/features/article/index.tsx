import type { ArticleDetail, ArticleListItem } from '@/app/src/types/article';
import { urlFor } from '@/app/src/service/sanity/image';
import NewsArticleSchema from '@/app/src/components/NewsArticleSchema';
import SanityImage from '@/app/src/components/media/SanityImage';
import ArticleHeader from './ArticleHeader';
import ArticleBody from './ArticleBody';
import RelatedArticles from '@/app/src/components/article/RelatedArticles';
import { Sidebar } from '@/app/src/components/Sidebar';
import { AdUnit } from '@/app/src/components/AdsUnit';

interface ArticleFeatureProps {
  article: ArticleDetail;
  related: ArticleListItem[];
}

export default function ArticleFeature({
  article,
  related,
}: ArticleFeatureProps) {
  const mainImageAlt =
    (article.mainImage as { alt?: string } | undefined)?.alt || article.title;

  const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/artikel/${article.slug}`;

  return (
    <>
      {/* Structured Data JSON-LD untuk Google Bot */}
      <NewsArticleSchema
        headline={article.title}
        image={[urlFor(article.mainImage).width(1200).url()]}
        datePublished={article.publishedAt}
        author={{ name: article.author.name }}
        url={articleUrl}
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
