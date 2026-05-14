'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  onDark?: boolean;
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = 'center',
  onDark = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl',
        className,
      )}
    >
      {kicker && <span className="kicker">{kicker}</span>}
      <h2
        className={cn(
          'h2 mt-3 text-balance',
          onDark ? 'text-white' : 'text-era-dark',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 body-text text-pretty',
            onDark ? 'text-white/80' : 'text-era-dark/65',
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
