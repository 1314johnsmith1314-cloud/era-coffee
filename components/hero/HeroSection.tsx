'use client';

import { useEffect, useState } from 'react';
import { ScrollDrivenVideo } from './ScrollDrivenVideo';
import { HERO_BLOCKS } from './heroContent';

export function HeroSection() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const handler = () => setReducedMotion(media.matches);
    media.addEventListener?.('change', handler);
    return () => media.removeEventListener?.('change', handler);
  }, []);

  if (reducedMotion) {
    return (
      <section id="top" className="bg-era-dark text-white">
        <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/hero-part-1-v4.mp4"
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-era-dark/40" />
          <div className="container-default relative z-10 h-full flex items-center justify-center text-center">
            <div className="max-w-2xl">
              <span className="kicker">— ERA Coffee —</span>
              <h1 className="h1 mt-3 text-white">Начни свою эру вкуса</h1>
              <p className="mt-4 body-text text-white/85">
                Отборный зерновой кофе для вашего бизнеса
              </p>
            </div>
          </div>
        </div>

        <div className="container-default py-16 grid gap-6">
          {HERO_BLOCKS.map((block, idx) => (
            <article
              key={idx}
              className="rounded-card border border-white/10 bg-white/[0.04] px-6 py-7"
            >
              <span className="text-era-gold font-semibold text-xs uppercase tracking-[0.2em]">
                {block.kicker}
              </span>
              <h2 className="mt-3 text-2xl font-bold leading-tight">{block.headline}</h2>
              <p className="mt-2 text-white/80">{block.support}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="top" className="relative w-full">
      <ScrollDrivenVideo />
    </section>
  );
}
