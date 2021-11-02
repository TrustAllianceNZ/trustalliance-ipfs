FROM mhart/alpine-node:16 as build-deps
RUN apk add --no-cache git
RUN apk add --no-cache python2
RUN apk add --no-cache make

# set working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

EXPOSE 8080
CMD ["yarn","start"]