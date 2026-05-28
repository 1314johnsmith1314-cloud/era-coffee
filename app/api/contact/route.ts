import { NextResponse } from 'next/server';

/**
 * Заглушка для приёма заявок с форм.
 *
 * Чтобы подключить реальную отправку (например, через Resend):
 *
 *   1. npm install resend
 *   2. Добавить в .env.local:
 *        RESEND_API_KEY=re_xxx
 *        CONTACT_EMAIL_TO=info@eracoffee.ru
 *   3. Раскомментировать блок ниже и удалить console.log.
 *
 *   import { Resend } from 'resend';
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({
 *     from: 'ERA Coffee <noreply@eracoffee.ru>',
 *     to: process.env.CONTACT_EMAIL_TO!,
 *     subject: `Заявка с сайта — ${data.formType}`,
 *     text: JSON.stringify(data, null, 2),
 *   });
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // eslint-disable-next-line no-console
    console.log('[contact-form]', body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }
}
