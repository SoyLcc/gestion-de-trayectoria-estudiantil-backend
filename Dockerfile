FROM node:current-alpine

RUN mkdir -p /home/projects/gestion-de-trayectoria-estudiantil-backend/node_modules && chown -R node:node /home/projects/gestion-de-trayectoria-estudiantil-backend

WORKDIR /home/projects/gestion-de-trayectoria-estudiantil-backend

COPY package.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "app.js" ]