'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { ChevronIcon } from '@/components/icons/SocialIcons';
import { FAQ_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <section id="faq" className="section">
      <div className="container-default">
        <SectionHeading
          kicker="— FAQ —"
          title="Частые вопросы"
          description="Если ответа на ваш вопрос здесь нет — напишите нам, ответим в течение рабочего дня"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mt-12 max-w-3xl mx-auto rounded-card border border-black/5 divide-y divide-black/5 overflow-hidden"
        >
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  className={cn(
                    'w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-5 text-left transition-colors',
                    isOpen ? 'bg-era-cream' : 'hover:bg-era-cream/50',
                  )}
                >
                  <span className="text-base sm:text-lg font-semibold text-era-dark pr-2">
                    {item.q}
                  </span>
                  <ChevronIcon
                    className={cn(
                      'w-5 h-5 shrink-0 text-era-blue transition-transform duration-300',
                      isOpen ? 'rotate-180' : '',
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-7 pb-6 text-era-dark/70 leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
