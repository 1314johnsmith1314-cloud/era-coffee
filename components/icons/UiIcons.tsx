const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/* ─── Compare criteria icons ─── */

export function BusinessIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M3 21h18M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-5h6v5M9 10h.01M15 10h.01M12 13h.01" />
    </svg>
  );
}

export function TasteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M12 3c4 0 7 2.5 7 6 0 2-1 3-2.5 3.5C15 13 15 14 15 15c0 2-1.5 3-3 3s-3-1-3-3c0-1 0-2-1.5-2.5C6 12 5 11 5 9c0-3.5 3-6 7-6z" />
      <path d="M9 9h.01M15 9h.01M12 7h.01" />
    </svg>
  );
}

export function MilkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M8 2h8l-1 4v0l1 3v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9l1-3z" />
      <path d="M7 9h10M10 13h4v3h-4z" />
    </svg>
  );
}

export function AcidityIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M12 3c3.5 4 6 7 6 10.5A6 6 0 0 1 6 13.5C6 10 8.5 7 12 3z" />
      <path d="M9 14a3 3 0 0 0 3 3" />
    </svg>
  );
}

export function PriceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7-7V3.5h10.1l6.9 7.1a2 2 0 0 1 0 2.8z" />
      <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ─── Process step icons ─── */

export function RequestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M4 5h16v11H7l-3 3V5z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  );
}

export function SamplerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M6 8h12v4a6 6 0 0 1-12 0V8z" />
      <path d="M18 9h2a2 2 0 0 1 0 4h-2" />
      <path d="M9 3c1 1 1 2 0 3M13 3c1 1 1 2 0 3M21 20H5" />
    </svg>
  );
}

export function ContractIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M6 2h8l4 4v16H6z" />
      <path d="M14 2v4h4M9 13l2 2 4-4" />
    </svg>
  );
}

export function RoastIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M12 21c-4 0-7-3-7-7 0-3.5 2.5-6 3.5-7 .5 1.5 1.5 2 2 2 0-3 2-5.5 4-7 0 3 3 4.5 4 7 1 1.5 2 3.5 2 5 0 4-3 7-7 7z" />
      <path d="M12 17c-1.5 0-2.5-1-2.5-2.5 0-1 1-2 1.5-2.5 0 1 .5 1.5 1 1.5.5-1 1.5-2 2-2.5.5 1.5 1 2.5 1 3.5 0 1.5-1 2.5-2.5 2.5z" />
    </svg>
  );
}

export function DeliveryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M2 6h12v10H2zM14 9h4l3 3v4h-7z" />
      <circle cx="6.5" cy="18" r="1.8" />
      <circle cx="17.5" cy="18" r="1.8" />
    </svg>
  );
}

const ICON_MAP = {
  business: BusinessIcon,
  taste: TasteIcon,
  milk: MilkIcon,
  acidity: AcidityIcon,
  price: PriceIcon,
  request: RequestIcon,
  sampler: SamplerIcon,
  contract: ContractIcon,
  roast: RoastIcon,
  delivery: DeliveryIcon,
} as const;

export function UiIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name as keyof typeof ICON_MAP] ?? BusinessIcon;
  return <Icon className={className} />;
}
