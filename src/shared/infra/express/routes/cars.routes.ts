import { Router } from 'express';

import { createCarControllerFactory } from '../../../../modules/cars/useCases/createCar/createCarControllerFactory';

export const carsRoutes = Router();

carsRoutes.post('/', async (request, response) => {
  const createCarController = createCarControllerFactory();
  return await createCarController.handle(request, response);
});
