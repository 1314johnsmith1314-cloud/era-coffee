'use client';

import { useEffect, useState } from 'react';
import { Logo } from '@/components/icons/Logo';
import { MenuIcon, CloseIcon } from '@/components/icons/SocialIcons';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          isScrolled
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none',
        )}
      >
        <div className="border-b border-black/5 bg-era-page/90 backdrop-blur-xl backdrop-saturate-150">
          <div className="container-default flex h-[60px] md:h-[72px] items-center justify-between">
            <a href="#top" className="shrink-0" aria-label="ERA Coffee — на главную">
              <Logo />
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-era-dark transition-colors hover:text-era-blue"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a href="#pdf-magnet" className="hidden sm:inline-flex btn-primary px-5 py-2.5 text-sm">
                Получить прайс
              </a>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-btn text-era-dark hover:bg-era-cream"
                aria-label="Открыть меню"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-era-dark/60"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-2xl">
            <div className="flex items-center justify-between px-5 h-[60px] border-b border-black/5">
              <Logo />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center w-11 h-11 rounded-btn text-era-dark hover:bg-era-cream"
                aria-label="Закрыть меню"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col px-5 py-6 gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3 text-lg font-semibold text-era-dark border-b border-black/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#pdf-magnet"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary mt-6 w-full"
              >
                Получить прайс
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
