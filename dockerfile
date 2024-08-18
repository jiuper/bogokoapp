# Stage 1: Build
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
