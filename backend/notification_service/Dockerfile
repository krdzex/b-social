FROM node:18.17.0

WORKDIR /usr/src/notification_service

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD [ "npm", "start" ]
