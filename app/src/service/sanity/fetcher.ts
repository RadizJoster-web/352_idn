import { sanityClient } from './client';

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>,
  tags: string[] = ['global'],
): Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return sanityClient.fetch<T>(query, params as any, {
    // Matikan useCdn Sanity agar tidak terjadi double-caching yang membingungkan
    useCdn: false,
    // Integrasikan ke dalam Next.js Data Cache & Edge CDN
    next: { tags: tags }, // Memungkinkan On-Demand Revalidation via Webhook
  });
}
