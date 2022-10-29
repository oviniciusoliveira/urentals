/* eslint-disable import-helpers/order-imports */
import { TEMP_FOLDER } from '../../../config/config';
import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import { rateLimiterMiddleware } from './middlewares/rateLimiter';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import { currentConnection } from '../typeorm';

const swaggerDocument = YAML.load('./src/swagger.yaml');

import { routes } from './routes';

currentConnection();

const app = express();

app.use(rateLimiterMiddleware);

Sentry.init({
  enabled: process.env.NODE_ENV === 'production',
  dsn: process.env.SENTRY_DSN,
  integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app: app })],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/avatar', express.static(`${TEMP_FOLDER}/avatar`));
app.use('/cars', express.static(`${TEMP_FOLDER}/cars`));

app.use(cors());
app.use(routes);

export { app };
