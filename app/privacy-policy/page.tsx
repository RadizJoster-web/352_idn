import type { Metadata } from 'next';
import { constructMetadata, BASE_URL, SITE_NAME } from '@/app/src/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Kebijakan Privasi',
  description: `Kebijakan privasi, penggunaan cookie, dan perlindungan data pengguna di portal berita olahraga ${SITE_NAME}.`,
  slug: 'privacy-policy',
  ogType: 'website',
});

export default function PrivacyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Kebijakan Privasi - ${SITE_NAME}`,
    description: `Kebijakan privasi, penggunaan cookie, dan perlindungan data pengguna di portal berita olahraga ${SITE_NAME}.`,
    url: `${BASE_URL}/privacy-policy`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: BASE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Privacy Policy',
          item: `${BASE_URL}/privacy-policy`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[760px] px-4 py-12">

      <h1 className="text-3xl font-semibold text-text mb-6 font-serif">
        Privacy Policy
      </h1>
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <h2 className="text-xl font-semibold text-text">
          Data yang Dikumpulkan
        </h2>
        <p>
          Kami mengumpulkan data penggunaan anonim untuk meningkatkan pengalaman
          pengguna, termasuk halaman yang dikunjungi dan durasi kunjungan.
        </p>
        <h2 className="text-xl font-semibold text-text mt-8">Cookie</h2>
        <p>
          Website ini menggunakan cookie untuk analitik dan preferensi pengguna.
          Anda dapat mengatur penggunaan cookie melalui pengaturan browser.
        </p>
        <h2 className="text-xl font-semibold text-text mt-8">Analytics</h2>
        <p>
          Kami menggunakan layanan analitik pihak ketiga untuk memahami
          bagaimana website digunakan.
        </p>
        <h2 className="text-xl font-semibold text-text mt-8">Hak Pengguna</h2>
        <p>
          Anda berhak meminta penghapusan data pribadi yang kami simpan. Silakan
          hubungi kami melalui halaman Kontak.
        </p>
      </div>
    </div>
  </>
);
}


