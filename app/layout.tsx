import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { SITE } from '@/lib/constants';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
});

export const viewport: Viewport = {
  themeColor: '#1B3A8B',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: 'ERA Coffee — Свежеобжаренный кофе для вашего бизнеса | Опт от 3 кг',
  description:
    'Поставляем зерновой кофе в кофейни, рестораны, отели и офисы. Прямые контракты с фермами Бразилии, Эфиопии, Колумбии. 12+ лет на рынке. Бесплатный пробник.',
  keywords:
    'кофе оптом, зерновой кофе для бизнеса, поставка кофе в рестораны, эспрессо для кофейни, свежеобжаренный кофе, ERA Coffee, Время Кофе',
  openGraph: {
    title: 'ERA Coffee — Начни свою эру вкуса',
    description:
      'Отборный зерновой кофе для вашего бизнеса. 12+ лет на рынке, прямые контракты с фермами, свежая обжарка под заказ.',
    url: SITE.url,
    siteName: SITE.brand,
    locale: 'ru_RU',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.webmanifest',
};

const YM_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.brand,
  legalName: SITE.legalName,
  url: SITE.url,
  slogan: SITE.slogan,
  foundingDate: String(SITE.yearFounded),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+7 967 066 39 79',
      contactType: 'sales',
      areaServed: 'RU',
      availableLanguage: ['Russian'],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="font-sans antialiased">
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </SmoothScrollProvider>

        <Script
          id="org-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />

        {YM_ID && (
          <>
            <Script id="yandex-metrika" strategy="afterInteractive">
              {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                ym(${YM_ID}, "init", {clickmap:true, trackLinks:true, accurateTrackBounce:true});`}
            </Script>
            <noscript>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://mc.yandex.ru/watch/${YM_ID}`}
                  style={{ position: 'absolute', left: '-9999px' }}
                  alt=""
                />
              </div>
            </noscript>
          </>
        )}

        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
