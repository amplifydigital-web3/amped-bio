# Stage 1: Build Node dependencies and widget
FROM node:22.11-alpine AS build-react-widget

RUN apk --no-cache --update \
    add build-base \
    python3 py3-pip make

WORKDIR /build

# Copy necessary files for building
COPY linkstack/react-widget ./
WORKDIR /build/react-widget

RUN yarn install
RUN yarn run build:widget:production

# Debugging step to list files in the build directory
RUN ls -la /build/react-widget

# Ensure the dist directory is created
RUN if [ ! -d "dist" ]; then echo "Build failed, dist directory not found"; exit 1; fi

# Stage 2: Main image
FROM alpine:3.19.0
LABEL maintainer="VietLe"
LABEL description="Onelink Docker"

# Setup apache and php
RUN apk --no-cache --update \
    add apache2 \
    apache2-ssl \
    curl \
    php82-apache2 \
    php82-bcmath \
    php82-bz2 \
    php82-calendar \
    php82-common \
    php82-ctype \
    php82-curl \
    php82-dom \
    php82-fileinfo \
    php82-gd \
    php82-iconv \
    php82-json \
    php82-mbstring \
    php82-mysqli \
    php82-mysqlnd \
    php82-opcache \
    php82-openssl \
    php82-pdo_mysql \
    php82-pdo_pgsql \
    php82-pdo_sqlite \
    php82-phar \
    php82-session \
    php82-xml \
    php82-tokenizer \
    php82-zip \
    php82-xmlwriter \
    php82-redis \
    tzdata \
    bash \
    && mkdir /htdocs

# Copy application files
COPY linkstack /htdocs
RUN rm -rf /htdocs/react-widget
COPY --from=build-react-widget /build/react-widget/dist /htdocs/react-widget/dist
COPY --from=composer /usr/bin/composer /bin/composer
COPY ./linkstack/composer.json /htdocs/

RUN chown -R apache:apache /htdocs

COPY --chmod=0755 docker-entrypoint.sh /usr/local/bin/

# For production
RUN chown -R apache:apache /var/www/logs
RUN chown -R apache:apache /var/log/apache2/
RUN echo "Mutex posixsem" >> /etc/apache2/apache2.conf

RUN cd /htdocs && composer install --no-interaction

COPY configs/apache2/httpd.conf /etc/apache2/httpd.conf
COPY configs/apache2/ssl.conf /etc/apache2/conf.d/ssl.conf
COPY configs/php/php.ini /etc/php82/php.ini

RUN chown apache:apache /etc/ssl/apache2/server.pem
RUN chown apache:apache /etc/ssl/apache2/server.key

USER apache:apache

HEALTHCHECK CMD curl -f http://localhost -A "HealthCheck" || exit 1

# Set console entry path
WORKDIR /htdocs

EXPOSE 8080
CMD ["docker-entrypoint.sh"]