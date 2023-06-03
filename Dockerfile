FROM amd64/node:18-alpine as node-builder
WORKDIR /app
COPY --chown=node:node . .
RUN apk --no-cache --virtual build-dependencies add python3 make
RUN npm install
RUN npm run build

FROM amd64/node:18-alpine
USER node
WORKDIR /app
COPY --from=node-builder --chown=node:node /app/package*.json ./
COPY --from=node-builder --chown=node:node /app/node_modules/ ./node_modules/
COPY --from=node-builder --chown=node:node /app/dist/ ./dist/

EXPOSE 3000

ENV \
  STRIPE_SECRET_KEY="" \
  FRONTEND_URL="" \
  STRIPE_PRICE_ID="" \
  STRIPE_WEBHOOK_SECRET="" \
  REDIS_HOST="" \
  REDIS_PORT="" \
  REDIS_TIMEOUT="" \
  PORT="" \
  DB_HOST="" \
  DB_PORT="" \
  DB_NAME="" \
  DB_USER="" \
  DB_PASSWORD="" \
  SMTP_HOST="" \
  SMTP_PORT="" \
  SMTP_USER="" \
  SMTP_PASSWORD="" \
  SMTP_FROM_EMAIL=""


CMD ["node", "dist/main.js"]
