'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { BenefitIcon } from '@/components/icons/BenefitIcons';
import { BENEFITS } from '@/lib/constants';

export function WhyUs() {
  return (
    <section className="section">
      <div className="container-default">
        <SectionHeading
          kicker="— Преимущества —"
          title="Почему выбирают ERA Coffee"
          description="Шесть причин, по которым нам доверяют сотни заведений по стране"
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {BENEFITS.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="card-soft hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(0,0,0,0.04),0_12px_36px_rgba(27,58,139,0.08)]"
            >
              <div className="w-14 h-14 rounded-2xl bg-era-blue-light flex items-center justify-center text-era-blue">
                <BenefitIcon name={benefit.icon} className="w-8 h-8" />
              </div>
              <h3 className="mt-5 text-lg sm:text-xl font-bold text-era-dark leading-snug">
                {benefit.title}
              </h3>
              <p className="mt-2 text-era-dark/65 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
