import { notFound } from 'next/navigation';
import { fetchCategoryBySlug } from '@/app/src/queries/categoryQueries';
import CategoryFeature from '@/app/src/features/category';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await fetchCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return <CategoryFeature slug={slug} category={category} />;
}
