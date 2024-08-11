FROM node:22.4.1

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
RUN npm install @material-ui/lab

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]