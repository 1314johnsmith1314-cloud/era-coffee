# Развёртывание ERA Coffee на Reg.ru (VPS)

Полная пошаговая инструкция: домен `eracoffee.ru` + сайт на VPS Reg.ru,
с Node.js, nginx, бесплатным SSL и почтой. Команды можно копировать как есть.

> **Важно про формы.** Сейчас формы обратной связи отправляются на `/api/contact`,
> который только пишет заявку в лог сервера (`console.log`) и возвращает «успех».
> Чтобы реально получать заявки на почту — см. **Шаг 11**.

---

## Что в итоге получится

```
Посетитель → eracoffee.ru (HTTPS)
            → nginx (80/443, SSL Let's Encrypt)
            → Next.js (next start, порт 3000, под управлением PM2)
```

Ориентировочная стоимость: домен `.ru` ~200–300 ₽/год + VPS ~400–700 ₽/мес.

---

## Шаг 1. Регистрация домена eracoffee.ru

1. Зайдите на [reg.ru](https://www.reg.ru), создайте/войдите в аккаунт.
2. В поиске доменов введите `eracoffee.ru`, добавьте в корзину, оплатите.
3. После оплаты домен появится в разделе **«Мои домены»**.
4. **Пока ничего в DNS не меняйте** — вернёмся к этому в Шаге 8, когда будет
   готов VPS и известен его IP.

---

## Шаг 2. Заказ VPS

1. На Reg.ru: **Услуги → VPS/VDS → Заказать**.
2. Рекомендуемая конфигурация (минимум для сборки Next.js):
   - **CPU:** 2 ядра
   - **RAM:** 2 ГБ (лучше 4 ГБ — сборка Next.js прожорлива по памяти)
   - **Диск:** 20–30 ГБ SSD
   - **ОС:** **Ubuntu 22.04 LTS** (инструкция написана под неё)
3. После создания на почту/в панель придут: **IP-адрес сервера**, логин `root`
   и пароль (или вы зададите SSH-ключ).
4. Запишите IP — он понадобится в Шаге 8.

---

## Шаг 3. Первое подключение по SSH

На Mac откройте Терминал (на Windows — PowerShell):

```bash
ssh root@ВАШ_IP_АДРЕС
```

Введите пароль (символы не отображаются — это нормально). При первом входе
подтвердите `yes`.

Обновите систему и поставьте базовые утилиты:

```bash
apt update && apt upgrade -y
apt install -y git curl ufw
```

Настройте файрвол (откроем SSH и web-порты):

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
```

> `'Nginx Full'` станет доступен после установки nginx (Шаг 5) — если ufw ругается,
> выполните эту строку ещё раз после Шага 5.

---

## Шаг 4. Установка Node.js 20 LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v   # должно показать v20.x
npm -v
```

Установите PM2 (менеджер процессов, который держит сайт запущенным и
перезапускает после ребута):

```bash
npm install -g pm2
```

---

## Шаг 5. Установка nginx

```bash
apt install -y nginx
systemctl enable nginx
systemctl start nginx
```

Проверьте: откройте в браузере `http://ВАШ_IP` — должна быть страница-заглушка nginx.

Если на Шаге 3 ufw не дал добавить `'Nginx Full'` — сделайте сейчас:

```bash
ufw allow 'Nginx Full'
```

---

## Шаг 6. Клонирование проекта и сборка

Репозиторий публичный, поэтому логин не нужен.

```bash
cd /var/www
git clone https://github.com/1314johnsmith1314-cloud/era-coffee.git
cd era-coffee
npm ci          # установка зависимостей строго по package-lock
npm run build   # production-сборка
```

> **Если сборка падает с ошибкой памяти** (`Killed` / `JS heap out of memory`)
> на VPS с 2 ГБ RAM — добавьте swap-файл и повторите `npm run build`:
> ```bash
> fallocate -l 2G /swapfile && chmod 600 /swapfile
> mkswap /swapfile && swapon /swapfile
> echo '/swapfile none swap sw 0 0' >> /etc/fstab
> ```

---

## Шаг 7. Запуск через PM2

```bash
cd /var/www/era-coffee
pm2 start npm --name era-coffee -- start
pm2 save
pm2 startup systemd      # выполните команду, которую PM2 распечатает в ответ
```

Проверьте, что сайт отвечает локально на сервере:

```bash
curl -I http://localhost:3000
```

Должно прийти `HTTP/1.1 200 OK`.

Полезные команды PM2 на будущее:
- `pm2 logs era-coffee` — логи (в т.ч. заявки с форм)
- `pm2 restart era-coffee` — перезапуск
- `pm2 status` — статус

---

## Шаг 8. Привязка домена (DNS в Reg.ru)

1. Reg.ru → **Мои домены → eracoffee.ru → Управление зоной DNS** (или «DNS-серверы и управление зоной»).
2. Убедитесь, что используются **DNS-серверы Reg.ru** (`ns1.reg.ru`, `ns2.reg.ru`).
   Если стоят чужие — переключите на Reg.ru.
3. Удалите дефолтные A/CNAME-записи, ведущие на парковку, и добавьте:

   | Тип | Имя (host) | Значение | 
   |-----|------------|----------|
   | A   | `@`        | `ВАШ_IP_АДРЕС` |
   | A   | `www`      | `ВАШ_IP_АДРЕС` |

4. Сохраните. Распространение DNS — от 15 минут до нескольких часов.

Проверить, что домен указывает на ваш сервер:

```bash
ping eracoffee.ru        # должен отвечать ваш IP
```

---

## Шаг 9. Настройка nginx (reverse proxy)

Создайте конфиг сайта:

```bash
nano /etc/nginx/sites-available/eracoffee.ru
```

Вставьте:

```nginx
server {
    listen 80;
    server_name eracoffee.ru www.eracoffee.ru;

    # отдаём статику Next напрямую (быстрее и кешируется)
    location /_next/static/ {
        alias /var/www/era-coffee/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    client_max_body_size 25M;
}
```

Сохраните (`Ctrl+O`, `Enter`, `Ctrl+X`). Активируйте конфиг:

```bash
ln -s /etc/nginx/sites-available/eracoffee.ru /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t        # проверка синтаксиса — должно быть "ok" и "successful"
systemctl reload nginx
```

Теперь `http://eracoffee.ru` должен открывать сайт (пока без HTTPS).

---

## Шаг 10. Бесплатный SSL (HTTPS) через Let's Encrypt

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d eracoffee.ru -d www.eracoffee.ru
```

Certbot спросит email (для уведомлений), согласие с условиями и предложит
**автоматически перенаправлять HTTP → HTTPS** — выберите **да (2)**.

Сертификат продлевается автоматически. Проверить автопродление:

```bash
certbot renew --dry-run
```

Готово — сайт доступен по `https://eracoffee.ru`.

---

## Шаг 11. Доставка заявок с форм на почту (ВАЖНО)

Код доставки **уже написан** (`app/api/contact/route.ts`) — нужно только задать
переменные окружения. Отправка идёт через **ваш собственный почтовый ящик по
SMTP** (никаких сторонних сервисов). Если переменные не заданы — заявка всё равно
пишется в `pm2 logs` как резервная копия, поэтому ничего не теряется.

Заявка приходит письмом с темой «ERA Coffee — <тип формы>» и аккуратным списком
полей (имя, телефон, тип бизнеса, выбранные сорта, объём, цена и т.д.).

### Настройка SMTP (на примере Яндекс 360)

Сначала заведите ящик `info@eracoffee.ru` (см. Шаг 13), затем:

1. В **Яндекс ID → Безопасность → Пароли приложений** создайте пароль для
   «Почта» (обычный пароль от аккаунта для SMTP не подойдёт).
2. На сервере:
   ```bash
   cd /var/www/era-coffee
   nano .env.local
   ```
   Впишите (значения — пример для Яндекс 360):
   ```
   SMTP_HOST=smtp.yandex.ru
   SMTP_PORT=465
   SMTP_USER=info@eracoffee.ru
   SMTP_PASS=пароль_приложения
   SMTP_FROM=ERA Coffee <info@eracoffee.ru>
   LEAD_EMAIL_TO=info@eracoffee.ru
   ```
   > Для почты Reg.ru параметры аналогичны — host/порт берутся из панели почты Reg.ru.
3. Пересоберите и перезапустите:
   ```bash
   npm run build && pm2 restart era-coffee
   ```
4. Отправьте тестовую заявку с сайта — письмо должно прийти на `info@eracoffee.ru`.
   Если не пришло — смотрите `pm2 logs era-coffee` (там будет строка `[lead] ...`
   и текст ошибки доставки, если она была).

### Мгновенные уведомления в Telegram (по желанию)

Чтобы дополнительно получать заявки в Telegram (приходят моментально):

1. Напишите [@BotFather](https://t.me/BotFather) → `/newbot` → получите токен.
2. Узнайте свой `chat_id` (например, через бота [@userinfobot](https://t.me/userinfobot)).
3. Добавьте в `.env.local`:
   ```
   TELEGRAM_BOT_TOKEN=токен_бота
   TELEGRAM_CHAT_ID=ваш_chat_id
   ```
4. `npm run build && pm2 restart era-coffee`.

> Можно использовать оба канала сразу (почта + Telegram) или только один.

---

## Шаг 12. Аналитика (опционально)

Чтобы подключить Яндекс.Метрику и/или Google Analytics, впишите ID в `.env.local`:

```
NEXT_PUBLIC_YANDEX_METRIKA_ID=ваш_номер_счётчика
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Затем `npm run build && pm2 restart era-coffee`. Если переменные не заданы —
счётчики просто не подключаются, сайт работает как обычно.

---

## Шаг 13. Корпоративная почта info@eracoffee.ru

Вариант А — почта от Reg.ru (платно, но просто):
- Reg.ru → **Почта → Подключить** для домена eracoffee.ru, далее по мастеру.

Вариант Б — **Яндекс 360 для бизнеса** (есть бесплатный тариф):
1. [360.yandex.ru/business](https://360.yandex.ru/business) → добавить домен `eracoffee.ru`.
2. Яндекс выдаст **MX, TXT (SPF), DKIM** записи — добавьте их в DNS-зону Reg.ru
   (тот же раздел, что в Шаге 8). Типичный MX:

   | Тип | Имя | Значение | Приоритет |
   |-----|-----|----------|-----------|
   | MX  | `@` | `mx.yandex.net.` | 10 |
   | TXT | `@` | `v=spf1 redirect=_spf.yandex.net` | — |

3. Создайте ящик `info@eracoffee.ru` в панели Яндекс 360.

> MX-записи на работу самого сайта не влияют — это отдельный канал для почты.

---

## Обновление сайта в будущем

Когда я (или вы) пушите изменения в GitHub, на сервере достаточно:

```bash
cd /var/www/era-coffee
git pull
npm ci
npm run build
pm2 restart era-coffee
```

Можно завести скрипт `deploy.sh` с этими командами, чтобы запускать одной строкой.

---

## Финальный чеклист

- [ ] Домен `eracoffee.ru` оплачен на Reg.ru
- [ ] VPS (Ubuntu 22.04, 2+ ГБ RAM) создан, есть IP
- [ ] Node.js 20, nginx, PM2 установлены
- [ ] Репозиторий склонирован, `npm run build` прошёл
- [ ] PM2 держит `era-coffee` (порт 3000), `pm2 save` сделан
- [ ] DNS A-записи `@` и `www` → IP VPS
- [ ] nginx-конфиг активен, `nginx -t` без ошибок
- [ ] SSL выпущен (`https://eracoffee.ru` открывается с замком)
- [ ] (для лидов) Resend подключён, формы шлют на info@eracoffee.ru
- [ ] (опц.) Метрика/GA ID прописаны
- [ ] (опц.) Почта info@eracoffee.ru настроена

---

## Если что-то не работает

| Симптом | Что проверить |
|---------|---------------|
| `502 Bad Gateway` | Запущен ли PM2: `pm2 status`. Жив ли порт: `curl -I localhost:3000` |
| Домен не открывается | DNS ещё не распространился (подождите) / правильный ли IP в A-записи |
| SSL не выпускается | Домен уже должен указывать на сервер (Шаг 8 до Шага 10) |
| Сборка падает (`Killed`) | Мало RAM — добавьте swap (см. Шаг 6) |
| Формы не приходят | Сейчас это ожидаемо — нужен Шаг 11 (Resend) |
