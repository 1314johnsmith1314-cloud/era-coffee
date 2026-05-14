import { Logo } from '@/components/icons/Logo';
import { CONTACTS, COMPANY, NAV_LINKS, SITE } from '@/lib/constants';

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
              Реквизиты
            </h4>
            <ul className="mt-4 space-y-1.5 text-sm text-white/70">
              <li>{COMPANY.name}</li>
              <li>ОКПО {COMPANY.okpo}</li>
              <li>ОГРН {COMPANY.ogrn}</li>
              <li>
                ИНН/КПП {COMPANY.inn} / {COMPANY.kpp}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/50">
          <span>© 2026 ERA Coffee. Все права защищены.</span>
          <a href="/privacy" className="hover:text-era-gold transition-colors">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
