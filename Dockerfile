FROM node:16-alpine

WORKDIR /usr/src/midnabot

COPY package*.json ./

RUN npm install --only production

COPY . .

CMD ["npm", "start"]
