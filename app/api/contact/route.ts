import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Приём заявок со всех форм сайта.
 *
 * Доставка настраивается через переменные окружения (.env.local):
 *
 *   SMTP (письмо на почту — основной канал):
 *     SMTP_HOST=smtp.yandex.ru
 *     SMTP_PORT=465
 *     SMTP_USER=info@eracoffee.ru
 *     SMTP_PASS=пароль_приложения
 *     SMTP_FROM="ERA Coffee <info@eracoffee.ru>"   (опц., по умолчанию = SMTP_USER)
 *     LEAD_EMAIL_TO=info@eracoffee.ru               (опц., куда слать; по умолч. = SMTP_USER)
 *
 *   Telegram (мгновенные уведомления — опционально, как дубль):
 *     TELEGRAM_BOT_TOKEN=123456:ABC...
 *     TELEGRAM_CHAT_ID=123456789
 *
 * Если ничего не задано — заявка пишется в лог сервера (pm2 logs),
 * чтобы данные не терялись даже без настроенной доставки.
 */

const FORM_LABELS: Record<string, string> = {
  'sample-order': 'Заказ бесплатных образцов',
  'wholesale-calc': 'Расчёт оптовой скидки',
  'pdf-price': 'Запрос прайса (PDF)',
  'product-order': 'Заказ продукта',
  'final-cta': 'Заявка (финальный блок)',
  contacts: 'Сообщение из формы контактов',
  sampler: 'Заявка на пробник',
};

const FIELD_LABELS: Record<string, string> = {
  name: 'Имя',
  phone: 'Телефон',
  email: 'Email',
  businessType: 'Тип бизнеса',
  message: 'Сообщение',
  product: 'Продукт',
  samples: 'Выбранные сорта',
  perSample: 'Объём образца, г',
  kg: 'Объём заказа, кг',
  pricePerKg: 'Цена за кг, ₽',
  totalPrice: 'Итого, ₽',
  tier: 'Тариф',
};

const PRODUCT_LABELS: Record<string, string> = {
  elite: 'Эспрессо elite',
  blend: 'Эспрессо blend',
  mocco: 'Мокко',
};

function formatValue(key: string, value: unknown): string {
  if (Array.isArray(value)) {
    return value.map((v) => PRODUCT_LABELS[String(v)] ?? String(v)).join(', ');
  }
  if (key === 'product') return PRODUCT_LABELS[String(value)] ?? String(value);
  if (typeof value === 'boolean') return value ? 'да' : 'нет';
  return String(value);
}

function buildLines(data: Record<string, unknown>): string[] {
  const skip = new Set(['formType', 'consent']);
  const lines: string[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (skip.has(key)) continue;
    if (value === undefined || value === null || value === '') continue;
    const label = FIELD_LABELS[key] ?? key;
    lines.push(`${label}: ${formatValue(key, value)}`);
  }
  return lines;
}

async function sendEmail(subject: string, text: string) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, LEAD_EMAIL_TO } =
    process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return false;

  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 = SSL, 587 = STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: SMTP_FROM || `ERA Coffee <${SMTP_USER}>`,
    to: LEAD_EMAIL_TO || SMTP_USER,
    replyTo: SMTP_USER,
    subject,
    text,
  });
  return true;
}

async function sendTelegram(text: string) {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return false;
  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        disable_web_page_preview: true,
      }),
    },
  );
  return res.ok;
}

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }

  const formType = String(data.formType ?? 'unknown');
  const title = FORM_LABELS[formType] ?? 'Новая заявка с сайта';
  const subject = `ERA Coffee — ${title}`;
  const lines = buildLines(data);
  const stamp = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
  const text = [`🟦 ${title}`, '', ...lines, '', `Время: ${stamp} (МСК)`, 'Источник: eracoffee.ru'].join('\n');

  const results = await Promise.allSettled([sendEmail(subject, text), sendTelegram(text)]);
  const emailSent = results[0].status === 'fulfilled' && results[0].value === true;
  const tgSent = results[1].status === 'fulfilled' && results[1].value === true;

  // Логируем всегда — резервная копия в pm2 logs, чтобы не потерять заявку,
  // даже если SMTP/Telegram не настроены или дали сбой.
  // eslint-disable-next-line no-console
  console.log('[lead]', JSON.stringify({ formType, emailSent, tgSent, data }));

  for (const r of results) {
    if (r.status === 'rejected') {
      // eslint-disable-next-line no-console
      console.error('[lead] delivery error:', r.reason);
    }
  }

  // Пользователю всегда возвращаем успех: заявка как минимум в логах.
  return NextResponse.json({ ok: true });
}
