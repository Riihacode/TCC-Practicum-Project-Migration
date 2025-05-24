FROM node:20-alpine
COPY package.json .
WORKDIR /app
COPY cat .env
COPY . .
RUN npm install
EXPOSE 5000
CMD ["node", "index.js"]