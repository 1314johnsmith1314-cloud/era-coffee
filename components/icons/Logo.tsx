import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'color' | 'white';
  size?: number;
}

export function Logo({ className, variant = 'color', size = 44 }: LogoProps) {
  const isDark = variant === 'white';
  return (
    <span
      className={cn('inline-flex items-center shrink-0', className)}
      aria-label="ERA Coffee"
    >
      <Image
        src={isDark ? '/images/logo-white.png' : '/images/logo.png'}
        alt="ERA Coffee"
        width={Math.round(size * 0.69)}
        height={size}
        priority
        style={{ height: size, width: 'auto' }}
      />
    </span>
  );
}
