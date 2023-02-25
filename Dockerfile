FROM node:fermium-alpine

RUN mkdir -p app

WORKDIR /app

COPY package.json yarn.lock /app

RUN yarn install --silent && yarn cache clean --force

COPY .eslintrc.json .eslintignore tsconfig.json tsoa.json /app/

COPY src /app/src

RUN yarn build

RUN rm -rf node_modules && \
    yarn install --frozen-lockfile --production --silent && \
    yarn cache clean --force

CMD ["node", "dist/presentation/index.js"]