FROM node:alpine
LABEL authors="ezril"

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY dist ./dist

EXPOSE 9000

CMD ["node", "dist/main.js"]