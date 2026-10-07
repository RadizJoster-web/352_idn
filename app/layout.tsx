import type { Metadata } from 'next';
import './globals.css';

import { Header } from '@/app/src/layout/Header';
import { Footer } from '@/app/src/layout/Footer';
import Providers from '@/app/src/providers';
import {
  BASE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
} from '@/app/src/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  generator: 'Next.js',
  keywords: [
    'berita sepak bola',
    'sepak bola indonesia',
    'timnas indonesia',
    'liga 1',
    'premier league',
    'liga champions',
    'skor bola',
    'hasil pertandingan',
    '352_IDN',
  ],
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    siteName: SITE_NAME,
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE, // Sekarang berisi: https://352_IDN/icon.png
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Portal Berita Sepak Bola`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
    site: '@352idn',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'NewsMediaOrganization',
      '@id': `${BASE_URL}/#organization`,
      name: SITE_NAME,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        '@id': `${BASE_URL}/#logo`,
        url: `${BASE_URL}/icon.png`,
        caption: SITE_NAME,
      },
      sameAs: [
        'https://twitter.com/352idn',
        'https://www.instagram.com/352idn',
        'https://www.facebook.com/352idn',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: SITE_NAME,
      alternateName: ['352_IDN', '352 IDN', '352IDN', '352idn', '352.idn'],
      description: DEFAULT_DESCRIPTION,
      publisher: {
        '@id': `${BASE_URL}/#organization`,
      },
      inLanguage: 'id-ID',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="h-full">
        <Providers>
          <div className="min-h-screen flex flex-col bg-background text-text transition-colors duration-200">
            <Header />

            <main className="grow">{children}</main>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
