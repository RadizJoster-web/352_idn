import { notFound } from 'next/navigation';
import { fetchAuthorBySlug } from '@/app/src/queries/authorQueries';
import AuthorProfile from '@/app/src/features/Author';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = await fetchAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  return <AuthorProfile slug={slug} author={author} />;
}
