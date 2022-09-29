import { CryptAdapter, TokenAdapter, DateAdapter } from '../../../../shared/infra/adapters';
import { UsersRepository, UsersTokensRepository } from '../../infra/repositories';
import { AuthenticateUserController } from './AuthenticateUserController';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export function authenticateUserControllerFactory() {
  const usersRepository = new UsersRepository();
  const usersTokensRepository = new UsersTokensRepository();
  const cryptAdapter = new CryptAdapter();
  const tokenAdapter = new TokenAdapter();
  const dateAdapter = new DateAdapter();
  const authenticateUserUseCase = new AuthenticateUserUseCase(
    usersRepository,
    usersTokensRepository,
    cryptAdapter,
    tokenAdapter,
    dateAdapter,
    String(process.env.SECRET_TOKEN_KEY),
    Number(process.env.EXPIRATION_TOKEN_TIME),
    String(process.env.SECRET_REFRESH_TOKEN_KEY),
    Number(process.env.EXPIRATION_REFRESH_TOKEN_TIME),
  );
  return new AuthenticateUserController(authenticateUserUseCase);
}
