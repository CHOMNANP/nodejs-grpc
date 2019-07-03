FROM node:latest

COPY . "/app/$PROJECT"

WORKDIR "/app/$PROJECT"
ADD package.json /app/

RUN yarn install

EXPOSE $NODE_PORT
CMD [ "node", "server.js" ]
