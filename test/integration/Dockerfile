FROM node:8-alpine

RUN mkdir /app/
WORKDIR /app/

COPY package.json .
RUN npm install

COPY specs/ specs/
COPY gulpfile.babel.js .
COPY mocha.conf.js .
COPY .babelrc .

CMD ["npm", "run", "test"]
