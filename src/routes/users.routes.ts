import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { createUserControllerFactory } from '../modules/accounts/useCases/createUser/createUserControllerFactory';
import { updateUserAvatarControllerFactory } from '../modules/accounts/useCases/updateUserAvatar/updateUserAvatarControllerFactory';

export const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./temp/avatar'));

usersRoutes.post('/', uploadAvatar.single('avatar'), async (request, response) => {
  const createUserController = createUserControllerFactory();
  return await createUserController.handle(request, response);
});

usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), async (request, response) => {
  const updateUserAvatarController = updateUserAvatarControllerFactory();
  return await updateUserAvatarController.handle(request, response);
});
