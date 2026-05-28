import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.brand} — свежеобжаренный кофе для бизнеса`,
    short_name: SITE.brand,
    description:
      'Отборный зерновой кофе для вашего бизнеса. Опт от 3 кг, бесплатный пробник.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FBF6EE',
    theme_color: '#1B3A8B',
    lang: 'ru',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
