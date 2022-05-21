import { Router } from 'express';

import { createSpecificationControllerFactory } from '../../../../modules/cars/useCases/createSpecification/createSpecificationControllerFactory';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const specificationsRoutes = Router();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post('/', async (request, response) => {
  const createSpecificationController = createSpecificationControllerFactory();
  return await createSpecificationController.handle(request, response);
});
