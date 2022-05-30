import { Router } from 'express';

import { createRentalControllerFactory } from '../../../../modules/rentals/useCases/createRentalUseCase/createRentalControllerFactory';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const rentalsRoutes = Router();

rentalsRoutes.post('/', ensureAuthenticated, async (request, response) => {
  const createRentalController = createRentalControllerFactory();
  return createRentalController.handle(request, response);
});
