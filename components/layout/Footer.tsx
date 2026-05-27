import { Logo } from '@/components/icons/Logo';
import { CONTACTS, NAV_LINKS, SITE } from '@/lib/constants';
import { LEGAL } from '@/lib/legal';

const LEGAL_LINKS = [
  { href: '/privacy', label: 'Политика обработки ПД' },
  { href: '/consent', label: 'Согласие на обработку ПД' },
  { href: '/cookies', label: 'Файлы cookies' },
];

export function Footer() {
  return (
    <footer className="bg-era-dark text-white">
      <div className="container-default py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <Logo variant="white" />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Свежеобжаренный кофе для вашего бизнеса с {SITE.yearFounded} года
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/90">
              Навигация
            </h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-era-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#faq"
                  className="text-sm text-white/70 transition-colors hover:text-era-gold"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/90">
              Контакты
            </h4>
            <ul className="mt-4 space-y-2.5">
              {CONTACTS.phones.map((phone) => (
                <li key={phone.label}>
                  <a
                    href={phone.href}
                    className="text-sm text-white/70 transition-colors hover:text-era-gold"
                  >
                    {phone.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={CONTACTS.emailHref}
                  className="text-sm text-white/70 transition-colors hover:text-era-gold"
                >
                  {CONTACTS.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACTS.siteHref}
                  className="text-sm text-white/70 transition-colors hover:text-era-gold"
                >
                  {CONTACTS.site}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/90">
              Правовая информация
            </h4>
            <ul className="mt-4 space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-era-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 grid gap-6 sm:grid-cols-2">
          <div className="text-xs text-white/55 leading-relaxed space-y-1">
            <p className="font-bold text-white/80 text-[11px] uppercase tracking-wider">
              Реквизиты Оператора
            </p>
            <p>{LEGAL.shortName}</p>
            <p>ИНН {LEGAL.inn} / КПП {LEGAL.kpp}</p>
            <p>ОГРН {LEGAL.ogrn}</p>
            <p>ОКПО {LEGAL.okpo}</p>
          </div>
          <div className="text-xs text-white/55 leading-relaxed">
            <p className="font-bold text-white/80 text-[11px] uppercase tracking-wider">
              Защита персональных данных
            </p>
            <p className="mt-1">
              Данные обрабатываются в соответствии с Федеральным законом № 152-ФЗ
              «О персональных данных». Регистрация в Реестре операторов ПД
              Роскомнадзора: {LEGAL.rknRegNumber}.
            </p>
            <p className="mt-2">
              По вопросам обработки ПД:{' '}
              <a
                href={`mailto:${LEGAL.privacyEmail}`}
                className="text-era-gold hover:underline underline-offset-2"
              >
                {LEGAL.privacyEmail}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/50">
          <span>© 2026 ERA Coffee. Все права защищены.</span>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-era-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
