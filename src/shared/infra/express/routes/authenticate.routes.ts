import { Router } from 'express';

import { authenticateUserControllerFactory } from '../../../../modules/accounts/useCases/authenticateUser/authenticateUserControllerFactory';
import { refreshTokenControllerFactory } from '../../../../modules/accounts/useCases/refreshToken/refreshTokenControllerFactory';

export const authenticationRoutes = Router();

authenticationRoutes.post('/authenticate', async (request, response) => {
  const authenticateUserController = authenticateUserControllerFactory();
  await authenticateUserController.handle(request, response);
});

authenticationRoutes.post('/refresh', async (request, response) => {
  const refreshTokenController = refreshTokenControllerFactory();
  await refreshTokenController.handle(request, response);
});
