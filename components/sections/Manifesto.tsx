'use client';

import { motion } from 'framer-motion';
import { AcaciaDivider } from '@/components/icons/SocialIcons';

const STATS = [
  { value: '12+', label: 'лет на рынке' },
  { value: '3', label: 'страны происхождения' },
  { value: '100%', label: 'арабика категории NY2' },
];

export function Manifesto() {
  return (
    <section id="manifesto" className="section relative overflow-hidden">
      <div className="blob top-20 -left-32 w-80 h-80 bg-era-blue-light" />
      <div className="container-default relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="kicker">— Манифест —</span>
            <h2 className="h2 mt-3 text-balance">
              Кофе, который начинает новую эру вкуса в вашем бизнесе
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="body-text text-era-dark/75 leading-relaxed text-pretty"
          >
            <p>
              Мы 12 лет работаем со свежеобжаренным зерновым кофе и точно знаем: вкус
              в чашке начинается задолго до помола. Поэтому мы лично выбираем зерно
              на плантациях Бразилии, Эфиопии и Колумбии, обжариваем его на собственном
              производстве полного цикла и поставляем напрямую — без посредников и переплат.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-center sm:text-left"
            >
              <div className="text-5xl sm:text-6xl font-extrabold text-era-blue leading-none">
                {stat.value}
              </div>
              <div className="mt-3 text-sm sm:text-base text-era-dark/65 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-era-blue/30">
          <AcaciaDivider className="w-full max-w-2xl mx-auto h-12" />
        </div>
      </div>
    </section>
  );
}
