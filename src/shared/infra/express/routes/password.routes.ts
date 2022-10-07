import { Router } from 'express';

import { resetUserPasswordControllerFactory } from '../../../../modules/accounts/useCases/resetUserPassword/resetUserPasswordControllerFactory';
import { sendForgotPasswordMailControllerFactory } from '../../../../modules/accounts/useCases/sendForgotPasswordMail/sendForgotPasswordMailControllerFactory';

export const passwordRoutes = Router();

passwordRoutes.post('/forgot', async (request, response) => {
  const sendForgotPasswordMailController = sendForgotPasswordMailControllerFactory();
  await sendForgotPasswordMailController.handle(request, response);
});

passwordRoutes.post('/reset', async (request, response) => {
  const resetUserPasswordController = resetUserPasswordControllerFactory();
  await resetUserPasswordController.handle(request, response);
});
