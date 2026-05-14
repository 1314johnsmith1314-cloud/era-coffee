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
    <div className="fixed inset-x-0 bottom-0 z-[70] p-4 sm:p-6 pointer-events-none">
      <div className="container-default pointer-events-auto">
        <div className="rounded-card bg-white shadow-2xl border border-black/5 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="flex-1 text-sm text-era-dark leading-relaxed">
            Мы используем cookie-файлы для улучшения работы сайта. Продолжая использовать
            сайт, вы соглашаетесь с обработкой персональных данных.{' '}
            <a href="/privacy" className="text-era-blue underline underline-offset-2">
              Подробнее
            </a>
          </p>
          <div className="flex gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={decline}
              className="btn-secondary py-2.5 px-4 text-sm flex-1 sm:flex-none"
            >
              Отклонить
            </button>
            <button
              onClick={accept}
              className="btn-primary py-2.5 px-4 text-sm flex-1 sm:flex-none"
            >
              Принять
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
