'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { COMPARE_TABLE, PRODUCTS } from '@/lib/constants';

const COLOR_TEXT = {
  blue: 'text-era-blue',
  green: 'text-era-green',
  purple: 'text-era-purple',
} as const;

export function CompareTable() {
  return (
    <section className="section">
      <div className="container-default">
        <SectionHeading
          kicker="— Сравнение —"
          title="Какой кофе выбрать?"
          description="Быстрый ориентир по трём линейкам — но если сомневаетесь, закажите пробник"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mt-14 hidden md:block"
        >
          <div className="overflow-hidden rounded-card border border-black/5">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-era-cream">
                  <th className="px-6 py-5 text-sm uppercase tracking-wider text-era-dark/55 font-semibold w-1/4">
                    Критерий
                  </th>
                  {PRODUCTS.map((p) => (
                    <th
                      key={p.key}
                      className={`px-6 py-5 text-base font-bold ${COLOR_TEXT[p.color]}`}
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_TABLE.map((row) => (
                  <tr key={row.criterion} className="border-t border-black/5 odd:bg-white even:bg-era-cream/40">
                    <td className="px-6 py-4 text-era-dark/65">{row.criterion}</td>
                    <td className="px-6 py-4 text-era-dark font-medium">{row.elite}</td>
                    <td className="px-6 py-4 text-era-dark font-medium">{row.blend}</td>
                    <td className="px-6 py-4 text-era-dark font-medium">{row.mocco}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="mt-12 md:hidden grid gap-4">
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="rounded-card border border-black/5 p-5"
            >
              <h3 className={`text-xl font-extrabold ${COLOR_TEXT[product.color]}`}>
                {product.name}
              </h3>
              <dl className="mt-4 grid gap-2 text-sm">
                {COMPARE_TABLE.map((row) => (
                  <div key={row.criterion} className="flex flex-col py-2 border-t border-black/5 first:border-0">
                    <dt className="text-era-dark/55 text-xs uppercase tracking-wide">{row.criterion}</dt>
                    <dd className="text-era-dark font-medium mt-0.5">{row[product.key]}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
