import { Router } from 'express';
import multer from 'multer';

import { multerConfig } from '../../../../config/multer';
import { createUserControllerFactory } from '../../../../modules/accounts/useCases/createUser/createUserControllerFactory';
import { updateUserAvatarControllerFactory } from '../../../../modules/accounts/useCases/updateUserAvatar/updateUserAvatarControllerFactory';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const usersRoutes = Router();

const uploadAvatar = multer(multerConfig);

usersRoutes.post('/', uploadAvatar.single('avatar'), async (request, response) => {
  const createUserController = createUserControllerFactory();
  return await createUserController.handle(request, response);
});

usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), async (request, response) => {
  const updateUserAvatarController = updateUserAvatarControllerFactory();
  return await updateUserAvatarController.handle(request, response);
});
