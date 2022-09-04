import { Router } from 'express';

import { createRentalControllerFactory } from '../../../../modules/rentals/useCases/createRental/createRentalControllerFactory';
import { listRentalsByUserControllerFactory } from '../../../../modules/rentals/useCases/listRentalsByUser/listRentalsByUserControllerFactory';
import { returnRentalControllerFactory } from '../../../../modules/rentals/useCases/returnRental/returnRentalControllerFactory';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const rentalsRoutes = Router();

rentalsRoutes.post('/', ensureAuthenticated, async (request, response) => {
  const createRentalController = createRentalControllerFactory();
  return createRentalController.handle(request, response);
});

rentalsRoutes.post('/return/:id', ensureAuthenticated, async (request, response) => {
  const returnRentalController = returnRentalControllerFactory();
  return returnRentalController.handle(request, response);
});

rentalsRoutes.get('/user', ensureAuthenticated, async (request, response) => {
  const listRentalsByUserController = listRentalsByUserControllerFactory();
  return listRentalsByUserController.handle(request, response);
});
