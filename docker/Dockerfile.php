FROM php:8.1

RUN apt-get update -y
RUN apt-get install -y unzip libpq-dev libcurl4-gnutls-dev
RUN docker-php-ext-install pdo pdo_mysql bcmath ext-zip ext-gd

RUN pecl install -o -f redis \
    && rm -rf /tmp/pear \
    && docker-php-ext-enable redis

WORKDIR /app
COPY . .

COPY --from=composer:2.3.5 /usr/bin/composer /usr/bin/composer
COPY ../docker/entrypoint.dev.sh /entrypoint.dev.sh

RUN chmod +x /entrypoint.dev.sh

ENV PORT=8000
ENTRYPOINT [ "/entrypoint.dev.sh" ]