import { CryptAdapterInterface } from 'src/shared/infra/adapters/interfaces/CryptAdapter';
import { DateAdapterInterface } from 'src/shared/infra/adapters/interfaces/DateAdapter';

import { UsersRepositoryInterface } from '../../infra/repositories/interfaces/UsersRepository';
import { UsersResetPasswordTokensRepositoryInterface } from '../../infra/repositories/interfaces/UsersResetPasswordTokensRepository';

type ResetUserPasswordData = {
  resetToken: string;
  newPassword: string;
};

export class ResetUserPasswordUseCase {
  constructor(
    private usersResetPasswordTokensRepository: UsersResetPasswordTokensRepositoryInterface,
    private dateAdapter: DateAdapterInterface,
    private usersRepository: UsersRepositoryInterface,
    private cryptAdapter: CryptAdapterInterface,
  ) {}

  async perform({ resetToken, newPassword }: ResetUserPasswordData) {
    const userResetToken = await this.usersResetPasswordTokensRepository.findByToken(resetToken);

    if (!userResetToken) {
      throw new Error('Invalid Token');
    }

    const isTokenExpired = this.dateAdapter.isBefore(new Date(), new Date(userResetToken.expiresDate));
    if (isTokenExpired) {
      throw new Error('Token expired');
    }

    const user = await this.usersRepository.findByID(userResetToken.userId);

    if (!user) {
      return new Error('Invalid User');
    }

    const passwordCrypted = await this.cryptAdapter.encrypt(newPassword);
    await this.usersRepository.update(user.id, { password: passwordCrypted });

    await this.usersResetPasswordTokensRepository.deleteById(userResetToken.id);
  }
}
