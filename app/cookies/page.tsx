import type { Metadata } from 'next';
import {
  LegalPageLayout,
  LegalSection,
  LegalList,
} from '@/components/layout/LegalPageLayout';
import { LEGAL } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Политика использования файлов cookies — ERA Coffee',
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title="Политика использования файлов cookies"
      subtitle={`Документ описывает, какие файлы cookies использует сайт ${LEGAL.domain}, с какой целью и каким образом пользователь может управлять их использованием.`}
      effectiveDate={LEGAL.effectiveDate}
    >
      <LegalSection id="what" number={1} title="Что такое cookies">
        <p>
          Cookies (файлы cookies) — это небольшие текстовые файлы, которые веб-сайт
          сохраняет на устройстве посетителя (компьютере, смартфоне, планшете) при
          посещении сайта или его отдельных страниц. Cookies позволяют сайту запомнить
          действия и предпочтения пользователя (например, выбор языка, размер шрифта,
          принятое согласие на использование cookies), чтобы пользователю не приходилось
          задавать их при каждом посещении.
        </p>
        <p>
          Использование файлов cookies на территории Российской Федерации регулируется
          Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных», а также
          разъяснениями Роскомнадзора в части обработки идентификаторов пользователей.
        </p>
      </LegalSection>

      <LegalSection id="why" number={2} title="Зачем мы используем cookies">
        <p>Сайт {LEGAL.domain} использует cookies для следующих целей:</p>
        <LegalList>
          <li>
            обеспечение базовой работоспособности и безопасности Сайта (сохранение
            принятого согласия, защита от повторной отправки форм, балансировка нагрузки);
          </li>
          <li>
            сохранение пользовательских предпочтений и настроек интерфейса;
          </li>
          <li>
            сбор обезличенной статистики посещаемости и поведения пользователей для
            улучшения качества сервиса;
          </li>
          <li>
            анализ эффективности маркетинговых кампаний (только при наличии явного
            согласия пользователя).
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection id="types" number={3} title="Какие cookies мы используем">
        <h3 className="font-bold text-lg mt-2">3.1. Строго необходимые (technical)</h3>
        <p>
          Эти cookies необходимы для работы Сайта и не могут быть отключены без потери
          работоспособности. Они не идентифицируют пользователя лично и не используются
          для маркетинговых целей.
        </p>
        <LegalList>
          <li>
            <code className="font-mono text-sm bg-era-cream-soft px-1.5 py-0.5 rounded">
              era-cookie-consent
            </code>{' '}
            — хранит выбор пользователя относительно использования cookies (срок — 12 мес.);
          </li>
          <li>сессионные идентификаторы — действительны до закрытия браузера.</li>
        </LegalList>

        <h3 className="font-bold text-lg mt-6">3.2. Аналитические (analytics)</h3>
        <p>
          Эти cookies помогают понять, как посетители взаимодействуют с Сайтом — какие
          страницы наиболее популярны, как пользователи перемещаются по сайту, какие
          ошибки возникают. Данные собираются в обезличенной форме.
        </p>
        <LegalList>
          <li>
            <strong>Яндекс.Метрика</strong> (ООО «Яндекс») — сервис веб-аналитики.
            Серверы расположены на территории РФ. Срок хранения данных — до 25 месяцев.
            Подробнее:{' '}
            <a
              href="https://yandex.ru/legal/confidential/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-era-blue underline underline-offset-2"
            >
              Политика конфиденциальности Яндекса
            </a>
            .
          </li>
          <li>
            <strong>Google Analytics</strong> (Google LLC) — сервис веб-аналитики.
            Передача данных может осуществляться за пределы РФ. Срок хранения данных —
            до 14 месяцев. Подробнее:{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-era-blue underline underline-offset-2"
            >
              Политика конфиденциальности Google
            </a>
            .
          </li>
        </LegalList>

        <h3 className="font-bold text-lg mt-6">3.3. Функциональные (functional)</h3>
        <p>
          Запоминают пользовательские настройки (например, состояние интерфейса
          калькулятора оптовой скидки) для улучшения опыта взаимодействия. Срок хранения
          — до 12 месяцев.
        </p>
      </LegalSection>

      <LegalSection id="management" number={4} title="Как управлять cookies">
        <p>
          При первом посещении Сайта вам отображается информационный баннер с запросом
          согласия на использование cookies. Вы можете принять или отклонить
          использование cookies.
        </p>
        <p>
          В любой момент вы можете изменить свой выбор:
        </p>
        <LegalList>
          <li>
            <strong>Через настройки браузера</strong> — большинство современных браузеров
            (Chrome, Firefox, Safari, Edge, Яндекс.Браузер) позволяют полностью или
            частично запретить сохранение cookies, а также удалить ранее сохранённые
            файлы:
            <ul className="mt-2 ml-5 space-y-1 list-disc">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-era-blue underline underline-offset-2"
                >
                  Инструкция для Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/ru/kb/udalenie-kukov-i-dannyh-sajtov-v-firefox"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-era-blue underline underline-offset-2"
                >
                  Инструкция для Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/ru-ru/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-era-blue underline underline-offset-2"
                >
                  Инструкция для Safari
                </a>
              </li>
              <li>
                <a
                  href="https://yandex.ru/support/browser/personal-data-protection/cookies.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-era-blue underline underline-offset-2"
                >
                  Инструкция для Яндекс.Браузера
                </a>
              </li>
            </ul>
          </li>
          <li>
            <strong>Через cookie-баннер на Сайте</strong> — если вы ранее уже сделали
            выбор, очистите cookies сайта в браузере, и баннер появится повторно при
            следующем посещении.
          </li>
        </LegalList>
        <p>
          <strong>Обратите внимание:</strong> при отключении строго необходимых cookies
          часть функциональности Сайта (включая формы обратной связи) может работать
          некорректно.
        </p>
      </LegalSection>

      <LegalSection id="lifetime" number={5} title="Срок хранения">
        <LegalList>
          <li>
            <strong>Сессионные cookies</strong> — удаляются автоматически при закрытии
            браузера;
          </li>
          <li>
            <strong>Постоянные cookies</strong> — хранятся в течение установленного
            срока (от 30 дней до 25 месяцев в зависимости от назначения) или до их
            удаления пользователем.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection id="related" number={6} title="Связанные документы">
        <p>
          Полная информация об обработке персональных данных, в том числе об
          идентификаторах, получаемых через cookies, приведена в{' '}
          <a href="/privacy" className="text-era-blue underline underline-offset-2">
            Политике обработки персональных данных
          </a>
          .
        </p>
        <p>
          Условия согласия, предоставляемого через формы обратной связи, описаны в{' '}
          <a href="/consent" className="text-era-blue underline underline-offset-2">
            Согласии на обработку персональных данных
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="contacts" number={7} title="Контакты для вопросов">
        <p>
          По вопросам использования cookies и обработки персональных данных вы можете
          обратиться:
        </p>
        <LegalList>
          <li>
            email:{' '}
            <a
              href={`mailto:${LEGAL.privacyEmail}`}
              className="text-era-blue underline underline-offset-2"
            >
              {LEGAL.privacyEmail}
            </a>{' '}
            (с темой «Cookies / ПД»);
          </li>
          <li>почтовый адрес Оператора: {LEGAL.postalAddress}.</li>
        </LegalList>
      </LegalSection>
    </LegalPageLayout>
  );
}
