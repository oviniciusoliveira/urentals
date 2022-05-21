import { Router } from 'express';

import { createCarControllerFactory } from '../../../../modules/cars/useCases/createCar/createCarControllerFactory';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const carsRoutes = Router();

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, async (request, response) => {
  const createCarController = createCarControllerFactory();
  return await createCarController.handle(request, response);
});
