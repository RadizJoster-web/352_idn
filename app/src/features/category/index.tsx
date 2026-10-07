'use client';

import type { Category } from '../../types/category';
import { useInfiniteArticles } from '../../hooks/useInfiniteArticles';
import PageCategorySkeleton from '../../components/common/skeleton/pages/PageCategorySkeleton';
import EmptyState from '../../components/common/EmptyState';
import CategoryHeader from './CategoryHeader';
import ArticleListItemComponent from '../../components/article/ArticleListItem';
import { Sidebar } from '../../components/Sidebar';
import { AdUnit } from '../../components/AdsUnit';

type CategoryFeatureProps = {
  slug: string;
  category: Category;
};

export default function CategoryFeature({
  slug,
  category,
}: CategoryFeatureProps) {
  const { articles, loading, lastElementRef } = useInfiniteArticles(10, slug);

  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
      <CategoryHeader category={category} />

      {loading && <PageCategorySkeleton />}

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        {/* Left Column (Article List) */}
        <div className="min-w-0 max-w-full lg:max-w-[760px] xl:max-w-[800px] mx-auto lg:mx-0">
          {articles.length > 0 ? (
            <div className="divide-y divide-border">
              {articles.map((article, index) => {
                const isAdPosition = index === 4;
                const isSecondToLast = index === articles.length - 2;

                return (
                  <div key={article._id}>
                    {/* Ads Display List — di index ke-4 */}
                    {isAdPosition && (
                      <div className="py-4">
                        <AdUnit
                          adSlot="6840264105"
                          adFormat="fluid"
                          adLayoutKey="-ez+5q+5e-d4+4m"
                        />
                      </div>
                    )}
                    <div ref={isSecondToLast ? lastElementRef : null}>
                      <ArticleListItemComponent article={article} />
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="py-4 text-center text-sm text-text-muted">
                  Memuat berita...
                </div>
              )}
            </div>
          ) : (
            !loading && <EmptyState />
          )}
        </div>

        {/* Right Sidebar — menggunakan Sidebar reusable */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
