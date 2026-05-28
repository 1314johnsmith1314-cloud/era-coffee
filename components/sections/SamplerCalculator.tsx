'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FieldWrapper,
  TextInput,
  ConsentCheckbox,
} from '@/components/ui/FormField';
import { SuccessModal } from '@/components/ui/SuccessModal';
import { CoffeeBean, CheckIcon } from '@/components/icons/SocialIcons';
import {
  sampleOrderSchema,
  calculatorSchema,
  type SampleOrderForm,
  type CalculatorForm,
} from '@/lib/validations';
import { PRODUCTS, PRICING, PRICING_TIERS, ProductKey } from '@/lib/constants';
import { cn } from '@/lib/utils';

type Tab = 'samples' | 'calculator';

const COLOR_DOT = {
  blue: 'bg-era-blue',
  green: 'bg-era-green',
  purple: 'bg-era-purple',
} as const;

const COLOR_BORDER = {
  blue: 'border-era-blue',
  green: 'border-era-green',
  purple: 'border-era-purple',
} as const;

export function SamplerCalculator() {
  const [tab, setTab] = useState<Tab>('samples');
  const [success, setSuccess] = useState<null | { title: string; message: string }>(null);

  return (
    <section
      id="sampler"
      className="relative section overflow-hidden text-white"
      style={{
        background:
          'linear-gradient(135deg, #1B3A8B 0%, #15296b 60%, #2A1D3F 100%)',
      }}
    >
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.06] pointer-events-none">
        {Array.from({ length: 22 }).map((_, i) => (
          <CoffeeBean
            key={i}
            className="absolute text-white"
            style={{
              width: `${28 + (i % 4) * 14}px`,
              height: `${28 + (i % 4) * 14}px`,
              top: `${(i * 53) % 100}%`,
              left: `${(i * 71) % 100}%`,
              transform: `rotate(${(i * 37) % 360}deg)`,
            }}
          />
        ))}
      </div>
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-era-gold/10 blur-3xl" />

      <div className="container-default relative">
        <div className="text-center max-w-2xl mx-auto">
          <span className="kicker text-era-gold">— Попробуйте или рассчитайте —</span>
          <h2 className="h2 mt-3 text-white text-balance">
            Закажите образцы или рассчитайте оптовую скидку
          </h2>
          <p className="mt-4 body-text text-white/80">
            Бесплатный пробник или индивидуальный расчёт под ваш объём — в одном блоке
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Режим"
          className="mt-10 mx-auto max-w-xl flex rounded-card bg-white/10 backdrop-blur-md border border-white/15 p-1"
        >
          <TabButton active={tab === 'samples'} onClick={() => setTab('samples')}>
            Заказать образцы
          </TabButton>
          <TabButton active={tab === 'calculator'} onClick={() => setTab('calculator')}>
            Рассчитать скидку
          </TabButton>
        </div>

        <div className="mt-10 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {tab === 'samples' ? (
              <motion.div
                key="samples"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <SamplesTab onSuccess={() => setSuccess({
                  title: 'Заявка на образцы принята',
                  message: 'Свяжемся в течение рабочего дня и согласуем адрес доставки пробника',
                })} />
              </motion.div>
            ) : (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <CalculatorTab onSuccess={() => setSuccess({
                  title: 'Запрос отправлен',
                  message: 'Менеджер пришлёт коммерческое предложение с подтверждённой ценой в течение рабочего дня',
                })} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <SuccessModal
        open={!!success}
        onClose={() => setSuccess(null)}
        title={success?.title}
        message={success?.message}
      />
    </section>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        'relative flex-1 px-4 py-3 sm:py-3.5 text-sm sm:text-base font-semibold rounded-[14px] transition-colors',
        active ? 'text-era-blue' : 'text-white/85 hover:text-white',
      )}
    >
      {active && (
        <motion.span
          layoutId="tab-bg"
          className="absolute inset-0 bg-white rounded-[14px]"
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        />
      )}
      <span className="relative">{children}</span>
    </button>
  );
}

function SamplesTab({ onSuccess }: { onSuccess: () => void }) {
  const SAMPLE_GRAMS = 250;
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SampleOrderForm>({
    resolver: zodResolver(sampleOrderSchema),
    defaultValues: { samples: ['elite', 'blend', 'mocco'] },
  });

  const samples = watch('samples') || [];

  const onSubmit = handleSubmit(async (data) => {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ formType: 'sample-order', perSample: SAMPLE_GRAMS, ...data }),
    });
    reset();
    onSuccess();
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-card bg-white/[0.06] backdrop-blur-md border border-white/15 p-6 sm:p-8"
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
        <div>
          <h3 className="text-xl font-bold">Выберите сорта</h3>
          <p className="mt-1.5 text-sm text-white/70">
            Каждый образец — пакет 250 г. Отметьте сорта, которые хотите попробовать
          </p>

          <Controller
            control={control}
            name="samples"
            render={({ field }) => (
              <div className="mt-5 flex flex-col gap-3">
                {PRODUCTS.map((p) => {
                  const checked = field.value?.includes(p.key);
                  return (
                    <label
                      key={p.key}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3.5 rounded-card border-2 cursor-pointer transition-colors',
                        checked
                          ? 'bg-white/12 border-era-gold'
                          : 'bg-white/[0.04] border-white/15 hover:bg-white/[0.08]',
                      )}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={!!checked}
                        onChange={(e) => {
                          const next = e.target.checked
                            ? [...(field.value || []), p.key]
                            : (field.value || []).filter((v) => v !== p.key);
                          field.onChange(next);
                        }}
                      />
                      <span
                        className={cn(
                          'w-6 h-6 rounded-md flex items-center justify-center shrink-0 border-2 transition-colors',
                          checked
                            ? 'bg-era-gold border-era-gold text-era-dark'
                            : 'border-white/40',
                        )}
                      >
                        {checked && <CheckIcon className="w-4 h-4" />}
                      </span>
                      <span className={`w-3 h-3 rounded-full ${COLOR_DOT[p.color]}`} />
                      <span className="font-semibold flex-1">{p.name}</span>
                      <span className="text-xs text-white/60 font-medium">250 г</span>
                    </label>
                  );
                })}
              </div>
            )}
          />
          {errors.samples && (
            <span className="mt-2 inline-block text-xs text-era-gold">
              {errors.samples.message as string}
            </span>
          )}

          <div className="mt-5 rounded-card bg-white/8 border border-white/10 px-4 py-3 text-sm text-white/85">
            Итого: <strong>{samples.length}</strong>{' '}
            {pluralRu(samples.length, ['сорт', 'сорта', 'сортов'])} по 250 г ·{' '}
            <strong>{SAMPLE_GRAMS * samples.length} г</strong> всего ·{' '}
            <span className="text-era-gold font-semibold">бесплатно</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">Куда отправить</h3>
          <FieldWrapper label="Имя" htmlFor="so-name" error={errors.name?.message} onDark>
            <TextInput
              id="so-name"
              onDark
              placeholder="Как к вам обращаться"
              autoComplete="name"
              {...register('name')}
            />
          </FieldWrapper>
          <FieldWrapper label="Телефон" htmlFor="so-phone" error={errors.phone?.message} onDark>
            <TextInput
              id="so-phone"
              onDark
              inputMode="tel"
              placeholder="+7 ___ ___ __ __"
              autoComplete="tel"
              {...register('phone')}
            />
          </FieldWrapper>

          <ConsentCheckbox
            id="so-consent"
            error={errors.consent?.message}
            onDark
            registered={register('consent')}
          />

          <button type="submit" disabled={isSubmitting} className="btn-white mt-2">
            {isSubmitting ? 'Отправляем…' : 'Заказать пробник бесплатно'}
          </button>
        </div>
      </div>
    </form>
  );
}

function tierIndex(kg: number): number {
  if (kg < 3) return 0;
  if (kg < 10) return 1;
  if (kg < 30) return 2;
  if (kg < 50) return 3;
  return 4;
}

function CalculatorTab({ onSuccess }: { onSuccess: () => void }) {
  const [productKey, setProductKey] = useState<ProductKey>('elite');
  const [kg, setKg] = useState(10);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<CalculatorForm>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: { product: 'elite', kg: 10 },
  });

  const tier = tierIndex(kg);
  const product = PRODUCTS.find((p) => p.key === productKey)!;
  const pricePerKg = PRICING[productKey][tier];
  const retailPerKg = PRICING[productKey][0];
  const totalPrice = pricePerKg * kg;
  const savedPerKg = retailPerKg - pricePerKg;
  const savedTotal = savedPerKg * kg;
  const discountPct = Math.round((savedPerKg / retailPerKg) * 100);
  // Кофе фасуется только в пакеты по 1 кг → пачек = кг
  const packs = kg;

  const onSubmit = handleSubmit(async (data) => {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        formType: 'wholesale-calc',
        ...data,
        pricePerKg,
        totalPrice,
        tier: PRICING_TIERS[tier].label,
      }),
    });
    reset();
    onSuccess();
  });

  const handleProduct = (key: ProductKey) => {
    setProductKey(key);
    setValue('product', key, { shouldValidate: true });
  };
  const handleKg = (v: number) => {
    const clamped = Math.max(1, Math.min(1000, v));
    setKg(clamped);
    setValue('kg', clamped, { shouldValidate: true });
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-card bg-white/[0.06] backdrop-blur-md border border-white/15 p-6 sm:p-8"
    >
      <input type="hidden" {...register('product')} value={productKey} />
      <input type="hidden" {...register('kg')} value={kg} />

      <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-10">
        <div className="space-y-7">
          <div>
            <h3 className="text-xl font-bold">1. Кофе</h3>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {PRODUCTS.map((p) => (
                <button
                  type="button"
                  key={p.key}
                  onClick={() => handleProduct(p.key)}
                  className={cn(
                    'group relative rounded-card border-2 px-3 py-4 text-left transition-all',
                    productKey === p.key
                      ? `bg-white text-era-dark ${COLOR_BORDER[p.color]}`
                      : 'bg-white/[0.05] border-white/15 hover:bg-white/[0.1] text-white',
                  )}
                >
                  <span className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full ${COLOR_DOT[p.color]}`} />
                  <span className="block text-xs uppercase tracking-wider opacity-65">
                    {p.subtitle.split(' ').slice(0, 2).join(' ')}
                  </span>
                  <span className="mt-1 block font-bold text-sm sm:text-base leading-tight">
                    {p.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <h3 className="text-xl font-bold">2. Объём заказа</h3>
              <span className="text-xs text-white/55">фасовка — пакеты по 1 кг</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleKg(kg - 1)}
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white text-xl leading-none transition-colors"
                  aria-label="Минус 1 кг"
                >
                  −
                </button>
                <div className="flex items-baseline gap-1.5 px-3 py-2 rounded-btn bg-white text-era-dark min-w-[110px] justify-center">
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={kg}
                    onChange={(e) => handleKg(Number(e.target.value))}
                    className="w-16 text-center bg-transparent text-2xl font-extrabold tabular-nums focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="text-sm font-semibold opacity-65">кг</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleKg(kg + 1)}
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white text-xl leading-none transition-colors"
                  aria-label="Плюс 1 кг"
                >
                  +
                </button>
              </div>
            </div>

            <input
              type="range"
              min={1}
              max={100}
              value={kg}
              onChange={(e) => handleKg(Number(e.target.value))}
              className="mt-4 w-full accent-era-gold"
              aria-label="Общее количество кг"
            />

            <div className="mt-2 flex justify-between text-[11px] uppercase tracking-wider text-white/55">
              <span>1 кг</span>
              <span>3+</span>
              <span>10+</span>
              <span>30+</span>
              <span>50+</span>
              <span>100+</span>
            </div>

            <div className="mt-5 grid grid-cols-5 gap-1.5">
              {PRICING_TIERS.map((t, i) => (
                <div
                  key={t.label}
                  className={cn(
                    'rounded-md px-2 py-2 text-center text-[11px] uppercase tracking-wide transition-colors',
                    i === tier
                      ? 'bg-era-gold text-era-dark font-bold'
                      : 'bg-white/5 text-white/55',
                  )}
                >
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-card bg-white text-era-dark p-6 sm:p-7 flex flex-col">
          <span className="text-xs uppercase tracking-wider text-era-dark/55">
            {product.name} · {packs} {pluralRu(packs, ['пакет', 'пакета', 'пакетов'])} по 1 кг
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={`tier-${tier}-${productKey}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="mt-3 flex items-baseline gap-2"
            >
              <span className="text-4xl sm:text-5xl font-extrabold text-era-blue tabular-nums">
                {pricePerKg}
              </span>
              <span className="text-lg font-semibold text-era-dark/70">₽/кг</span>
            </motion.div>
          </AnimatePresence>

          {discountPct > 0 && (
            <motion.div
              key={`save-${tier}-${productKey}`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-era-green-light text-era-green text-sm font-bold self-start"
            >
              <span>−{discountPct}% от розницы</span>
              <span className="opacity-65 font-medium">
                ({retailPerKg}₽ → {pricePerKg}₽)
              </span>
            </motion.div>
          )}

          <div className="my-5 h-px bg-era-dark/10" />

          <dl className="space-y-2.5">
            <div className="flex items-baseline justify-between">
              <dt className="text-era-dark/65">Объём заказа</dt>
              <dd className="font-bold tabular-nums">
                {kg} кг · {packs} {pluralRu(packs, ['пакет', 'пакета', 'пакетов'])}
              </dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="text-era-dark/65">Цена за кг</dt>
              <dd className="font-bold text-era-blue tabular-nums">{pricePerKg}₽</dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="text-era-dark/65">Экономия</dt>
              <dd className="font-bold text-era-green tabular-nums">
                {savedTotal > 0 ? `${savedTotal.toLocaleString('ru-RU')}₽` : '—'}
              </dd>
            </div>
            <div className="flex items-baseline justify-between pt-3 border-t border-era-dark/10">
              <dt className="text-era-dark font-semibold">Итого</dt>
              <dd className="text-2xl font-extrabold text-era-dark tabular-nums">
                {totalPrice.toLocaleString('ru-RU')}₽
              </dd>
            </div>
          </dl>

          <div className="mt-6 space-y-3">
            <FieldWrapper label="Имя" htmlFor="cc-name" error={errors.name?.message}>
              <TextInput id="cc-name" placeholder="Как к вам обращаться" autoComplete="name" {...register('name')} />
            </FieldWrapper>
            <FieldWrapper label="Телефон" htmlFor="cc-phone" error={errors.phone?.message}>
              <TextInput
                id="cc-phone"
                inputMode="tel"
                placeholder="+7 ___ ___ __ __"
                autoComplete="tel"
                {...register('phone')}
              />
            </FieldWrapper>
            <ConsentCheckbox
              id="cc-consent"
              error={errors.consent?.message}
              registered={register('consent')}
            />
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? 'Отправляем…' : 'Получить КП на расчёт'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function pluralRu(n: number, forms: [string, string, string]): string {
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (last === 1) return forms[0];
  if (last >= 2 && last <= 4) return forms[1];
  return forms[2];
}
