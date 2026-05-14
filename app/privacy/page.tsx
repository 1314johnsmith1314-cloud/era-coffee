import type { Metadata } from 'next';
import { COMPANY, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Политика конфиденциальности — ${SITE.brand}`,
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="container-default pt-32 pb-20 max-w-3xl">
      <h1 className="h2">Политика конфиденциальности</h1>
      <p className="mt-2 text-sm text-era-dark/55">
        Действует с 14 мая 2026 года.
      </p>

      <div className="prose prose-neutral mt-8 text-era-dark/80 leading-relaxed space-y-5">
        <p>
          Настоящая Политика разработана {COMPANY.name} (ИНН {COMPANY.inn}, ОГРН{' '}
          {COMPANY.ogrn}, далее — «Оператор») и описывает порядок обработки персональных
          данных пользователей сайта {SITE.domain}.
        </p>

        <h2 className="h3 mt-8">1. Какие данные мы собираем</h2>
        <p>
          При заполнении форм на сайте мы собираем имя, телефон, email и тип бизнеса.
          Эти данные используются исключительно для обработки заявок: отправки прайса,
          пробников, консультаций и заключения договоров.
        </p>

        <h2 className="h3 mt-8">2. Цели обработки</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Связь с пользователем по оставленным заявкам.</li>
          <li>Отправка коммерческих предложений по запросу.</li>
          <li>Учёт и анализ обращений для улучшения сервиса.</li>
        </ul>

        <h2 className="h3 mt-8">3. Хранение и защита</h2>
        <p>
          Данные хранятся на серверах в РФ. Оператор принимает технические и
          организационные меры для защиты от неправомерного доступа.
        </p>

        <h2 className="h3 mt-8">4. Cookie-файлы</h2>
        <p>
          Сайт использует cookie-файлы и системы веб-аналитики (Яндекс.Метрика, Google
          Analytics) для оценки эффективности и улучшения качества сервиса. Вы можете
          отключить cookie в настройках браузера.
        </p>

        <h2 className="h3 mt-8">5. Права пользователя</h2>
        <p>
          Вы вправе запросить удаление или изменение ваших данных, отозвать согласие на
          обработку, направив запрос на{' '}
          <a href="mailto:info@timetocoffee.ru" className="text-era-blue underline">
            info@timetocoffee.ru
          </a>
          .
        </p>

        <h2 className="h3 mt-8">6. Контактная информация</h2>
        <p>
          {COMPANY.name}, ИНН {COMPANY.inn}, КПП {COMPANY.kpp}, ОГРН {COMPANY.ogrn}.
        </p>
      </div>

      <a href="/" className="btn-secondary mt-10 inline-flex">
        ← На главную
      </a>
    </article>
  );
}
