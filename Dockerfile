FROM    nginx:latest
EXPOSE  80
COPY     ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY    ./dist /usr/share/nginx/html