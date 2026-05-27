import type { ReactNode } from 'react';

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  effectiveDate: string;
  toc?: { id: string; label: string }[];
  children: ReactNode;
}

export function LegalPageLayout({
  title,
  subtitle,
  effectiveDate,
  toc,
  children,
}: LegalPageLayoutProps) {
  return (
    <article className="container-default pt-32 pb-24 max-w-4xl">
      <header className="mb-10 border-b border-black/10 pb-8">
        <h1 className="h2 text-balance">{title}</h1>
        {subtitle && (
          <p className="mt-3 body-text text-era-dark/70 text-pretty">{subtitle}</p>
        )}
        <p className="mt-4 text-sm text-era-dark/55">
          Редакция действует с {effectiveDate}
        </p>
      </header>

      {toc && toc.length > 0 && (
        <nav
          aria-label="Содержание"
          className="mb-10 rounded-card bg-era-cream-soft border border-black/5 p-5 sm:p-7"
        >
          <h2 className="text-xs uppercase tracking-wider font-bold text-era-dark/65">
            Содержание
          </h2>
          <ol className="mt-3 grid gap-1.5 sm:grid-cols-2 list-decimal list-inside marker:text-era-dark/40">
            {toc.map((item) => (
              <li key={item.id} className="text-sm">
                <a
                  href={`#${item.id}`}
                  className="text-era-blue hover:underline underline-offset-2"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="space-y-10 text-era-dark/85 leading-relaxed">
        {children}
      </div>

      <div className="mt-14 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <a href="/" className="btn-secondary">
          ← На главную
        </a>
        <a href="/privacy" className="text-sm self-center text-era-dark/55 hover:text-era-blue">
          Политика обработки ПД
        </a>
        <a href="/consent" className="text-sm self-center text-era-dark/55 hover:text-era-blue">
          Согласие на обработку ПД
        </a>
        <a href="/cookies" className="text-sm self-center text-era-dark/55 hover:text-era-blue">
          Политика cookies
        </a>
      </div>
    </article>
  );
}

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl sm:text-2xl font-extrabold text-era-dark">
        {number}. {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function LegalList({ children }: { children: ReactNode }) {
  return (
    <ul className="space-y-2 list-disc pl-6 marker:text-era-dark/35">
      {children}
    </ul>
  );
}

export function LegalKeyVal({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  const isPlaceholder = typeof value === 'string' && value.startsWith('[');
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 py-2 border-b border-black/5 last:border-0">
      <dt className="text-sm uppercase tracking-wider text-era-dark/55 sm:w-64 shrink-0">
        {label}
      </dt>
      <dd
        className={
          isPlaceholder
            ? 'text-era-coffee/80 font-mono text-sm bg-era-gold/10 px-2 py-1 rounded inline-block self-start'
            : 'text-era-dark font-medium'
        }
      >
        {value}
      </dd>
    </div>
  );
}
