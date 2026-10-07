// src/lib/seo.ts
import type { Metadata } from 'next';
import { SITE_NAME } from './constants';

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
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://352.idn';
const DEFAULT_DESCRIPTION =
  '352.IDN - Portal berita sepak bola terpercaya. Berita terkini, dan analisis mendalam.';
const DEFAULT_IMAGE = `${BASE_URL}/default-og.jpg`;

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
}: SEOOptions = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = slug
    ? `${BASE_URL}/${slug.replace(/^\//, '')}`
    : BASE_URL;
  const finalImage = ogImage || DEFAULT_IMAGE;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: ogType,
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(ogType === 'article' && {
        publishedTime: publishedAt,
        modifiedTime: modifiedAt,
        authors: author ? [author] : undefined,
        section,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [finalImage],
    },
  };
}
