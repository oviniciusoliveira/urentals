import { UserResetPasswordToken } from 'src/modules/accounts/entities/UserResetPasswordToken';
import { getRepository, Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import {
  CreateUserResetPasswordTokenDTO,
  UsersResetPasswordTokensRepositoryInterface,
} from '../../interfaces/UsersResetPasswordTokensRepository';
import { UserResetPasswordTokenORM } from '../entities/UserResetPasswordToken';

export class UsersResetPasswordTokenRepositoryTypeORM implements UsersResetPasswordTokensRepositoryInterface {
  private repository: Repository<UserResetPasswordTokenORM>;

  constructor() {
    this.repository = getRepository(UserResetPasswordTokenORM);
  }

  async create({
    expiresDate,
    resetPasswordToken,
    userId,
  }: CreateUserResetPasswordTokenDTO): Promise<UserResetPasswordToken> {
    const token = this.repository.create({
      id: uuidV4(),
      user_id: userId,
      expires_date: expiresDate,
      reset_password_token: resetPasswordToken,
    });
    await this.repository.save(token);
    return UsersResetPasswordTokenRepositoryTypeORM.map(token);
  }

  async findByToken(token: string): Promise<UserResetPasswordToken | null> {
    const userToken = await this.repository.findOne({ reset_password_token: token });

    if (!userToken) {
      return null;
    }

    return UsersResetPasswordTokenRepositoryTypeORM.map(userToken);
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public static map(token: UserResetPasswordTokenORM): UserResetPasswordToken {
    return {
      id: token.id,
      createdAt: new Date(token.created_at),
      expiresDate: new Date(token.expires_date),
      resetPasswordToken: token.reset_password_token,
      userId: token.user_id,
    };
  }
}
