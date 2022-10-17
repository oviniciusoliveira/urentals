import { UserResetPasswordToken } from 'src/modules/accounts/entities/UserResetPasswordToken';

export type CreateUserResetPasswordTokenDTO = {
  userId: string;
  expiresDate: Date;
  resetPasswordToken: string;
};

export interface UsersResetPasswordTokensRepositoryInterface {
  create(data: CreateUserResetPasswordTokenDTO): Promise<UserResetPasswordToken>;
  findByToken(token: string): Promise<UserResetPasswordToken | null>;
  deleteById(id: string): Promise<void>;
}
