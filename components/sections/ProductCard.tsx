'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/lib/constants';

const colorStyles = {
  blue: {
    bg: 'bg-era-blue-light',
    accent: 'bg-era-blue text-white',
    text: 'text-era-blue',
    ring: 'ring-era-blue/15',
    dot: 'bg-era-blue',
  },
  green: {
    bg: 'bg-era-green-light',
    accent: 'bg-era-green text-white',
    text: 'text-era-green',
    ring: 'ring-era-green/15',
    dot: 'bg-era-green',
  },
  purple: {
    bg: 'bg-era-purple-light',
    accent: 'bg-era-purple text-white',
    text: 'text-era-purple',
    ring: 'ring-era-purple/15',
    dot: 'bg-era-purple',
  },
} as const;

interface ProductCardProps {
  product: Product;
  index: number;
  onOrder: (product: Product) => void;
}

function ScaleRow({ label, value, max = 5, color }: { label: string; value: number; max?: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-era-dark/65 w-20 shrink-0">{label}</span>
      <div className="flex gap-1.5">
        {Array.from({ length: max }).map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${i < value ? color : 'bg-era-dark/15'}`}
          />
        ))}
      </div>
    </div>
  );
}

export function ProductCard({ product, index, onOrder }: ProductCardProps) {
  const styles = colorStyles[product.color];
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-card overflow-hidden ${styles.bg} ring-1 ${styles.ring} flex flex-col h-full`}
    >
      <div className="relative aspect-[4/5] w-full bg-gradient-to-b from-black/20 via-transparent to-transparent overflow-hidden">
        <Image
          src={product.image}
          alt={`Упаковка — ${product.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover object-center"
        />
      </div>

      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <h3 className={`text-2xl sm:text-3xl font-extrabold ${styles.text}`}>
          {product.name}
        </h3>
        <p className="mt-1 text-era-dark/70 font-medium">{product.subtitle}</p>

        <p className="mt-4 text-sm text-era-dark/75 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-6 space-y-2.5">
          <div className="flex flex-wrap items-baseline gap-x-2 text-sm">
            <span className="text-era-dark/65">Состав:</span>
            <span className="text-era-dark font-medium">{product.composition}</span>
          </div>
          <div className="flex items-baseline gap-2 text-sm">
            <span className="text-era-dark/65">Обжарка:</span>
            <span className="text-era-dark font-medium">{product.roast}</span>
          </div>
        </div>

        <div className="mt-5 space-y-2 py-4 border-y border-era-dark/10">
          <ScaleRow label="Кислотность" value={product.acidity} color={styles.dot} />
          <ScaleRow label="Горечь" value={product.bitterness} color={styles.dot} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {product.descriptors.map((desc) => (
            <span
              key={desc}
              className="px-3 py-1 text-xs font-medium rounded-full bg-white/80 text-era-dark/75 border border-era-dark/10"
            >
              {desc}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-era-dark/65 text-sm">Фасовка:</span>
          <span className="font-medium text-era-dark">{product.weights.join(' / ')}</span>
        </div>

        <div className="mt-auto pt-6">
          <div className="flex items-end justify-between gap-3 mb-4">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-era-dark/60 uppercase tracking-wider">Розница</span>
                <span className="text-lg font-bold text-era-dark">
                  {product.priceRetail}<span className="text-sm">₽</span>
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-era-dark/60 uppercase tracking-wider">Опт от</span>
                <span className={`text-2xl font-extrabold ${styles.text} leading-none`}>
                  {product.priceFrom}<span className="text-sm font-medium">₽/кг</span>
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOrder(product)}
            className={`inline-flex items-center justify-center w-full rounded-btn ${styles.accent} px-5 py-3 font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-[0.98]`}
            style={{ minHeight: 48 }}
          >
            Заказать
          </button>
        </div>
      </div>
    </motion.article>
  );
}
