export const SITE = {
  brand: 'ERA Coffee',
  legalName: 'ООО «Время Кофе»',
  slogan: 'Начни свою эру вкуса',
  domain: 'timetocoffee.ru',
  url: 'https://timetocoffee.ru',
  yearFounded: 2013,
} as const;

export const CONTACTS = {
  phones: [
    { label: '+7 967 066 39 79', href: 'tel:+79670663979' },
  ],
  email: 'info@timetocoffee.ru',
  emailHref: 'mailto:info@timetocoffee.ru',
  site: 'timetocoffee.ru',
  siteHref: 'https://timetocoffee.ru',
  workHours: 'Пн–Пт 9:00–19:00 МСК',
  /** Открывает чат в MAX по номеру телефона. Формат с `+` обязателен. */
  max: 'https://max.ru/+79670663979',
  /** Открывает чат в Telegram по номеру телефона. Работает, если у владельца
   *  включена опция «находить меня по номеру» в настройках приватности. */
  telegram: 'https://t.me/+79670663979',
} as const;

export const COMPANY = {
  name: 'ООО «Время Кофе»',
  okpo: '83112038',
  ogrn: '1267800018287',
  inn: '7805828978',
  kpp: '780501001',
} as const;

export const NAV_LINKS = [
  { label: 'О бренде', href: '#manifesto' },
  { label: 'Продукты', href: '#products' },
  { label: 'Для бизнеса', href: '#segments' },
  { label: 'Цены', href: '#pricing' },
  { label: 'Контакты', href: '#contacts' },
] as const;

export type BusinessType =
  | 'Кофейня'
  | 'Ресторан'
  | 'Отель'
  | 'Офис'
  | 'Event'
  | 'Кейтеринг'
  | 'Другое';

export const BUSINESS_TYPES: BusinessType[] = [
  'Кофейня',
  'Ресторан',
  'Отель',
  'Офис',
  'Event',
  'Кейтеринг',
  'Другое',
];

export type ProductKey = 'elite' | 'blend' | 'mocco';

export interface Product {
  key: ProductKey;
  name: string;
  subtitle: string;
  description: string;
  composition: string;
  roast: string;
  acidity: number;
  bitterness: number;
  descriptors: string[];
  weights: string[];
  color: 'blue' | 'green' | 'purple';
  priceFrom: number;
  priceRetail: number;
  imageBg: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    key: 'elite',
    name: 'Эспрессо elite',
    subtitle: 'Для истинных ценителей',
    description:
      'Стабильный, насыщенный вкус для тех, кто ищет глубину и настоящее кофейное удовольствие',
    composition: '100% арабика, Бразилия, регион Сул-де-Минас',
    roast: 'средняя',
    acidity: 3,
    bitterness: 2,
    descriptors: ['шоколад', 'орехи', 'какао'],
    weights: ['500 г', '1 кг'],
    color: 'blue',
    priceFrom: 1530,
    priceRetail: 2200,
    imageBg: '#1B3A8B',
    image: '/images/elite.jpg',
  },
  {
    key: 'blend',
    name: 'Эспрессо blend',
    subtitle: 'Для любителей вкуса покрепче',
    description:
      'Сбалансированный кофе на каждый день. Отлично подходит для эспрессо, капучино и напитков с молоком',
    composition: '80% арабика Бразилия / 20% робуста Уганда',
    roast: 'средняя',
    acidity: 2,
    bitterness: 3,
    descriptors: ['шоколад', 'орехи'],
    weights: ['500 г', '1 кг'],
    color: 'green',
    priceFrom: 1530,
    priceRetail: 2200,
    imageBg: '#2E7D5B',
    image: '/images/blend.jpg',
  },
  {
    key: 'mocco',
    name: 'Мокко',
    subtitle: 'Для ценителей мягкого вкуса',
    description:
      'Сладкие, сливочные ноты с ароматом карамели, топлёного молока и печенья',
    composition: '100% арабика, Бразилия, регион Сул-де-Минас',
    roast: 'средняя / средне-тёмная',
    acidity: 2,
    bitterness: 3,
    descriptors: ['карамель', 'шоколад', 'кешью'],
    weights: ['500 г', '1 кг'],
    color: 'purple',
    priceFrom: 1360,
    priceRetail: 1900,
    imageBg: '#7B5BA6',
    image: '/images/mocco.jpg',
  },
];

export const PRICING_TIERS = [
  { label: 'Розница', minKg: null },
  { label: 'от 3 кг', minKg: 3 },
  { label: 'от 10 кг', minKg: 10 },
  { label: 'от 30 кг', minKg: 30 },
  { label: 'от 50 кг', minKg: 50 },
] as const;

export const PRICING: Record<ProductKey, number[]> = {
  elite: [2200, 1800, 1710, 1620, 1530],
  blend: [2200, 1800, 1710, 1620, 1530],
  mocco: [1900, 1600, 1520, 1440, 1360],
};

export const FAQ_ITEMS = [
  {
    q: 'Как получить бесплатный пробник?',
    a: 'Оставьте заявку через любую форму на сайте или позвоните нам. Отправим 3 вида кофе по 100 г каждого. Доставка пробника — бесплатно по России.',
  },
  {
    q: 'Какая минимальная партия?',
    a: 'Розница — от 500 г. Оптовые условия начинаются от 3 кг. Для крупных клиентов (от 50 кг) — индивидуальные цены и условия отсрочки.',
  },
  {
    q: 'Как быстро привозите кофе?',
    a: 'По Санкт-Петербургу и Москве — 1–2 рабочих дня после обжарки. По регионам — 3–7 дней транспортной компанией.',
  },
  {
    q: 'Работаете ли с НДС? Можно ли оплатить по безналу?',
    a: 'Да, мы юридическое лицо (ООО «Время Кофе»), работаем с НДС, принимаем безналичный расчёт, предоставляем все закрывающие документы.',
  },
  {
    q: 'Можно ли заказать обжарку под конкретный профиль?',
    a: 'Да, для постоянных клиентов от 30 кг в месяц делаем индивидуальную обжарку под ТЗ. Обсуждается отдельно.',
  },
  {
    q: 'Помогаете ли с настройкой эспрессо-машины?',
    a: 'Да, при заказе от 10 кг наш технолог консультирует по настройке помола, температуры и давления — онлайн или с выездом (в СПб и МО).',
  },
  {
    q: 'Сколько хранится кофе?',
    a: 'Срок годности после обжарки — 12 месяцев в герметичной упаковке. Оптимальный период раскрытия вкуса — 2–8 недель после обжарки.',
  },
  {
    q: 'Поставляете в другие регионы России?',
    a: 'Да, отправляем по всей России транспортными компаниями (СДЭК, ПЭК, Деловые Линии). Стоимость доставки зависит от объёма и расстояния.',
  },
];

export const CLIENTS = [
  { name: 'ВТБ' },
  { name: 'Согласие' },
  { name: 'Big Jack' },
  { name: 'Обеды Смайл' },
];

export const SEGMENTS = [
  { title: 'Кофейни', description: 'Стабильный вкус для постоянных клиентов', icon: 'coffee-cup' },
  { title: 'Рестораны', description: 'Кофе, который достойно завершает обед', icon: 'plate' },
  { title: 'Отели и гостиницы', description: 'Премиальная подача с первого утра', icon: 'bed' },
  { title: 'Офисы', description: 'Энергия команды без компромиссов', icon: 'briefcase' },
  { title: 'Event-мероприятия', description: 'Большие объёмы свежеобжаренного кофе', icon: 'event' },
  { title: 'Кейтеринг', description: 'Гибкие фасовки под любые задачи', icon: 'truck' },
];

export const BENEFITS = [
  {
    title: 'Собственное производство полного цикла',
    description: 'От выбора зелёного зерна до обжарки и фасовки в одних руках',
    icon: 'factory',
  },
  {
    title: '12+ лет экспертизы',
    description: 'Поставляем зелёное зерно и работаем с лучшими фермами мира',
    icon: 'medal',
  },
  {
    title: 'Прямые контракты с фермами',
    description: 'Без посредников, что даёт стабильный вкус и честную цену',
    icon: 'handshake',
  },
  {
    title: 'Свежая обжарка под заказ',
    description: 'Кофе попадает к вам сразу после обжарки, не залёживается на складе',
    icon: 'flame',
  },
  {
    title: 'Зерно категории NY2',
    description: 'Премиальный стандарт качества: не более 4 дефектов на 300 грамм',
    icon: 'badge',
  },
  {
    title: 'Доставка по всей России',
    description: 'Отгружаем партии от 3 кг с гибкими условиями для опта',
    icon: 'truck',
  },
];

export const PROCESS_STEPS = [
  { title: 'Заявка', description: 'Оставляете контакты или звоните напрямую' },
  {
    title: 'Бесплатный пробник',
    description:
      'Отправляем 3 вида кофе для дегустации — или проводим выездную дегустацию для клиентов из Москвы',
    badge: 'или выездная дегустация в Москве',
  },
  { title: 'Договор', description: 'Согласовываем график поставок и условия' },
  { title: 'Свежая обжарка', description: 'Обжариваем зерно под ваш заказ' },
  { title: 'Доставка', description: 'Привозим вовремя по всей России' },
];

export const COMPARE_TABLE = [
  {
    criterion: 'Для какого бизнеса',
    elite: 'Премиум-кофейни, рестораны',
    blend: 'Универсал для любых заведений',
    mocco: 'Кофейни с упором на десертные напитки',
  },
  {
    criterion: 'Вкусовой профиль',
    elite: 'Насыщенный, с кислинкой',
    blend: 'Сбалансированный',
    mocco: 'Мягкий, сладкий',
  },
  {
    criterion: 'С молоком?',
    elite: 'Подходит',
    blend: 'Идеально',
    mocco: 'Идеально',
  },
  {
    criterion: 'Кислотность',
    elite: 'Средняя',
    blend: 'Умеренная',
    mocco: 'Слабая',
  },
  {
    criterion: 'Стоимость от',
    elite: '1530₽/кг',
    blend: '1530₽/кг',
    mocco: '1360₽/кг',
  },
];
