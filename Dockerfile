FROM nginx
WORKDIR /app
COPY dist/ .
#COPY dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf