'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { UiIcon } from '@/components/icons/UiIcons';
import { PROCESS_STEPS } from '@/lib/constants';

export function Process() {
  return (
    <section className="section relative overflow-hidden">
      <div className="blob -bottom-20 -right-32 w-96 h-96 bg-era-blue-light/60" />
      <div className="container-default relative">
        <SectionHeading
          kicker="— Процесс —"
          title="Как мы работаем"
          description="Пять понятных шагов от первого контакта до первой партии"
        />

        {/* ───────── DESKTOP: горизонтальный таймлайн ───────── */}
        <div className="mt-20 relative hidden lg:block">
          {/* соединяющая линия */}
          <div
            aria-hidden="true"
            className="absolute top-9 left-[10%] right-[10%] h-0.5 bg-era-blue/15"
          />
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            style={{ transformOrigin: 'left' }}
            className="absolute top-9 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-era-blue to-era-gold"
          />

          <ol className="grid grid-cols-5 gap-4">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center text-center px-2"
              >
                <div className="relative z-10 w-[72px] h-[72px] rounded-2xl bg-white shadow-[0_8px_28px_rgba(27,58,139,0.16)] ring-1 ring-era-blue/10 flex items-center justify-center text-era-blue">
                  <UiIcon name={step.icon} className="w-8 h-8" />
                  <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-era-blue text-white text-sm font-extrabold flex items-center justify-center shadow-md">
                    {idx + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-era-dark">{step.title}</h3>
                <p className="mt-2 text-sm text-era-dark/65 leading-relaxed">
                  {step.description}
                </p>
                {step.badge && (
                  <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-era-gold/15 text-era-coffee text-[11px] font-semibold uppercase tracking-wide">
                    <span aria-hidden="true">📍</span>
                    {step.badge}
                  </span>
                )}
              </motion.li>
            ))}
          </ol>
        </div>

        {/* ───────── MOBILE/TABLET: вертикальный таймлайн ───────── */}
        <ol className="mt-14 lg:hidden relative">
          {/* вертикальная линия */}
          <div
            aria-hidden="true"
            className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-era-blue/15"
          />
          {PROCESS_STEPS.map((step, idx) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex gap-4 pb-8 last:pb-0"
            >
              <div className="relative z-10 shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-[0_6px_20px_rgba(27,58,139,0.15)] ring-1 ring-era-blue/10 flex items-center justify-center text-era-blue">
                  <UiIcon name={step.icon} className="w-7 h-7" />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-era-blue text-white text-xs font-extrabold flex items-center justify-center shadow">
                  {idx + 1}
                </span>
              </div>
              <div className="flex-1 pt-1.5 pb-1">
                <h3 className="text-lg font-bold text-era-dark">{step.title}</h3>
                <p className="mt-1.5 text-sm text-era-dark/65 leading-relaxed">
                  {step.description}
                </p>
                {step.badge && (
                  <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-era-gold/15 text-era-coffee text-[11px] font-semibold uppercase tracking-wide">
                    <span aria-hidden="true">📍</span>
                    {step.badge}
                  </span>
                )}
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="mt-12 lg:mt-16 text-center">
          <a href="#sampler" className="btn-primary">
            Начать с бесплатного пробника
          </a>
        </div>
      </div>
    </section>
  );
}
