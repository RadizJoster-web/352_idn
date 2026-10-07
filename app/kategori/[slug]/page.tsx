import CategoryPage from '@/app/src/pages/CategoryPage';

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <CategoryPage params={params} />;
}
