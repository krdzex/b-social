FROM node:18.17.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma generate

COPY migrationentrypoint.sh /migrationentrypoint.sh
RUN chmod +x /migrationentrypoint.sh


EXPOSE 8000

ENTRYPOINT ["/migrationentrypoint.sh"]
