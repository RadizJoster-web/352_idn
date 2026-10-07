import type { Metadata } from 'next';
import { constructMetadata, BASE_URL, SITE_NAME } from '@/app/src/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Syarat & Ketentuan Layanan',
  description: `Syarat dan ketentuan penggunaan platform media berita sepak bola ${SITE_NAME}.`,
  slug: 'terms-of-service',
  ogType: 'website',
});

export default function TermsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Syarat & Ketentuan Layanan - ${SITE_NAME}`,
    description: `Syarat dan ketentuan penggunaan platform media berita sepak bola ${SITE_NAME}.`,
    url: `${BASE_URL}/terms-of-service`,
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
          name: 'Terms of Service',
          item: `${BASE_URL}/terms-of-service`,
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
        Terms of Service
      </h1>
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <h2 className="text-xl font-semibold text-text">Penggunaan Website</h2>
        <p>
          Dengan mengakses 352_IDN, Anda menyetujui untuk mematuhi syarat dan
          ketentuan berikut.
        </p>
        <h2 className="text-xl font-semibold text-text mt-8">Hak Konten</h2>
        <p>
          Seluruh konten yang dipublikasikan di 352_IDN dilindungi hak cipta.
          Dilarang menyalin, mendistribusikan, atau mereproduksi konten tanpa
          izin tertulis.
        </p>
        <h2 className="text-xl font-semibold text-text mt-8">
          Larangan Penggunaan
        </h2>
        <p>
          Dilarang menggunakan website ini untuk tujuan ilegal, menyebarkan
          konten berbahaya, atau mengganggu operasional website.
        </p>
        <h2 className="text-xl font-semibold text-text mt-8">
          Ketentuan Layanan
        </h2>
        <p>
          352_IDN berhak mengubah syarat dan ketentuan ini sewaktu-waktu.
          Perubahan akan dipublikasikan pada halaman ini.
        </p>
      </div>
    </div>
  </>
);
}

