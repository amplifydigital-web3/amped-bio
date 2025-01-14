FROM php:8.1-fpm-alpine

ARG UID
ARG GID

ENV UID=${UID}
ENV GID=${GID}

RUN mkdir -p /var/www/html

WORKDIR /var/www/html

RUN apk add --no-cache git

# Install composer
COPY --from=composer:2.7.9 /usr/bin/composer /usr/local/bin/composer

# Install build dependencies
RUN apk add --no-cache autoconf g++ make

# Install dependencies
RUN apk add --no-cache \
    unzip \
    libpq \
    libcurl \
    libpng-dev \
    jpeg-dev \
    freetype-dev \
    libzip-dev

# Configure and install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install pdo pdo_mysql bcmath zip gd && \
    pecl install -o -f redis && \
    rm -rf /tmp/pear && \
    docker-php-ext-enable redis

EXPOSE 9000
CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]