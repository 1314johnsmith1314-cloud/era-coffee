import PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const OUT = path.join(root, 'public', 'era-coffee-price.pdf');

const FONT = '/System/Library/Fonts/Supplemental/Arial.ttf';
const FONT_BOLD = '/System/Library/Fonts/Supplemental/Arial Bold.ttf';

const C = {
  blue: '#1B3A8B',
  gold: '#C9A876',
  dark: '#1A1A2E',
  gray: '#6B6B7B',
  cream: '#F3ECE0',
  line: '#E2D9CB',
  white: '#FFFFFF',
};

const TIERS = ['Розница', 'Опт от 3 кг', 'Опт от 10 кг', 'Опт от 30 кг', 'Опт от 50 кг'];
const PRODUCTS = [
  {
    name: 'Эспрессо elite',
    desc: '100% арабика, Бразилия (Сул-де-Минас). Шоколад, орехи, какао.',
    prices: [2200, 1800, 1710, 1620, 1530],
  },
  {
    name: 'Эспрессо blend',
    desc: '80% арабика Бразилия / 20% робуста Уганда. Шоколад, орехи.',
    prices: [2200, 1800, 1710, 1620, 1530],
  },
  {
    name: 'Мокко',
    desc: '100% арабика, Бразилия. Карамель, шоколад, кешью.',
    prices: [1900, 1600, 1520, 1440, 1360],
  },
];

const doc = new PDFDocument({ size: 'A4', margin: 0 });
doc.pipe(createWriteStream(OUT));
doc.registerFont('r', FONT);
doc.registerFont('b', FONT_BOLD);

const PAGE_W = 595;
const M = 48;
const CW = PAGE_W - M * 2;

/* ─── Header band ─── */
doc.rect(0, 0, PAGE_W, 110).fill(C.blue);
// bean mark
doc.save();
doc.translate(M + 16, 55).rotate(28);
doc.ellipse(0, 0, 12, 17).fill(C.gold);
doc.restore();
doc.font('b').fontSize(26).fillColor(C.white).text('ERA Coffee', M + 44, 32);
doc.font('r').fontSize(11).fillColor(C.gold).text('Начни свою эру вкуса', M + 44, 64);
doc
  .font('r')
  .fontSize(9)
  .fillColor('#C9D4EE')
  .text('Свежеобжаренный зерновой кофе для бизнеса', M + 44, 80);

const today = new Date().toLocaleDateString('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
doc.font('r').fontSize(9).fillColor('#C9D4EE').text(`Прайс действителен с ${today}`, M, 80, {
  width: CW,
  align: 'right',
});

/* ─── Title ─── */
let y = 140;
doc.font('b').fontSize(22).fillColor(C.dark).text('Прайс-лист', M, y);
y += 34;
doc
  .font('r')
  .fontSize(10.5)
  .fillColor(C.gray)
  .text(
    'Кофе фасуется в пакеты по 1 кг. Чем больше объём заказа — тем ниже цена за килограмм. Доставка по всей России, отгрузка от 3 кг.',
    M,
    y,
    { width: CW, lineGap: 2 },
  );
y += 46;

/* ─── Price table ─── */
const col0 = 168; // product name column width
const colW = (CW - col0) / 5;
const rowH = 46;
const headH = 30;

// header
doc.rect(M, y, CW, headH).fill(C.blue);
doc.font('b').fontSize(9.5).fillColor(C.white).text('ПРОДУКТ', M + 12, y + 10);
TIERS.forEach((t, i) => {
  doc
    .font('b')
    .fontSize(8.5)
    .fillColor(C.white)
    .text(t.toUpperCase(), M + col0 + colW * i, y + 11, { width: colW, align: 'center' });
});
y += headH;

PRODUCTS.forEach((p, idx) => {
  if (idx % 2 === 1) doc.rect(M, y, CW, rowH).fill(C.cream);
  doc.font('b').fontSize(12).fillColor(C.blue).text(p.name, M + 12, y + 8, { width: col0 - 16 });
  doc
    .font('r')
    .fontSize(7.5)
    .fillColor(C.gray)
    .text(p.desc, M + 12, y + 25, { width: col0 - 16, lineGap: 1 });
  p.prices.forEach((price, i) => {
    const isLast = i === p.prices.length - 1;
    doc
      .font(isLast ? 'b' : 'r')
      .fontSize(isLast ? 12 : 11)
      .fillColor(isLast ? C.blue : C.dark)
      .text(`${price}`, M + col0 + colW * i, y + 16, { width: colW, align: 'center' });
  });
  doc.moveTo(M, y + rowH).lineTo(M + CW, y + rowH).lineWidth(0.5).stroke(C.line);
  y += rowH;
});

// table border
doc.rect(M, y - rowH * 3 - headH, CW, rowH * 3 + headH).lineWidth(1).stroke(C.line);

y += 8;
doc
  .font('r')
  .fontSize(8.5)
  .fillColor(C.gray)
  .text('Все цены — в рублях за 1 кг, с НДС. Индивидуальные условия — для заказов от 100 кг.', M, y, {
    width: CW,
  });

/* ─── Free sampler highlight ─── */
y += 28;
doc.roundedRect(M, y, CW, 56, 10).fill(C.cream);
doc.save();
doc.roundedRect(M, y, 6, 56, 3).fill(C.gold);
doc.restore();
doc.font('b').fontSize(13).fillColor(C.dark).text('Бесплатный пробник', M + 20, y + 12);
doc
  .font('r')
  .fontSize(10)
  .fillColor(C.gray)
  .text(
    'Закажите 3 сорта по 250 г для дегустации — бесплатно по России. Для Москвы возможна выездная дегустация.',
    M + 20,
    y + 31,
    { width: CW - 40 },
  );
y += 56;

/* ─── Footer ─── */
const footY = 742;
doc.moveTo(M, footY).lineTo(M + CW, footY).lineWidth(0.5).stroke(C.line);

doc.font('b').fontSize(9).fillColor(C.dark).text('Контакты', M, footY + 12);
doc
  .font('r')
  .fontSize(9)
  .fillColor(C.gray)
  .text('+7 967 066 39 79', M, footY + 26)
  .text('info@eracoffee.ru', M, footY + 39)
  .text('eracoffee.ru', M, footY + 52);

doc.font('b').fontSize(9).fillColor(C.dark).text('Реквизиты', M + CW / 2, footY + 12);
doc
  .font('r')
  .fontSize(8)
  .fillColor(C.gray)
  .text('ООО «ГЛОБАЛ БРИДЖ»', M + CW / 2, footY + 26)
  .text('ИНН 9718297403 / КПП 771801001', M + CW / 2, footY + 38)
  .text('ОГРН 1267700179230', M + CW / 2, footY + 50)
  .text('107113, г. Москва, ул. Маленковская, д. 14, к. 3', M + CW / 2, footY + 62, {
    width: CW / 2,
  });

doc.end();
console.log('✓ Wrote', OUT);
