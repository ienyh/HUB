FROM node:18

ENV NODE_ENV=${NODE_ENV}

ARG NODE_ENV=production

WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npm run buid
COPY dist /app

EXPOSE 1300

CMD ["npm", "run", "start:prod"]