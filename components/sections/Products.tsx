'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SectionHeading } from './SectionHeading';
import { ProductCard } from './ProductCard';
import { Modal } from '@/components/ui/Modal';
import { SuccessModal } from '@/components/ui/SuccessModal';
import {
  FieldWrapper,
  TextInput,
  ConsentCheckbox,
} from '@/components/ui/FormField';
import { PRODUCTS, Product } from '@/lib/constants';
import {
  productOrderSchema,
  type ProductOrderForm as ProductOrderFormData,
} from '@/lib/validations';

export function Products() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [success, setSuccess] = useState(false);

  return (
    <section id="products" className="section bg-era-cream relative overflow-hidden">
      <div className="blob top-40 -right-40 w-96 h-96 bg-era-blue-light/70" />
      <div className="container-default relative">
        <SectionHeading
          kicker="— Продуктовая линейка —"
          title="Три характера. Один стандарт качества."
          description="Подберём кофе под концепцию вашего заведения и формат подачи"
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((product, idx) => (
            <ProductCard
              key={product.key}
              product={product}
              index={idx}
              onOrder={(p) => setActiveProduct(p)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mt-14 rounded-card bg-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-8 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_12px_36px_rgba(27,58,139,0.06)]"
        >
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-era-dark">
              Не знаете, какой кофе выбрать?
            </h3>
            <p className="mt-1 text-era-dark/70">
              Закажите бесплатный пробник всех трёх — отправим по 100 г каждого
            </p>
          </div>
          <a href="#sampler" className="btn-primary w-full md:w-auto">
            Заказать пробник
          </a>
        </motion.div>
      </div>

      <Modal
        open={!!activeProduct}
        onClose={() => setActiveProduct(null)}
        title={activeProduct ? `Заказ — ${activeProduct.name}` : ''}
      >
        {activeProduct && (
          <ProductOrderForm
            product={activeProduct}
            onSuccess={() => {
              setActiveProduct(null);
              setSuccess(true);
            }}
          />
        )}
      </Modal>

      <SuccessModal
        open={success}
        onClose={() => setSuccess(false)}
        title="Заявка принята"
        message="Менеджер свяжется с вами в ближайший рабочий час и уточнит детали заказа"
      />
    </section>
  );
}

function ProductOrderForm({
  product,
  onSuccess,
}: {
  product: Product;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductOrderFormData>({
    resolver: zodResolver(productOrderSchema),
    defaultValues: { product: product.name },
  });

  const onSubmit = handleSubmit(async (data) => {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ formType: 'product-order', ...data }),
    });
    onSuccess();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <input type="hidden" {...register('product')} value={product.name} />

      <p className="text-sm text-era-dark/70">
        Оставьте контакты — менеджер уточнит объём, фасовку и условия доставки.
      </p>

      <FieldWrapper label="Имя" htmlFor="po-name" error={errors.name?.message}>
        <TextInput
          id="po-name"
          placeholder="Как к вам обращаться"
          autoComplete="name"
          {...register('name')}
        />
      </FieldWrapper>

      <FieldWrapper label="Телефон" htmlFor="po-phone" error={errors.phone?.message}>
        <TextInput
          id="po-phone"
          inputMode="tel"
          placeholder="+7 ___ ___ __ __"
          autoComplete="tel"
          {...register('phone')}
        />
      </FieldWrapper>

      <FieldWrapper label="Email (опционально)" htmlFor="po-email" error={errors.email?.message}>
        <TextInput
          id="po-email"
          type="email"
          inputMode="email"
          placeholder="you@company.ru"
          autoComplete="email"
          {...register('email')}
        />
      </FieldWrapper>

      <ConsentCheckbox
        id="po-consent"
        error={errors.consent?.message}
        registered={register('consent')}
      />

      <button type="submit" disabled={isSubmitting} className="btn-primary mt-2 w-full">
        {isSubmitting ? 'Отправляем…' : 'Оставить заявку'}
      </button>
    </form>
  );
}
