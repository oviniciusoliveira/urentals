import { UserTokens } from 'src/modules/accounts/entities/UserTokens';
import { v4 as uuidV4 } from 'uuid';

import { CreateUserTokenDTO, UsersTokensRepositoryInterface } from '../interfaces/UsersTokensRepository';

export class UsersTokensRepositoryMemory implements UsersTokensRepositoryInterface {
  private usersTokens: UserTokens[] = [];

  async create(data: CreateUserTokenDTO): Promise<UserTokens> {
    const userToken: UserTokens = {
      id: uuidV4(),
      createdAt: new Date(),
      expiresDate: data.expiresDate,
      refreshToken: data.refreshToken,
      userId: data.userId,
    };

    this.usersTokens.push(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<UserTokens | null> {
    const userToken = this.usersTokens.find((ut) => ut.userId === userId && ut.refreshToken === refreshToken);
    if (!userToken) return null;
    return userToken;
  }

  async delete(id: string): Promise<void> {
    const userTokenIndex = this.usersTokens.findIndex((userToken) => userToken.id === id);
    this.usersTokens.splice(userTokenIndex, 1);
  }
}
