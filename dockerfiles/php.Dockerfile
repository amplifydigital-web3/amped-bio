FROM php:8.1-fpm-alpine

ARG UID=1000
ARG GID=1000

ENV UID=${UID}
ENV GID=${GID}

RUN mkdir -p /var/www/html

WORKDIR /var/www/html

RUN apk add --no-cache git

# Install composer
COPY --from=composer:2.7.9 /usr/bin/composer /usr/local/bin/composer

RUN delgroup dialout

# Add laravel user and group
RUN addgroup -g ${GID} -S laravel && \
    adduser -S -D -H -u ${UID} -G laravel -s /bin/sh laravel

# Update php-fpm configuration to use the laravel user
RUN sed -i "s/^user = www-data/user = laravel/" /usr/local/etc/php-fpm.d/www.conf && \
    sed -i "s/^group = www-data/group = laravel/" /usr/local/etc/php-fpm.d/www.conf && \
    echo "php_admin_flag[log_errors] = on" >> /usr/local/etc/php-fpm.d/www.conf

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

# # Ensure proper permissions for laravel user
# RUN mkdir -p /var/log/apache2 && \
#     mkdir -p /var/www/html/bootstrap/cache

# # Change ownership and permissions of the directories
# RUN chown -R laravel:laravel /var/log/apache2 && \
#     chown -R laravel:laravel /var/www/html && \
#     chmod -R 775 /var/log/apache2 && \
#     chmod -R 775 /var/www/html && \
#     chmod -R 775 /var/www/html/bootstrap/cache

CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]