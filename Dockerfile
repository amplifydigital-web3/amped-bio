ARG NODE_VERSION=22.11.0

# Etapa 1: Usar a imagem do Node.js para copiar arquivos necessários
FROM node:${NODE_VERSION}-alpine AS node

# Etapa 2: Construir a imagem final
FROM alpine:3.19.0 AS build
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
    npm \
    bash \
    python3 py3-pip make \
    && mkdir /htdocs

COPY linkstack /htdocs
COPY --from=composer /usr/bin/composer /bin/composer
COPY ./linkstack/composer.json /htdocs/

RUN chown -R apache:apache /htdocs

COPY --chmod=0755 docker-entrypoint.sh /usr/local/bin/

# For debugging
# RUN chown -R root:root /var/www/logs
# RUN chown -R root:root /var/log/apache2/
# RUN chmod 777 -R /var/log/apache2/
# RUN chown -R root:root /htdocs/storage
# RUN chmod 777 -R /htdocs/storage

# For production
RUN chown -R apache:apache /var/www/logs
RUN chown -R apache:apache /var/log/apache2/
RUN echo "Mutex posixsem" >> /etc/apache2/apache2.conf

RUN cd /htdocs && composer install --no-interaction

# Copy Node.js from the node stage
COPY --from=node /usr/local/bin /usr/local/bin
COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include

# Set correct permissions for Node.js files
RUN chown -R apache:apache /usr/local/bin /usr/lib /usr/local/lib /usr/local/include

# Install Yarn
# RUN npm install -g yarn

# Use Yarn to install dependencies and run development server
# RUN cd /htdocs && yarn install \
#     && yarn run dev

# RUN mkdir -p /htdocs/js/components
# RUN cp /htdocs/public/js/components/node_modules*.js /htdocs/js/components/

# fixed in PR #17
# RUN mkdir -p /htdocs/js/
# RUN cp /htdocs/public/js/node_modules*.js /htdocs/js/

# RUN npm run production

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