import { CryptAdapter, TokenAdapter } from '../../../../adapters';
import { UsersRepository } from '../../repositories';
import { AuthenticateUserController } from './AuthenticateUserController';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export function authenticateUserControllerFactory() {
  const usersRepository = new UsersRepository();
  const cryptAdapter = new CryptAdapter();
  const tokenAdapter = new TokenAdapter();
  const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository, cryptAdapter, tokenAdapter);
  return new AuthenticateUserController(authenticateUserUseCase);
}
