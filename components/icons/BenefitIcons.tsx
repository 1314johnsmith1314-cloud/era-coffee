const baseProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function FactoryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...baseProps}>
      <path d="M6 40V22l9 5V22l9 5V14l9 5v21H6z" />
      <path d="M12 32h2M20 32h2M28 32h2M36 32h2" />
      <path d="M6 40h36" />
    </svg>
  );
}

export function MedalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...baseProps}>
      <circle cx="24" cy="30" r="10" />
      <path d="M18 23 14 8h6l4 12M30 23 34 8h-6l-4 12" />
      <path d="m20 30 3 3 5-6" />
    </svg>
  );
}

export function HandshakeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...baseProps}>
      <path d="M4 20l6-6h10l4 4 4-4h10l6 6v8l-6 6h-8l-4-4-4 4h-8l-6-6v-8z" />
      <path d="m18 22 4 4 4-4 4 4" />
    </svg>
  );
}

export function FlameIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...baseProps}>
      <path d="M24 42c-7 0-12-5-12-12 0-6 4-10 6-12 1 3 3 4 4 4 0-6 4-12 8-16 0 6 6 10 8 16 2 3 4 7 4 12 0 7-5 12-12 12h-6z" />
      <path d="M24 36c-3 0-5-2-5-5 0-2 2-4 3-5 0 2 1 3 2 3 1-2 3-4 5-5 1 3 3 5 3 8 0 3-2 5-5 5h-3z" />
    </svg>
  );
}

export function BadgeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...baseProps}>
      <path d="M24 4l4 5 6-1 1 6 5 4-3 5 3 5-5 4-1 6-6-1-4 5-4-5-6 1-1-6-5-4 3-5-3-5 5-4 1-6 6 1 4-5z" />
      <path d="m18 24 4 4 8-8" />
    </svg>
  );
}

export function TruckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...baseProps}>
      <rect x="4" y="14" width="22" height="18" rx="2" />
      <path d="M26 20h10l6 6v6H26z" />
      <circle cx="14" cy="36" r="4" />
      <circle cx="34" cy="36" r="4" />
    </svg>
  );
}

export function CoffeeCupIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...baseProps}>
      <path d="M10 18h26v12c0 6-4 10-10 10h-6c-6 0-10-4-10-10V18z" />
      <path d="M36 22h4c2 0 4 2 4 4s-2 4-4 4h-4" />
      <path d="M16 8c2 2 2 4 0 6M22 8c2 2 2 4 0 6M28 8c2 2 2 4 0 6" />
    </svg>
  );
}

export function PlateIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...baseProps}>
      <circle cx="24" cy="24" r="18" />
      <circle cx="24" cy="24" r="10" />
      <path d="M24 14v20M14 24h20" opacity="0.4" />
    </svg>
  );
}

export function BedIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...baseProps}>
      <path d="M4 36V14M44 36V24c0-2-2-4-4-4H22v16" />
      <path d="M4 24h40M4 36h40" />
      <circle cx="13" cy="22" r="3" />
    </svg>
  );
}

export function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...baseProps}>
      <rect x="6" y="14" width="36" height="26" rx="3" />
      <path d="M18 14V8c0-1 1-2 2-2h8c1 0 2 1 2 2v6M6 24h36" />
    </svg>
  );
}

export function EventIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...baseProps}>
      <path d="M24 4v12M16 10l8 6 8-6" />
      <circle cx="24" cy="24" r="6" />
      <path d="M10 44c2-8 7-12 14-12s12 4 14 12" />
    </svg>
  );
}

const ICONS = {
  factory: FactoryIcon,
  medal: MedalIcon,
  handshake: HandshakeIcon,
  flame: FlameIcon,
  badge: BadgeIcon,
  truck: TruckIcon,
  'coffee-cup': CoffeeCupIcon,
  plate: PlateIcon,
  bed: BedIcon,
  briefcase: BriefcaseIcon,
  event: EventIcon,
} as const;

export function BenefitIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name as keyof typeof ICONS] ?? FactoryIcon;
  return <Icon className={className} />;
}
