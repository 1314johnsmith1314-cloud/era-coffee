'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { UiIcon } from '@/components/icons/UiIcons';
import { COMPARE_TABLE, PRODUCTS, ProductKey } from '@/lib/constants';
import { cn } from '@/lib/utils';

const COLOR = {
  blue: {
    text: 'text-era-blue',
    bg: 'bg-era-blue',
    soft: 'bg-era-blue-light',
    ring: 'ring-era-blue/20',
    dot: 'bg-era-blue',
  },
  green: {
    text: 'text-era-green',
    bg: 'bg-era-green',
    soft: 'bg-era-green-light',
    ring: 'ring-era-green/20',
    dot: 'bg-era-green',
  },
  purple: {
    text: 'text-era-purple',
    bg: 'bg-era-purple',
    soft: 'bg-era-purple-light',
    ring: 'ring-era-purple/20',
    dot: 'bg-era-purple',
  },
} as const;

/** Подсветка «идеально/идеальный» вариант — заливной бейдж */
function isHighlight(value: string) {
  return /идеаль/i.test(value);
}

function ValueCell({ value, color }: { value: string; color: keyof typeof COLOR }) {
  const c = COLOR[color];
  if (isHighlight(value)) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold text-white',
          c.bg,
        )}
      >
        ★ {value}
      </span>
    );
  }
  return <span className="text-era-dark font-medium">{value}</span>;
}

export function CompareTable() {
  return (
    <section className="section">
      <div className="container-default">
        <SectionHeading
          kicker="— Сравнение —"
          title="Какой кофе выбрать?"
          description="Быстрый ориентир по трём линейкам — но если сомневаетесь, закажите пробник"
        />

        {/* DESKTOP */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mt-14 hidden md:block"
        >
          <div className="overflow-hidden rounded-card border border-black/5 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.03),0_12px_40px_rgba(27,58,139,0.05)]">
            {/* header row with product chips */}
            <div className="grid grid-cols-[1.1fr_1fr_1fr_1fr]">
              <div className="px-6 py-5 bg-era-cream" />
              {PRODUCTS.map((p) => {
                const c = COLOR[p.color];
                return (
                  <div key={p.key} className={cn('px-6 py-5 text-center', c.soft)}>
                    <span className={cn('inline-flex items-center gap-2 font-extrabold text-lg', c.text)}>
                      <span className={cn('w-2.5 h-2.5 rounded-full', c.dot)} />
                      {p.name}
                    </span>
                    <p className="mt-1 text-xs text-era-dark/55">{p.subtitle}</p>
                  </div>
                );
              })}
            </div>

            {COMPARE_TABLE.map((row, idx) => (
              <div
                key={row.criterion}
                className={cn(
                  'grid grid-cols-[1.1fr_1fr_1fr_1fr] items-center border-t border-black/5',
                  idx % 2 === 1 && 'bg-era-cream/30',
                )}
              >
                <div className="px-6 py-4 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-era-blue-light flex items-center justify-center text-era-blue shrink-0">
                    <UiIcon name={row.icon} className="w-5 h-5" />
                  </span>
                  <span className="text-era-dark/70 font-medium text-sm">{row.criterion}</span>
                </div>
                {(['elite', 'blend', 'mocco'] as ProductKey[]).map((key) => {
                  const product = PRODUCTS.find((p) => p.key === key)!;
                  return (
                    <div key={key} className="px-6 py-4 text-center">
                      <ValueCell value={row[key]} color={product.color} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>

        {/* MOBILE */}
        <div className="mt-12 md:hidden grid gap-4">
          {PRODUCTS.map((product) => {
            const c = COLOR[product.color];
            return (
              <motion.div
                key={product.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                className={cn('rounded-card border bg-white overflow-hidden ring-1', c.ring)}
              >
                <div className={cn('px-5 py-4 flex items-center gap-2.5', c.soft)}>
                  <span className={cn('w-3 h-3 rounded-full', c.dot)} />
                  <span className={cn('text-xl font-extrabold', c.text)}>{product.name}</span>
                </div>
                <dl className="divide-y divide-black/5">
                  {COMPARE_TABLE.map((row) => (
                    <div key={row.criterion} className="flex items-start gap-3 px-5 py-3">
                      <span className="w-8 h-8 rounded-lg bg-era-blue-light flex items-center justify-center text-era-blue shrink-0">
                        <UiIcon name={row.icon} className="w-4 h-4" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <dt className="text-era-dark/55 text-xs uppercase tracking-wide">
                          {row.criterion}
                        </dt>
                        <dd className="mt-0.5">
                          <ValueCell value={row[product.key]} color={product.color} />
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
