'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SearchBar from '../components/navigation/SearchBar';
import { fetchCategories } from '../queries/categoryQueries';
import type { Category } from '../types/category';

type MainNavigationProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

export function MainNavigation({
  mobileOpen = false,
  onClose = () => {},
}: MainNavigationProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  const navItems = [
    { label: 'Beranda', href: '/' },
    ...categories.map((cat) => ({
      label: cat.title,
      href: `/kategori/${cat.slug}`,
    })),
  ];

  return (
    <>
      {/* Desktop */}
      <nav
        className="hidden border-t border-border md:block"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-[var(--container-max)] items-center gap-1 px-4">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                    : 'text-text-secondary hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile */}
      {mobileOpen && (
        <nav
          className="absolute top-15 left-0 w-full h-screen border-t border-border bg-background md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="px-4 py-3">
            <SearchBar onSubmit={onClose} className="mb-3" />
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`block border-b border-border px-2 py-3 text-sm font-semibold ${
                    isActive ? 'text-primary' : 'text-text-secondary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}
