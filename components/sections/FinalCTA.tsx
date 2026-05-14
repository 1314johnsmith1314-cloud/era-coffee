'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FieldWrapper,
  TextInput,
  SelectInput,
  ConsentCheckbox,
} from '@/components/ui/FormField';
import { SuccessModal } from '@/components/ui/SuccessModal';
import { CoffeeBean } from '@/components/icons/SocialIcons';
import { finalCtaSchema, FinalCtaForm } from '@/lib/validations';
import { BUSINESS_TYPES } from '@/lib/constants';

export function FinalCTA() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FinalCtaForm>({ resolver: zodResolver(finalCtaSchema) });

  const onSubmit = handleSubmit(async (data) => {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ formType: 'final-cta', ...data }),
    });
    reset();
    setSuccess(true);
  });

  return (
    <section
      id="final-cta"
      className="relative section overflow-hidden text-white"
      style={{
        background:
          'linear-gradient(135deg, #1B3A8B 0%, #3D2817 100%)',
      }}
    >
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.06] pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <CoffeeBean
            key={i}
            className="absolute text-white"
            style={{
              width: `${24 + (i % 5) * 14}px`,
              height: `${24 + (i % 5) * 14}px`,
              top: `${(i * 41) % 100}%`,
              left: `${(i * 67) % 100}%`,
              transform: `rotate(${(i * 53) % 360}deg)`,
            }}
          />
        ))}
      </div>

      <div className="container-default relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="kicker text-era-gold">— Время действовать —</span>
          <h2 className="h2 mt-3 text-white">Готовы начать свою эру вкуса?</h2>
          <p className="mt-5 body-text text-white/85">
            Оставьте заявку — пришлём прайс, рекомендации и бесплатный пробник
            в течение рабочего дня
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          noValidate
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 max-w-2xl mx-auto rounded-card bg-white/[0.07] backdrop-blur-md border border-white/15 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <FieldWrapper label="Имя" htmlFor="fc-name" error={errors.name?.message} onDark>
            <TextInput
              id="fc-name"
              onDark
              placeholder="Как к вам обращаться"
              autoComplete="name"
              {...register('name')}
            />
          </FieldWrapper>

          <FieldWrapper label="Телефон" htmlFor="fc-phone" error={errors.phone?.message} onDark>
            <TextInput
              id="fc-phone"
              onDark
              inputMode="tel"
              placeholder="+7 ___ ___ __ __"
              autoComplete="tel"
              {...register('phone')}
            />
          </FieldWrapper>

          <FieldWrapper label="Email" htmlFor="fc-email" error={errors.email?.message} onDark>
            <TextInput
              id="fc-email"
              type="email"
              inputMode="email"
              onDark
              placeholder="you@company.ru"
              autoComplete="email"
              {...register('email')}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Тип бизнеса"
            htmlFor="fc-business"
            error={errors.businessType?.message}
            onDark
          >
            <SelectInput
              id="fc-business"
              onDark
              defaultValue=""
              {...register('businessType')}
            >
              <option value="" disabled className="text-era-dark">
                Выберите
              </option>
              {BUSINESS_TYPES.map((b) => (
                <option key={b} value={b} className="text-era-dark">
                  {b}
                </option>
              ))}
            </SelectInput>
          </FieldWrapper>

          <div className="md:col-span-2 flex flex-col gap-4">
            <ConsentCheckbox
              id="fc-consent"
              error={errors.consent?.message}
              onDark
              registered={register('consent')}
            />
            <button type="submit" disabled={isSubmitting} className="btn-white w-full">
              {isSubmitting ? 'Отправляем…' : 'Отправить заявку'}
            </button>
          </div>
        </motion.form>
      </div>

      <SuccessModal
        open={success}
        onClose={() => setSuccess(false)}
        title="Заявка принята"
        message="Менеджер свяжется в течение рабочего дня и пришлёт прайс с рекомендациями"
      />
    </section>
  );
}
