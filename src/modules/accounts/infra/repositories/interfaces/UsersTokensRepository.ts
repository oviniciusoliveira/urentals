import { UserTokens } from 'src/modules/accounts/entities/UserTokens';

export type CreateUserTokenDTO = {
  userId: string;
  expiresDate: Date;
  refreshToken: string;
};

export interface UsersTokensRepositoryInterface {
  create(data: CreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<UserTokens | null>;
  delete(id: string): Promise<void>;
}
