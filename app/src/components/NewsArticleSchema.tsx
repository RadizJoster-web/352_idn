import { SITE_NAME } from '@/app/src/lib/constants';

type AuthorSchema = {
  name: string;
  url?: string;
};

type NewsArticleSchemaProps = {
  headline: string;
  description?: string;
  image: string[];
  datePublished: string;
  dateModified?: string;
  author: AuthorSchema | AuthorSchema[];
  url: string;
  section?: string;
  isMatchReport?: boolean;
  matchDetails?: {
    homeTeam: string;
    awayTeam: string;
    startDate: string;
    location: string;
  };
};

export default function NewsArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url,
  section,
  isMatchReport = false,
  matchDetails,
}: NewsArticleSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://352.idn';
  const siteUrl = baseUrl.startsWith('http') ? baseUrl.replace(/\/$/, '') : `https://${baseUrl.replace(/\/$/, '')}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    articleSection: section,
    inLanguage: 'id-ID',
    author: Array.isArray(author)
      ? author.map((a) => ({
          '@type': 'Person',
          name: a.name,
          url: a.url,
        }))
      : {
          '@type': 'Person',
          name: author.name,
          url: author.url,
        },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: SITE_NAME,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  };

  const schemas: object[] = [jsonLd];

  if (isMatchReport && matchDetails) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'SportsEvent',
      name: `${matchDetails.homeTeam} vs ${matchDetails.awayTeam}`,
      startDate: matchDetails.startDate,
      location: {
        '@type': 'Place',
        name: matchDetails.location,
      },
      homeTeam: {
        '@type': 'SportsTeam',
        name: matchDetails.homeTeam,
      },
      awayTeam: {
        '@type': 'SportsTeam',
        name: matchDetails.awayTeam,
      },
      url,
    });
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

