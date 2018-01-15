
# Install dependencies
COPY package.json package.json
RUN npm install

# Copy source/build files
COPY src/ .
COPY gulpfile.babel.js gulpfile.babel.js
COPY .babelrc .babelrc

# Run build
RUN npm run build

# Remove unecessary files
RUN rm -rf src/ \
    && rm package.json \
    && rm gulpfile.babel.js \
    && rm .babelrc
