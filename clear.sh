#!/bin/bash

cd ./linkstack

php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

rm -f storage/logs/*.log
rm -f storage/framework/sessions/*
rm -f storage/framework/cache/data/*
rm -f storage/framework/views/*

rm -rf public
rm -rf node_modules
rm -rf bootstrap/cache/*

echo "Clear done!"