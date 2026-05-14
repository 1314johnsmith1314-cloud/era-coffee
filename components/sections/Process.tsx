'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { PROCESS_STEPS } from '@/lib/constants';

export function Process() {
  return (
    <section className="section">
      <div className="container-default">
        <SectionHeading
          kicker="— Процесс —"
          title="Как мы работаем"
          description="Пять понятных шагов от первого контакта до первой партии"
        />

        <div className="mt-16 relative">
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px border-t-2 border-dashed border-era-blue/25"
          />
          <motion.div
            aria-hidden="true"
            initial={{ width: 0 }}
            whileInView={{ width: '80%' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="hidden lg:block absolute top-7 left-[10%] h-px bg-era-blue"
          />

          <ol className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-4 relative">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center lg:px-2"
              >
                <div className="mx-auto w-14 h-14 rounded-full bg-era-blue text-white flex items-center justify-center text-xl font-extrabold shadow-lg shadow-era-blue/25 relative z-10">
                  {idx + 1}
                </div>
                <h3 className="mt-5 text-lg font-bold text-era-dark">{step.title}</h3>
                <p className="mt-2 text-sm sm:text-base text-era-dark/65 leading-relaxed">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
