import { env } from '../../../../config/env';
import { CryptAdapter, TokenAdapter } from '../../../../shared/infra/adapters';
import { UsersRepository } from '../../infra/repositories';
import { AuthenticateUserController } from './AuthenticateUserController';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export function authenticateUserControllerFactory() {
  const usersRepository = new UsersRepository();
  const cryptAdapter = new CryptAdapter();
  const tokenAdapter = new TokenAdapter();
  const authenticateUserUseCase = new AuthenticateUserUseCase(
    usersRepository,
    cryptAdapter,
    tokenAdapter,
    env.secretTokenKey,
    Number(process.env.EXPIRATION_TOKEN_TIME),
  );
  return new AuthenticateUserController(authenticateUserUseCase);
}
