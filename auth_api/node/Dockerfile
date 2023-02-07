FROM node:9-alpine
WORKDIR /node
COPY package.json /node
RUN npm install
COPY . /node
CMD node index.js
EXPOSE 8000