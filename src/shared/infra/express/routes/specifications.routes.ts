import { Router } from 'express';

import { createSpecificationControllerFactory } from '../../../../modules/cars/useCases/createSpecification/createSpecificationControllerFactory';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const specificationsRoutes = Router();

specificationsRoutes.post('/', ensureAuthenticated, ensureAdmin, async (request, response) => {
  const createSpecificationController = createSpecificationControllerFactory();
  return await createSpecificationController.handle(request, response);
});
