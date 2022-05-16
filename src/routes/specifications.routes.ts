import { Router } from 'express';

import { createSpecificationControllerFactory } from '../modules/cars/useCases/createSpecification/createSpecificationControllerFactory';

export const specificationsRoutes = Router();

specificationsRoutes.post('/', async (request, response) => {
  const createSpecificationController = createSpecificationControllerFactory();
  return await createSpecificationController.handle(request, response);
});
