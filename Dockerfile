FROM node:18-bullseye-slim

ENV NODE_ENV=development
ENV SERVER_PORT=8080

WORKDIR /app
COPY ["./package.json", "./package-lock.json", "./"]
RUN npm i
COPY ./dist ./dist

EXPOSE 8080

CMD npm run start
