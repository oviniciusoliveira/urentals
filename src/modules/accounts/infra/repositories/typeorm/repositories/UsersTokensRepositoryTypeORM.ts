import { getRepository, Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { UserTokens } from '@/modules/accounts/entities/UserTokens';

import { CreateUserTokenDTO, UsersTokensRepositoryInterface } from '../../interfaces/UsersTokensRepository';
import { UserTokensTypeORM } from '../entities/UserTokens';

export class UsersTokensRepositoryTypeORM implements UsersTokensRepositoryInterface {
  private repository: Repository<UserTokensTypeORM>;

  constructor() {
    this.repository = getRepository(UserTokensTypeORM);
  }

  async create({ expiresDate, refreshToken, userId }: CreateUserTokenDTO): Promise<UserTokens> {
    const token = this.repository.create({
      id: uuidV4(),
      user_id: userId,
      expires_date: expiresDate,
      refresh_token: refreshToken,
    });
    await this.repository.save(token);
    return UsersTokensRepositoryTypeORM.mapUserTokenFromTypeORM(token);
  }

  async findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<UserTokens | null> {
    const userToken = await this.repository.findOne({ user_id: userId, refresh_token: refreshToken });
    if (!userToken) return null;
    return UsersTokensRepositoryTypeORM.mapUserTokenFromTypeORM(userToken);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private static mapUserTokenFromTypeORM(token: UserTokensTypeORM): UserTokens {
    return {
      id: token.id,
      createdAt: token.created_at,
      expiresDate: token.expires_date,
      userId: token.user_id,
      refreshToken: token.refresh_token,
    };
  }
}
