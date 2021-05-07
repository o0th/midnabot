FROM node:16-alpine

WORKDIR /usr/src/midnabot

COPY package*.json ./

RUN npm install --only production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
