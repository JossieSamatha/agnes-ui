FROM nginx

ADD dist /usr/share/nginx/html/dist
ADD nginx /etc/nginx/conf.d/