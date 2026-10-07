import ArticleDetailPage from '@/app/src/pages/ArticleDetailPage';

export default function Page({ params }: { params: { slug: string } }) {
  return <ArticleDetailPage params={Promise.resolve(params)} />;
}
