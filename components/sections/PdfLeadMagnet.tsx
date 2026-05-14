'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldWrapper, TextInput, ConsentCheckbox } from '@/components/ui/FormField';
import { SuccessModal } from '@/components/ui/SuccessModal';
import { pdfSchema, PdfForm } from '@/lib/validations';

export function PdfLeadMagnet() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PdfForm>({ resolver: zodResolver(pdfSchema) });

  const onSubmit = handleSubmit(async (data) => {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ formType: 'pdf-price', ...data }),
    });
    reset();
    setSuccess(true);
  });

  return (
    <section id="pdf-magnet" className="section">
      <div className="container-default">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="rounded-card bg-era-blue-light/60 border border-era-blue/15 p-8 sm:p-10 lg:p-14 relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-era-blue/10 blur-3xl pointer-events-none" />

          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="kicker">— Полный прайс —</span>
              <h2 className="h3 mt-3 text-balance">
                Полный прайс с условиями оптовых поставок
              </h2>
              <p className="mt-4 body-text text-era-dark/70">
                Получите PDF на почту — там же график обжарки, условия доставки
                и спецификации для бухгалтерии
              </p>
            </div>

            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
              <FieldWrapper label="Email" htmlFor="pdf-email" error={errors.email?.message}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <TextInput
                    id="pdf-email"
                    type="email"
                    inputMode="email"
                    placeholder="you@company.ru"
                    autoComplete="email"
                    className="flex-1"
                    {...register('email')}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary shrink-0"
                  >
                    {isSubmitting ? 'Отправляем…' : 'Получить прайс PDF'}
                  </button>
                </div>
              </FieldWrapper>
              <ConsentCheckbox
                id="pdf-consent"
                error={errors.consent?.message}
                registered={register('consent')}
              />
              <p className="text-xs text-era-dark/55 mt-1">
                Без спама. Только полезная информация о новых партиях кофе.
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      <SuccessModal
        open={success}
        onClose={() => setSuccess(false)}
        title="Готово"
        message="Прайс уже отправляется на ваш email. Если письмо не пришло через 5 минут — проверьте папку «Спам»."
      />
    </section>
  );
}
