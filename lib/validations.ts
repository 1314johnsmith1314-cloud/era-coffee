import { z } from 'zod';

const nameSchema = z
  .string()
  .min(2, 'Минимум 2 символа')
  .max(60, 'Максимум 60 символов');

const phoneSchema = z
  .string()
  .min(10, 'Введите корректный телефон')
  .regex(/^[\d\s()+\-]+$/, 'Только цифры и знаки + ( ) -');

const emailSchema = z.string().email('Введите корректный email');

const businessTypeSchema = z.enum([
  'Кофейня',
  'Ресторан',
  'Отель',
  'Офис',
  'Event',
  'Кейтеринг',
  'Другое',
]);

export const samplerSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  businessType: businessTypeSchema,
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Требуется согласие' }),
  }),
});
export type SamplerForm = z.infer<typeof samplerSchema>;

export const sampleOrderSchema = z.object({
  samples: z
    .array(z.enum(['elite', 'blend', 'mocco']))
    .min(1, 'Выберите хотя бы один сорт'),
  perSample: z.enum(['100', '200', '500']),
  name: nameSchema,
  phone: phoneSchema,
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Требуется согласие' }),
  }),
});
export type SampleOrderForm = z.infer<typeof sampleOrderSchema>;

export const calculatorSchema = z.object({
  product: z.enum(['elite', 'blend', 'mocco']),
  pack: z.enum(['500', '1000']),
  kg: z.coerce.number().min(1).max(1000),
  name: nameSchema,
  phone: phoneSchema,
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Требуется согласие' }),
  }),
});
export type CalculatorForm = z.infer<typeof calculatorSchema>;

export const pdfSchema = z.object({
  email: emailSchema,
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Требуется согласие' }),
  }),
});
export type PdfForm = z.infer<typeof pdfSchema>;

export const productOrderSchema = z.object({
  product: z.string(),
  name: nameSchema,
  phone: phoneSchema,
  email: z.string().email('Введите корректный email').optional().or(z.literal('')),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Требуется согласие' }),
  }),
});
export type ProductOrderForm = z.infer<typeof productOrderSchema>;

export const finalCtaSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  businessType: businessTypeSchema,
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Требуется согласие' }),
  }),
});
export type FinalCtaForm = z.infer<typeof finalCtaSchema>;

export const contactsSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  message: z.string().min(10, 'Сообщение слишком короткое').max(1000, 'Слишком длинное сообщение'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Требуется согласие' }),
  }),
});
export type ContactsForm = z.infer<typeof contactsSchema>;
