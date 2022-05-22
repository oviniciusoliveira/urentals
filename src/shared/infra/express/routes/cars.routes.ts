import { Router } from 'express';

import { createCarControllerFactory } from '../../../../modules/cars/useCases/createCar/createCarControllerFactory';
import { listAvailableCarsControllerFactory } from '../../../../modules/cars/useCases/listAvailableCars/listAvailableCarsControllerFactory';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const carsRoutes = Router();

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, async (request, response) => {
  const createCarController = createCarControllerFactory();
  return await createCarController.handle(request, response);
});

carsRoutes.get('/available', async (request, response) => {
  const listAvailableCarsController = listAvailableCarsControllerFactory();
  await listAvailableCarsController.handle(request, response);
});
