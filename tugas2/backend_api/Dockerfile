FROM node:20-alpine
COPY cat .env
COPY package.json .
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
CMD ["node", "index.js"]