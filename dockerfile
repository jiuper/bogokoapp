# Stage 1: Build
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .
RUN sed -i 's|base: "/bogokoapp"|base: "/"|' vite.config.ts
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:latest

COPY deploy/nginx.conf.template /etc/nginx/templates/
COPY deploy/generate_nginx_config.sh /usr/local/bin/
COPY --from=build /app/dist /usr/share/nginx/html/

RUN apt-get update && apt-get install -y gettext-base certbot && apt-get clean
RUN chmod +x /usr/local/bin/generate_nginx_config.sh

EXPOSE 80
EXPOSE 443

CMD ["generate_nginx_config.sh"]
