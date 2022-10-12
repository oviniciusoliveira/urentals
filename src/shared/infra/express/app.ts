/* eslint-disable import-helpers/order-imports */
import { TEMP_FOLDER } from '../../../config/config';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

import { currentConnection } from '../typeorm';

const swaggerDocument = YAML.load('./src/swagger.yaml');

import { routes } from './routes';

currentConnection();
const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/avatar', express.static(`${TEMP_FOLDER}/avatar`));
app.use('/cars', express.static(`${TEMP_FOLDER}/cars`));

app.use(routes);

export { app };
