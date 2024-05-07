#!/bin/sh
echo "Current API_URL: $API_URL"
#sed -i "s|http://localhost:8008|${API_URL}|g" /usr/share/nginx/html/env-config.js

ls -ltra
cd /usr/src/app
ls -ltra

npm install
npm run build

echo "####  Build Complete  ####"

cp -r build/* /usr/share/nginx/html/

cp -f nginx.conf /etc/nginx/nginx.conf
cp -f default.conf /etc/nginx/conf.d/default.conf

echo "####  NGINX READY  ####"
# Start nginx in the foreground
nginx -g 'daemon off;'
