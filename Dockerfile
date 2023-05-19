ARG ALPINE_VERSION=3.16

FROM node:18-alpine${ALPINE_VERSION}
#FROM node:18-alpine3.16

LABEL maintainer="Jalasfot team Bryan Percy William"
LABEL description="GRaphQl and User service"
LABEL version="1.0"

WORKDIR /app

COPY . .

RUN npm install


CMD ["npm", "start"]