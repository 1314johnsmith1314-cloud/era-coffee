'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, CloseIcon } from '@/components/icons/SocialIcons';

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function SuccessModal({
  open,
  onClose,
  title = 'Спасибо!',
  message = 'Свяжемся в течение рабочего дня',
}: SuccessModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-era-dark/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            className="relative w-full max-w-md bg-white rounded-card p-8 sm:p-10 text-center shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-era-dark/40 hover:text-era-dark hover:bg-era-cream transition-colors"
              aria-label="Закрыть"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
            <div className="mx-auto w-16 h-16 rounded-full bg-era-green/10 flex items-center justify-center">
              <CheckIcon className="w-8 h-8 text-era-green" />
            </div>
            <h3 id="success-title" className="mt-5 text-2xl font-extrabold text-era-dark">
              {title}
            </h3>
            <p className="mt-3 text-era-dark/70">{message}</p>
            <button onClick={onClose} className="btn-primary mt-7 w-full">
              Отлично
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
