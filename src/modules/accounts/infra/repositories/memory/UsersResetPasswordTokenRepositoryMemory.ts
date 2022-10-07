import { v4 as uuidV4 } from 'uuid';

import { UserResetPasswordToken } from '../../../entities/UserResetPasswordToken';
import {
  CreateUserResetPasswordTokenDTO,
  UsersResetPasswordTokensRepositoryInterface,
} from '../interfaces/UsersResetPasswordTokensRepository';

export class UsersResetPasswordTokenRepositoryMemory implements UsersResetPasswordTokensRepositoryInterface {
  private userResetTokens: UserResetPasswordToken[] = [];

  async create(data: CreateUserResetPasswordTokenDTO): Promise<UserResetPasswordToken> {
    const resetToken: UserResetPasswordToken = {
      id: uuidV4(),
      createdAt: new Date(),
      expiresDate: data.expiresDate,
      resetPasswordToken: data.resetPasswordToken,
      userId: data.userId,
    };

    this.userResetTokens.push(resetToken);
    return resetToken;
  }
  async findByToken(token: string): Promise<UserResetPasswordToken | null> {
    const resetToken = this.userResetTokens.find((userResetToken) => userResetToken.resetPasswordToken === token);
    if (!resetToken) return null;
    return resetToken;
  }
  async deleteById(id: string): Promise<void> {
    const resetTokenIndex = this.userResetTokens.findIndex((resetToken) => resetToken.id === id);
    this.userResetTokens.splice(resetTokenIndex, 1);
  }
}
