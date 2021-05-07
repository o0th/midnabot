FROM node:16-alpine

ENV NODE_ENV="production"
ENV PORT="3000"
ENV WEBHOOK="https://midnabot.o0th.io"

WORKDIR /usr/src/midnabot

COPY package*.json ./

RUN npm install --only production

COPY . .

CMD ["npm", "start"]
