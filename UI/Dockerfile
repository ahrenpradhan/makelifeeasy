FROM node:8-alpine

ENV NODE_ENV=development app="/home/app"

WORKDIR "$app"

COPY ["/package.json", "/yarn.lock", "/startup.sh", "$app/"]

RUN apk update && \
    yarn install && \
    yarn cache clean

COPY ["/public", "$app/public/"]

COPY ["/src", "$app/src/"]

EXPOSE 3000

RUN sed -i 's/\r$//' $app/startup.sh  && \
    chmod +x $app/startup.sh

ENTRYPOINT  $app/startup.sh