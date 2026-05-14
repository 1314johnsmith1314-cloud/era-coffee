'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SectionHeading } from './SectionHeading';
import {
  FieldWrapper,
  TextInput,
  Textarea,
  ConsentCheckbox,
} from '@/components/ui/FormField';
import { SuccessModal } from '@/components/ui/SuccessModal';
import {
  MaxIcon,
  TelegramIcon,
  PhoneIcon,
  MailIcon,
} from '@/components/icons/SocialIcons';
import { contactsSchema, ContactsForm } from '@/lib/validations';
import { CONTACTS } from '@/lib/constants';

export function Contacts() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactsForm>({ resolver: zodResolver(contactsSchema) });

  const onSubmit = handleSubmit(async (data) => {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ formType: 'contacts', ...data }),
    });
    reset();
    setSuccess(true);
  });

  return (
    <section id="contacts" className="section">
      <div className="container-default">
        <SectionHeading
          kicker="— Контакты —"
          title="Свяжитесь с нами удобным способом"
          align="left"
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-7"
          >
            <div className="space-y-3">
              {CONTACTS.phones.map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  className="flex items-center gap-3 text-lg sm:text-xl text-era-dark hover:text-era-blue transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-era-blue-light flex items-center justify-center text-era-blue shrink-0">
                    <PhoneIcon className="w-5 h-5" />
                  </span>
                  <span className="font-semibold">{p.label}</span>
                </a>
              ))}
              <a
                href={CONTACTS.emailHref}
                className="flex items-center gap-3 text-base sm:text-lg text-era-dark hover:text-era-blue transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-era-blue-light flex items-center justify-center text-era-blue shrink-0">
                  <MailIcon className="w-5 h-5" />
                </span>
                <span className="font-semibold break-all">{CONTACTS.email}</span>
              </a>
              <a
                href={CONTACTS.siteHref}
                className="ml-13 text-sm text-era-dark/65 hover:text-era-blue transition-colors block pl-13"
                style={{ paddingLeft: '3.25rem' }}
              >
                {CONTACTS.site}
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={CONTACTS.max}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-btn bg-gradient-to-br from-[#3D7BFF] to-[#1B3A8B] text-white font-semibold px-5 py-3 transition-transform hover:scale-[1.02]"
                style={{ minHeight: 48 }}
              >
                <MaxIcon className="w-5 h-5" />
                MAX
              </a>
              <a
                href={CONTACTS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-btn bg-[#229ED9] text-white font-semibold px-5 py-3 transition-transform hover:scale-[1.02]"
                style={{ minHeight: 48 }}
              >
                <TelegramIcon className="w-5 h-5" />
                Telegram
              </a>
            </div>

            <div className="text-sm text-era-dark/65 mt-2 border-t border-black/5 pt-5">
              <span className="font-semibold text-era-dark">Время работы:</span>{' '}
              {CONTACTS.workHours}
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-card bg-era-cream p-6 sm:p-8 flex flex-col gap-4"
          >
            <h3 className="text-lg font-bold text-era-dark">Написать нам</h3>

            <FieldWrapper label="Имя" htmlFor="c-name" error={errors.name?.message}>
              <TextInput
                id="c-name"
                placeholder="Как к вам обращаться"
                autoComplete="name"
                {...register('name')}
              />
            </FieldWrapper>

            <FieldWrapper label="Телефон" htmlFor="c-phone" error={errors.phone?.message}>
              <TextInput
                id="c-phone"
                inputMode="tel"
                placeholder="+7 ___ ___ __ __"
                autoComplete="tel"
                {...register('phone')}
              />
            </FieldWrapper>

            <FieldWrapper label="Сообщение" htmlFor="c-msg" error={errors.message?.message}>
              <Textarea
                id="c-msg"
                placeholder="Расскажите о вашем бизнесе и какой кофе ищете"
                {...register('message')}
              />
            </FieldWrapper>

            <ConsentCheckbox
              id="c-consent"
              error={errors.consent?.message}
              registered={register('consent')}
            />

            <button type="submit" disabled={isSubmitting} className="btn-primary mt-1 w-full">
              {isSubmitting ? 'Отправляем…' : 'Отправить'}
            </button>
          </motion.form>
        </div>
      </div>

      <SuccessModal
        open={success}
        onClose={() => setSuccess(false)}
        title="Сообщение отправлено"
        message="Свяжемся в течение рабочего дня"
      />
    </section>
  );
}
