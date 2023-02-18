FROM node:16.15.0-alpine3.15 as build

WORKDIR /app
ARG NPM_TOKEN  
ENV NPM_TOKEN=$NPM_TOKEN
COPY .npmrc package.json package-lock.json ./
RUN npm ci --production && rm -f .npmrc

FROM alpine as prod
RUN apk add --update nodejs npm
WORKDIR /app
COPY --from=build /app /
COPY . .
EXPOSE  3010
CMD ["npm","start"]

