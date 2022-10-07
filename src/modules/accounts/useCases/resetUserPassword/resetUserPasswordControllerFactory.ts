import { CryptAdapter, DateAdapter } from '../../../../shared/infra/adapters';
import { UsersRepository, UsersResetPasswordTokenRepository } from '../../infra/repositories';
import { ResetUserPasswordController } from './ResetUserPasswordController';
import { ResetUserPasswordUseCase } from './ResetUserPasswordUseCase';

export function resetUserPasswordControllerFactory(): ResetUserPasswordController {
  const usersResetPasswordTokenRepository = new UsersResetPasswordTokenRepository();
  const dateAdapter = new DateAdapter();
  const usersRepository = new UsersRepository();
  const cryptAdapter = new CryptAdapter();
  const resetUserPasswordUseCase = new ResetUserPasswordUseCase(
    usersResetPasswordTokenRepository,
    dateAdapter,
    usersRepository,
    cryptAdapter,
  );
  const userPasswordController = new ResetUserPasswordController(resetUserPasswordUseCase);
  return userPasswordController;
}
