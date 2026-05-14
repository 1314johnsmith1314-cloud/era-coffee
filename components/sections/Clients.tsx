'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { CLIENTS } from '@/lib/constants';

const HIGHLIGHTS = [
  { value: '100+', label: 'заведений по всей России' },
  { value: '12 лет', label: 'на рынке' },
  { value: '3 страны', label: 'прямые контракты' },
];

function ClientLogo({ name }: { name: string }) {
  return (
    <div className="h-16 sm:h-20 flex items-center justify-center px-6 group">
      <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-era-dark/35 transition-colors duration-300 group-hover:text-era-dark whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export function Clients() {
  return (
    <section className="section">
      <div className="container-default">
        <SectionHeading kicker="— Клиенты —" title="Нам доверяют" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center justify-items-center rounded-card bg-era-cream py-6 sm:py-8"
        >
          {CLIENTS.map((client) => (
            <ClientLogo key={client.name} name={client.name} />
          ))}
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {HIGHLIGHTS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="text-center"
            >
              <div className="text-5xl sm:text-6xl font-extrabold text-era-blue leading-none">
                {stat.value}
              </div>
              <div className="mt-3 text-sm sm:text-base text-era-dark/65">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
