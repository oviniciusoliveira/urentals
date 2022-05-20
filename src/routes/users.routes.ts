import { Router } from 'express';

import { createUserControllerFactory } from '../modules/accounts/useCases/createUser/createUserControllerFactory';

export const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {
  const createUserController = createUserControllerFactory();
  return await createUserController.handle(request, response);
});
