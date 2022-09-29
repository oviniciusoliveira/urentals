import { UserTokens } from '@/modules/accounts/entities/UserTokens';

export type CreateUserTokenDTO = {
  userId: string;
  expiresDate: Date;
  refreshToken: string;
};

export interface UsersTokensRepositoryInterface {
  create(data: CreateUserTokenDTO): Promise<UserTokens>;
}
