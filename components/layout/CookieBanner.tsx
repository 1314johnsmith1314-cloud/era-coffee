'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'era-cookie-consent';

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
      className="fixed inset-x-0 bottom-0 z-[70] p-4 sm:p-6 pointer-events-none"
    >
      <div className="container-default pointer-events-auto">
        <div className="rounded-card bg-white shadow-2xl border border-black/5 p-5 sm:p-6 flex flex-col sm:flex-row items-start gap-4">
          <div className="flex-1">
            <h2
              id="cookie-title"
              className="text-sm font-bold text-era-dark uppercase tracking-wider"
            >
              Файлы cookies
            </h2>
            <p
              id="cookie-description"
              className="mt-1.5 text-sm text-era-dark/75 leading-relaxed"
            >
              Мы используем файлы cookies для работы сайта, сбора обезличенной
              статистики посещаемости и улучшения сервиса в соответствии с{' '}
              <a
                href="/privacy"
                className="text-era-blue underline underline-offset-2"
              >
                Политикой обработки ПД
              </a>{' '}
              (152-ФЗ) и{' '}
              <a
                href="/cookies"
                className="text-era-blue underline underline-offset-2"
              >
                Политикой использования cookies
              </a>
              . Продолжая использовать сайт, вы соглашаетесь с обработкой cookies.
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto shrink-0 sm:self-center">
            <button
              onClick={decline}
              className="btn-secondary py-2.5 px-4 text-sm flex-1 sm:flex-none"
            >
              Только необходимые
            </button>
            <button
              onClick={accept}
              className="btn-primary py-2.5 px-4 text-sm flex-1 sm:flex-none"
            >
              Принять все
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
