'use client';

import { useEffect } from 'react';
import { constructMetadata } from '@/app/src/lib/seo';
import LatestFeature from '@/app/src/features/latest';

export default function LatestArticlesPage() {
  useEffect(() => {
    constructMetadata({
      title: 'Artikel Terbaru',
      description: `Berita terbaru dan terkini di 352.IDN`,
      slug: `artikel-terbaru`,
    });
  }, []);

  return <LatestFeature />;
}
