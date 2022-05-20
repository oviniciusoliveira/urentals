import { Router } from 'express';

import { authenticateUserControllerFactory } from '../modules/accounts/useCases/authenticateUser/authenticateUserControllerFactory';

export const authenticationRoutes = Router();

authenticationRoutes.post('/authenticate', async (request, response) => {
  const authenticateUserController = authenticateUserControllerFactory();
  await authenticateUserController.handle(request, response);
});
