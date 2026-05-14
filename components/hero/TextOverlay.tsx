'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HERO_BLOCKS } from './heroContent';

interface TextOverlayProps {
  progress: number;
}

const TRANSITION_WINDOW = 0.005;

function blockIndexFromProgress(progress: number): number {
  const clamped = Math.min(Math.max(progress, 0), 0.9999);
  return Math.min(HERO_BLOCKS.length - 1, Math.floor(clamped * 10));
}

function isInTransitionGap(progress: number): boolean {
  const local = (progress * 10) % 1;
  return local < TRANSITION_WINDOW || local > 1 - TRANSITION_WINDOW;
}

export function TextOverlay({ progress }: TextOverlayProps) {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(0);

  useEffect(() => {
    if (isInTransitionGap(progress)) {
      setVisibleIndex(null);
      return;
    }
    setVisibleIndex(blockIndexFromProgress(progress));
  }, [progress]);

  const block =
    visibleIndex !== null ? HERO_BLOCKS[visibleIndex] : null;
  const isFinal = visibleIndex === HERO_BLOCKS.length - 1;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-end md:items-end justify-center">
      <div className="w-full px-4 pb-[12vh] md:pb-[15vh] flex items-center md:items-end justify-center min-h-full md:min-h-0">
        <div
          className="w-[min(92vw,640px)] absolute md:relative top-1/2 md:top-auto left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0"
        >
          <AnimatePresence mode="wait">
            {block && (
              <motion.div
                key={visibleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass-panel rounded-card px-6 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10 pointer-events-auto"
              >
                <span
                  className="block text-era-gold font-semibold uppercase tracking-[0.2em]"
                  style={{ fontSize: 'clamp(11px, 1.5vw, 14px)' }}
                >
                  {block.kicker}
                </span>
                <h2
                  className="mt-3 text-white font-extrabold leading-[1.1] text-balance"
                  style={{
                    fontSize: 'clamp(28px, 5vw, 56px)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {block.headline}
                </h2>
                <p
                  className="mt-4 text-white/85 leading-relaxed text-pretty"
                  style={{ fontSize: 'clamp(14px, 1.5vw, 18px)' }}
                >
                  {block.support}
                </p>

                {isFinal && (
                  <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a href="#pdf-magnet" className="btn-white w-full sm:w-auto flex-1">
                      Получить прайс
                    </a>
                    <a
                      href="#sampler"
                      className="btn-outline-white w-full sm:w-auto flex-1"
                    >
                      Заказать бесплатный пробник
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
