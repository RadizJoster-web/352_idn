import type { Category } from '../types/category';
import { sanityFetch } from '@/app/src/service/sanity/fetcher';

export function fetchCategories() {
  return sanityFetch<Category[]>(
    `*[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description
    }`,
    {},
    ['categories'],
  );
}

export function fetchCategoryBySlug(slug: string) {
  return sanityFetch<Category | null>(
    `*[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description
    }`,
    { slug },
    [`category-detail:${slug}`],
  );
}
