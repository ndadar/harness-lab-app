FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY server.js ./
COPY test.js ./

EXPOSE 8080

CMD ["node", "server.js"]
