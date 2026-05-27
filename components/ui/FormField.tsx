import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
  onDark?: boolean;
}

export function FieldWrapper({ label, htmlFor, error, className, children, onDark }: FieldWrapperProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={htmlFor}
        className={cn(
          'text-sm font-medium',
          onDark ? 'text-white/85' : 'text-era-dark',
        )}
      >
        {label}
      </label>
      {children}
      {error && (
        <span className={cn('text-xs', onDark ? 'text-era-gold' : 'text-red-600')}>
          {error}
        </span>
      )}
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { onDark?: boolean };

export const TextInput = forwardRef<HTMLInputElement, InputProps>(function TextInput(
  { className, onDark, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(onDark ? 'field-input-on-dark' : 'field-input', className)}
      {...props}
    />
  );
});

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { onDark?: boolean };

export const SelectInput = forwardRef<HTMLSelectElement, SelectProps>(function SelectInput(
  { className, onDark, children, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      className={cn(onDark ? 'field-input-on-dark' : 'field-input', 'appearance-none pr-10 bg-no-repeat bg-[length:16px_16px] bg-[position:right_14px_center]', className)}
      style={{
        backgroundImage: onDark
          ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")"
          : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231A1A2E' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
      }}
      {...props}
    >
      {children}
    </select>
  );
});

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { onDark?: boolean };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, onDark, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={4}
      className={cn(
        onDark ? 'field-input-on-dark' : 'field-input',
        'min-h-[120px] resize-y',
        className,
      )}
      {...props}
    />
  );
});

interface ConsentProps {
  id: string;
  error?: string;
  onDark?: boolean;
  registered: React.InputHTMLAttributes<HTMLInputElement>;
}

export function ConsentCheckbox({ id, error, onDark, registered }: ConsentProps) {
  const linkClass = cn(
    'underline underline-offset-2',
    onDark ? 'text-era-gold hover:text-white' : 'text-era-blue hover:text-era-dark',
  );
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className={cn(
          'flex items-start gap-3 cursor-pointer text-xs leading-relaxed',
          onDark ? 'text-white/75' : 'text-era-dark/70',
        )}
      >
        <input
          id={id}
          type="checkbox"
          className={cn(
            'mt-0.5 w-4 h-4 rounded shrink-0 cursor-pointer',
            onDark ? 'accent-era-gold' : 'accent-era-blue',
          )}
          {...registered}
        />
        <span>
          Я даю{' '}
          <a href="/consent" target="_blank" rel="noopener noreferrer" className={linkClass}>
            согласие на обработку персональных данных
          </a>{' '}
          в соответствии с{' '}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className={linkClass}>
            Политикой обработки ПД
          </a>{' '}
          и подтверждаю, что ознакомлен(а) с{' '}
          <a href="/cookies" target="_blank" rel="noopener noreferrer" className={linkClass}>
            Политикой использования cookies
          </a>
          .
        </span>
      </label>
      {error && (
        <span className={cn('text-xs', onDark ? 'text-era-gold' : 'text-red-600')}>
          {error}
        </span>
      )}
    </div>
  );
}
