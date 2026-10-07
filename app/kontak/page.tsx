import type { Metadata } from 'next';
import { constructMetadata, BASE_URL, SITE_NAME } from '@/app/src/lib/seo';
import { IoIosMail, IoIosCall } from 'react-icons/io';

export const metadata: Metadata = constructMetadata({
  title: 'Kontak Kami',
  description: `Hubungi tim redaksi dan bisnis ${SITE_NAME} untuk kerja sama media, pemasangan iklan, informasi pers, dan hak jawab.`,
  slug: 'kontak',
  ogType: 'website',
});

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Kontak Kami - ${SITE_NAME}`,
    description: `Hubungi tim redaksi dan bisnis ${SITE_NAME} untuk kerja sama media, pemasangan iklan, informasi pers, dan hak jawab.`,
    url: `${BASE_URL}/kontak`,
    mainEntity: {
      '@type': 'NewsMediaOrganization',
      name: SITE_NAME,
      url: BASE_URL,
      email: '352idn@gmail.com',
      telephone: '+62 856-9248-1496',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+62 856-9248-1496',
          contactType: 'customer service',
          email: '352idn@gmail.com',
          availableLanguage: ['Indonesian', 'English'],
        },
      ],
    },
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
          name: 'Kontak',
          item: `${BASE_URL}/kontak`,
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
      <div className="mx-auto max-w-190 px-4 py-12">

        <h1 className="text-3xl font-semibold text-text mb-2 font-serif">
          Kontak Kami
        </h1>
        <p className="text-text-secondary mb-8">
          Hubungi kami melalui kanal resmi di bawah ini untuk pertanyaan umum,
          redaksi, maupun informasi kerja sama bisnis.
        </p>

        {/* Grid Kontak */}
        <div className="grid gap-4 sm:grid-cols-2 mb-8">
          {/* Email Umum */}
          <div className="flex items-start gap-4 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary">
            <div className="rounded-md bg-primary-soft p-2.5 text-primary shrink-0">
              <IoIosMail className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-text-muted">
                Email Umum
              </h2>
              <span className="text-base font-medium text-text hover:text-primary transition-colors block mt-0.5">
                352idn@gmail.com
              </span>
            </div>
          </div>

          {/* Kontak Bisnis */}
          <div className="flex items-start gap-4 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary">
            <div className="rounded-md bg-primary-soft p-2.5 text-primary shrink-0">
              <IoIosCall className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-text-muted">
                Kontak Bisnis
              </h2>
              <span className="text-base font-medium text-text hover:text-primary transition-colors block mt-0.5">
                +62 856-9248-1496
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
