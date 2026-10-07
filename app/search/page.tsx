import { constructMetadata } from '@/app/src/lib/seo';
import SearchFeature from '@/app/src/features/search';

type props = {
  searchParams: Promise<{
    q: string;
  }>;
};

export default async function SearchPage({ searchParams }: props) {
  const { q: query } = await searchParams;

  if (!query) {
    return constructMetadata({ title: 'Pencarian' });
  }

  constructMetadata({
    title: query,
    description: `Hasil pencarian untuk: "${query}"`,
    slug: `pencarian?query=${query}`,
  });

  return <SearchFeature query={query} />;
}
