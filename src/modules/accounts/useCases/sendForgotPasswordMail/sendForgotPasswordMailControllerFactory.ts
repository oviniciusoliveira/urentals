import { DateAdapter, MailAdapter } from '../../../../shared/infra/adapters';
import { UsersRepository, UsersResetPasswordTokenRepository } from '../../infra/repositories';
import { SendForgotPasswordMailController } from './SendForgotPasswordMailController';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

export function sendForgotPasswordMailControllerFactory(): SendForgotPasswordMailController {
  const usersRepository = new UsersRepository();
  const usersResetPasswordTokensRepository = new UsersResetPasswordTokenRepository();
  const dateAdapter = new DateAdapter();
  const mailAdapter = new MailAdapter();
  const sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
    usersRepository,
    usersResetPasswordTokensRepository,
    dateAdapter,
    mailAdapter,
  );
  const sendForgotPasswordMailController = new SendForgotPasswordMailController(sendForgotPasswordMailUseCase);
  return sendForgotPasswordMailController;
}
