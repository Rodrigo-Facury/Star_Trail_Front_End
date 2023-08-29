# Build environment
FROM node:14 as build
WORKDIR /srv/app
COPY package.json .
RUN npm install
COPY . .

ENV PATH /srv/app/node_modules/.bin:$PATH
COPY .env /srv/app/.env
RUN npm run build

# Development environment with Vite
FROM node:14 as dev
WORKDIR /srv/app
COPY package.json .
RUN npm install
COPY . .

ENV PATH /srv/app/node_modules/.bin:$PATH
COPY .env /srv/app/.env

# Production environment
FROM nginx:1.16.0-alpine as production
COPY --from=build /srv/app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Install Certbot and configure SSL
RUN apk add --no-cache certbot
RUN mkdir -p /var/www/certbot
RUN certbot certonly --webroot -w /var/www/certbot -d www.startrail.com.br --agree-tos -n --email rodrigo.facury14@gmail.com

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
