'use client';

import { useState } from 'react';
import { useArticlesByAuthor } from '../../hooks/useArticlesByAuthor';
import type { Author } from '../../types/author';

import Header from './Header';
import ArticleAuthor from './ArticleAuthor';

type AuthorProfileProps = {
  slug: string;
  author: Author;
};

export default function AuthorProfile({ slug, author }: AuthorProfileProps) {
  // 1. Fetching Data
  const {
    articles = [],
    isLoading: isArticlesLoading,
    error: articlesError,
    setStart,
  } = useArticlesByAuthor(slug);

  // 2. State Management (Pagination)
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  // Counting how many author wrote article
  const totalPosts = articles.length;
  const totalPages = Math.ceil(totalPosts / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setStart((newPage - 1) * ITEMS_PER_PAGE);

      // Smooth scroll ke ID yang ada di ArticleAuthor.tsx
      const articleSection = document.getElementById('articles-section');
      if (articleSection) {
        articleSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // 3. Layout Management: Main UI Rendering
  return (
    <main className="mx-auto min-h-screen max-w-[var(--container-max)] px-4 py-8 sm:py-12">
      <Header author={author} totalPosts={totalPosts} />

      <ArticleAuthor
        articles={articles}
        isLoading={isArticlesLoading}
        error={articlesError}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
