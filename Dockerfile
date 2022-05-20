FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run typeorm migration:run

EXPOSE 3333

CMD ["npm","run","dev"]
