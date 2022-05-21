import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { createSpecificationControllerFactory } from '../modules/cars/useCases/createSpecification/createSpecificationControllerFactory';

export const specificationsRoutes = Router();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post('/', async (request, response) => {
  const createSpecificationController = createSpecificationControllerFactory();
  return await createSpecificationController.handle(request, response);
});
