'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';

const ITEMS = [
  {
    title: 'Категория зерна NY2',
    description:
      'Премиальный международный стандарт. Не более 4 дефектов на пробу 300 г.',
  },
  {
    title: 'Прямые контракты',
    description:
      'Работаем напрямую с фермерами в Бразилии (Сул-де-Минас), Эфиопии и Колумбии.',
  },
  {
    title: 'Документы для юрлиц',
    description:
      'Работаем с НДС, предоставляем декларации соответствия и спецификации.',
  },
];

export function Quality() {
  return (
    <section className="section bg-era-cream">
      <div className="container-default">
        <SectionHeading
          kicker="— Качество —"
          title="Сертификаты и качество"
          description="Три гарантии, на которые мы опираемся в каждой партии"
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {ITEMS.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white rounded-card p-7 sm:p-8 border-t-4 border-era-blue"
            >
              <h3 className="text-xl font-bold text-era-dark">{item.title}</h3>
              <p className="mt-3 text-era-dark/70 leading-relaxed">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
