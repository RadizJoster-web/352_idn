// src/lib/seo.ts
import type { Metadata } from 'next';
import { SITE_NAME } from './constants';

export { SITE_NAME };

export type SEOOptions = {
  title?: string;
  description?: string;
  slug?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedAt?: string;
  modifiedAt?: string;
  author?: string;
  section?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.startsWith('http')
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
    : `https://${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')}`
  : 'https://352_IDN';

export const DEFAULT_DESCRIPTION =
  'Baca berita sepak bola terbaru hari ini di 352_IDN. Sajian berita Timnas Indonesia, Liga 1, Premier League, Liga Champions, hingga ulasan taktik mendalam.';

// 1. PASTIKAN DEFAULT_OG_IMAGE MENGGUNAKAN ABSOLUTE URL
export const DEFAULT_OG_IMAGE = `${BASE_URL}/icon.png`;

export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  slug = '',
  ogImage,
  ogType = 'website',
  publishedAt,
  modifiedAt,
  author,
  section,
  keywords,
  noIndex = false,
}: SEOOptions = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} - Portal Berita Sepak Bola Terupdate`;

  const cleanSlug = slug ? slug.replace(/^\/+/, '') : '';
  const canonicalUrl = cleanSlug
    ? cleanSlug.startsWith('http')
      ? cleanSlug
      : `${BASE_URL}/${cleanSlug}`
    : BASE_URL;

  // 2. LOGIKA FALLBACK UNTUK SELALU MEMASTIKAN ABSOLUTE URL
  let finalImage = ogImage || DEFAULT_OG_IMAGE;
  if (finalImage.startsWith('/')) {
    finalImage = `${BASE_URL}${finalImage}`;
  }

  return {
    metadataBase: new URL(BASE_URL),
    title: fullTitle,
    description,
    keywords: keywords && keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'id_ID',
      type: ogType,
      images: [
        {
          url: finalImage, // Selalu berupa https://domain.com/...
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
        },
      ],
      ...(ogType === 'article' && {
        publishedTime: publishedAt,
        modifiedTime: modifiedAt || publishedAt,
        authors: author ? [author] : undefined,
        section,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [finalImage],
      site: '@352idn',
      creator: author ? `@${author.replace(/\s+/g, '')}` : '@352idn',
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
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
}
