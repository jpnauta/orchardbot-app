FROM node:8-alpine

RUN mkdir /app/
WORKDIR /app/

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Build ./dist folder
COPY src/ src/
COPY bin/ bin/
COPY gulpfile.babel.js .
COPY .babelrc .
RUN npm run build

# Remove dev dependencies
RUN npm prune --production
RUN rm -r src/ \
      && rm gulpfile.babel.js \
      && rm .babelrc

CMD ["npm", "run", "start:api"]
