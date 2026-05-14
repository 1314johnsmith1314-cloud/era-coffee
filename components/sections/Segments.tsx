'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { BenefitIcon } from '@/components/icons/BenefitIcons';
import { SEGMENTS } from '@/lib/constants';

export function Segments() {
  return (
    <section id="segments" className="section bg-era-cream">
      <div className="container-default">
        <SectionHeading
          kicker="— Для бизнеса —"
          title="Мы поставляем кофе в:"
          description="Подбираем зерно, фасовку и график обжарки под формат конкретного заведения"
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SEGMENTS.map((segment, idx) => (
            <motion.div
              key={segment.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-card bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(0,0,0,0.04),0_18px_42px_rgba(27,58,139,0.1)]"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at top right, rgba(27,58,139,0.06), transparent 60%)',
                }}
              />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-era-blue-light flex items-center justify-center text-era-blue transition-transform duration-300 group-hover:scale-110">
                  <BenefitIcon name={segment.icon} className="w-8 h-8" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-era-dark">{segment.title}</h3>
                <p className="mt-2 text-era-dark/65 leading-relaxed">
                  {segment.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
