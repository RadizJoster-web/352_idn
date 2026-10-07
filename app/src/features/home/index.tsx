import { useHomeArticles } from '../../hooks/useArticles';
import PageHomeSkeleton from '../../components/common/skeleton/pages/PageHomeSkeleton';
import ErrorState from '../../components/common/ErrorState';
import HeroHeadline from './HeroHeadline';
import HotArticles from './HotArticles';
import LatestNews from './LatestNews';
import { Sidebar } from '../../components/Sidebar';

export default function HomeFeature() {
  const { data, isLoading, error } = useHomeArticles();

  if (isLoading) return <PageHomeSkeleton />;
  if (error)
    return (
      <ErrorState
        message="Gagal memuat halaman beranda."
        onRetry={() => window.location.reload()}
      />
    );
  if (!data) return null;

  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4">
      <div className="grid gap-6 py-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col space-y-10 min-w-0">
          <div>
            {data.hero && <HeroHeadline article={data.hero} />}
            {data.hot && data.hot.length > 0 && (
              <HotArticles articles={data.hot} />
            )}
          </div>

          {/* Sidebar Mobile: Tampil di bawah Support headline */}
          <aside className="block lg:hidden">
            <Sidebar showTimnas={true} />
          </aside>

          <LatestNews />
        </div>

        {/* Sidebar Desktop */}
        <aside className="hidden lg:block">
          <Sidebar showTimnas={true} />
        </aside>
      </div>
    </div>
  );
}
