FROM node
WORKDIR /app
COPY . /app

COPY package*.json ./
RUN npm install
EXPOSE 8001

CMD ["npm" , "start"]
