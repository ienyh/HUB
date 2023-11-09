FROM node:18

ENV NODE_ENV=${NODE_ENV}

ARG NODE_ENV=production

WORKDIR /app
COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm install
COPY . .
RUN npm run build

EXPOSE 1300

CMD ["node", "dist/main.js"]