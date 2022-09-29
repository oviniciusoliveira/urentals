import { DateAdapterInterface } from '@/shared/infra/adapters/interfaces/DateAdapter';

import { CryptAdapterInterface } from '../../../../shared/infra/adapters/interfaces/CryptAdapter';
import { TokenAdapterInterface } from '../../../../shared/infra/adapters/interfaces/TokenAdapter';
import { UsersRepositoryInterface } from '../../infra/repositories/interfaces/UsersRepository';
import { UsersTokensRepositoryInterface } from '../../infra/repositories/interfaces/UsersTokensRepository';

type AuthenticateUserData = {
  email: string;
  password: string;
};

type AuthenticateUserResponse = {
  token: string;
  refreshToken: string;
  user: {
    email: string;
    id: string;
    name: string;
  };
};

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepositoryInterface,
    private usersTokensRepository: UsersTokensRepositoryInterface,
    private cryptAdapter: CryptAdapterInterface,
    private tokenAdapter: TokenAdapterInterface,
    private dateAdapter: DateAdapterInterface,
    private secretTokenKey: string,
    private expirationTokenTime: number,
    private secretRefreshTokenKey: string,
    private expirationRefreshTokenTime: number,
  ) {}

  async perform({ email, password }: AuthenticateUserData): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await this.cryptAdapter.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Password incorrect');
    }

    const token = await this.tokenAdapter.generateToken({}, this.secretTokenKey, user.id, this.expirationTokenTime);

    const refreshToken = await this.tokenAdapter.generateToken(
      { email: email },
      this.secretRefreshTokenKey,
      user.id,
      this.expirationRefreshTokenTime,
    );

    const expirationRefreshTokenTimeInDays = this.expirationRefreshTokenTime / (24 * 60 * 60);

    await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken,
      expiresDate: this.dateAdapter.addDays(new Date(), expirationRefreshTokenTimeInDays),
    });

    return {
      token,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
