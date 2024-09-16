FROM php:8.1

RUN apt-get update -y && \
    apt-get install -y unzip libpq-dev libcurl4-gnutls-dev libpng-dev libjpeg-dev libfreetype6-dev libzip-dev

RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install pdo pdo_mysql bcmath zip gd

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