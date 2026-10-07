import { SITE_NAME } from '@/app/src/lib/constants';

type AuthorSchema = {
  name: string;
};

type NewsArticleSchemaProps = {
  headline: string;
  image: string[];
  datePublished: string;
  dateModified?: string;
  author: AuthorSchema | AuthorSchema[];
  url: string;
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
  image,
  datePublished,
  dateModified,
  author,
  url,
  isMatchReport = false,
  matchDetails,
}: NewsArticleSchemaProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: Array.isArray(author)
      ? author.map((a) => ({ '@type': 'Person', name: a.name }))
      : { '@type': 'Person', name: author.name },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://352.idn'}/logo.png`,
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
