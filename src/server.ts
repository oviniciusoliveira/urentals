import express from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

import './database';

const swaggerDocument = YAML.load('./src/swagger.yaml');

import { routes } from './routes';

const app = express();
app.use(express.json());
const port = 3333;

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(routes);

app.listen(port, () => console.log(`Server is Running on port ${port}`));
