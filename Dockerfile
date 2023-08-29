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

# Install Certbot and dependencies
RUN apk add --no-cache certbot openssl

# Copy built app files
COPY --from=build /srv/app/dist /usr/share/nginx/html

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d

# Expose ports
EXPOSE 80
EXPOSE 443

# Run Certbot to obtain certificates
RUN certbot certonly --webroot -w /usr/share/nginx/html -d www.startrail.com.br,startrail.com.br

# Start Nginx with Certbot certificate
CMD ["nginx", "-g", "daemon off;"]
