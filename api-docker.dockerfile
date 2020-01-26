FROM node:latest
WORKDIR /src
COPY . .
RUN npm install -g typescript
RUN npm install
EXPOSE $PORT
ENTRYPOINT ["npm", "run", "start:dev"]