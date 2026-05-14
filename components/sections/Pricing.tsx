'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { PRODUCTS, PRICING, PRICING_TIERS } from '@/lib/constants';

const COLOR_TEXT = {
  blue: 'text-era-blue',
  green: 'text-era-green',
  purple: 'text-era-purple',
} as const;

export function Pricing() {
  return (
    <section id="pricing" className="section bg-era-cream">
      <div className="container-default">
        <SectionHeading
          kicker="— Цены —"
          title="Цены и условия"
          description="Чем больше объём — тем выгоднее цена за килограмм"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mt-12 hidden md:block"
        >
          <div className="overflow-hidden rounded-card bg-white border border-black/5">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-era-blue text-white">
                  <th className="px-6 py-5 text-sm uppercase tracking-wider font-semibold">
                    Продукт
                  </th>
                  {PRICING_TIERS.map((tier) => (
                    <th
                      key={tier.label}
                      className="px-6 py-5 text-sm uppercase tracking-wider font-semibold text-center"
                    >
                      {tier.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((product) => (
                  <tr key={product.key} className="border-t border-black/5">
                    <td className="px-6 py-5">
                      <span className={`font-bold text-lg ${COLOR_TEXT[product.color]}`}>
                        {product.name}
                      </span>
                    </td>
                    {PRICING[product.key].map((price, i) => (
                      <td
                        key={i}
                        className={`px-6 py-5 text-center font-semibold ${
                          i === PRICING[product.key].length - 1
                            ? 'text-era-dark text-lg'
                            : 'text-era-dark/85'
                        }`}
                      >
                        {price}₽
                      </td>
                    ))}
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
              className="rounded-card bg-white border border-black/5 p-5"
            >
              <h3 className={`text-xl font-extrabold ${COLOR_TEXT[product.color]}`}>
                {product.name}
              </h3>
              <ul className="mt-4 divide-y divide-black/5 text-sm">
                {PRICING_TIERS.map((tier, i) => (
                  <li key={tier.label} className="flex items-center justify-between py-3">
                    <span className="text-era-dark/65">{tier.label}</span>
                    <span className="font-semibold text-era-dark">
                      {PRICING[product.key][i]}₽
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-center">
          <a href="#pdf-magnet" className="btn-secondary w-full sm:w-auto">
            Скачать прайс PDF
          </a>
          <a href="#final-cta" className="btn-primary w-full sm:w-auto">
            Запросить индивидуальные условия (от 100 кг)
          </a>
        </div>
      </div>
    </section>
  );
}
