# build environment
FROM node:13-alpine as build
WORKDIR /srv/app
COPY package.json .
RUN npm install
COPY . .

ENV PATH /app/node_modules/.bin:$PATH
COPY .env /app/.env
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]