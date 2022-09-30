import { DateAdapter, TokenAdapter } from '../../../../shared/infra/adapters';
import { UsersTokensRepository } from '../../infra/repositories';
import { RefreshTokenController } from './RefreshTokenController';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

export function refreshTokenControllerFactory() {
  const usersTokensRepository = new UsersTokensRepository();
  const tokenAdapter = new TokenAdapter();
  const dateAdapter = new DateAdapter();
  const refreshTokenUseCase = new RefreshTokenUseCase(
    usersTokensRepository,
    tokenAdapter,
    dateAdapter,
    String(process.env.SECRET_TOKEN_KEY),
    Number(process.env.EXPIRATION_TOKEN_TIME),
    String(process.env.SECRET_REFRESH_TOKEN_KEY),
    Number(process.env.EXPIRATION_REFRESH_TOKEN_TIME),
  );
  const refreshTokenController = new RefreshTokenController(refreshTokenUseCase);
  return refreshTokenController;
}
