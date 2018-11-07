FROM nginx
WORKDIR /app
COPY dist/ .
COPY dist/ /usr/share/nginx/html
COPY cbot-nginx.conf /etc/nginx/conf.d/