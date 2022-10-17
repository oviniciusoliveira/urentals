import { DateAdapterInterface } from 'src/shared/infra/adapters/interfaces/DateAdapter';
import { TokenAdapterInterface } from 'src/shared/infra/adapters/interfaces/TokenAdapter';

import { UsersTokensRepository } from '../../infra/repositories';

type RefreshTokenUseCaseResponse = {
  newToken: string;
  newRefreshToken: string;
};

export class RefreshTokenUseCase {
  constructor(
    private usersTokensRepository: UsersTokensRepository,
    private tokenAdapter: TokenAdapterInterface,
    private dateAdapter: DateAdapterInterface,
    private secretTokenKey: string,
    private expirationTokenTime: number,
    private secretRefreshTokenKey: string,
    private expirationRefreshTokenTime: number,
  ) {}

  async perform(refreshToken: string): Promise<RefreshTokenUseCaseResponse> {
    const decoded = await this.tokenAdapter.verifyToken(refreshToken, this.secretRefreshTokenKey);
    if (!decoded) {
      throw new Error('Invalid refresh token');
    }
    const userId = decoded.sub;
    const email = decoded.email;

    if (!userId || !email) {
      throw new Error('Refresh token missing data');
    }

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(userId, refreshToken);
    if (!userToken) {
      throw new Error('Refresh token not found');
    }
    await this.usersTokensRepository.delete(userToken.id);

    const newToken = await this.tokenAdapter.generateToken(
      { email },
      this.secretTokenKey,
      userId,
      this.expirationTokenTime,
    );

    const expirationRefreshTokenTimeInDays = this.expirationRefreshTokenTime / (24 * 60 * 60);

    const newRefreshToken = await this.usersTokensRepository.create({
      userId,
      refreshToken,
      expiresDate: this.dateAdapter.addDays(new Date(), expirationRefreshTokenTimeInDays),
    });

    return {
      newToken,
      newRefreshToken: newRefreshToken.refreshToken,
    };
  }
}
