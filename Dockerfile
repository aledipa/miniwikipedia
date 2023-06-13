FROM node:20.3

EXPOSE 3000
ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production
RUN npm ci --omit=dev

COPY . .

RUN npm run build

CMD [ "node", "dist/index.js"]