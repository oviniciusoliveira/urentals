import { CryptAdapterInterface } from '../../../../adapters/interfaces/CryptAdapter';
import { TokenAdapterInterface } from '../../../../adapters/interfaces/TokenAdapter';
import { UsersRepository } from '../../repositories';

type AuthenticateUserData = {
  email: string;
  password: string;
};

type AuthenticateUserResponse = {
  token: string;
  user: {
    email: string;
    id: string;
    name: string;
  };
};

const expirationTime = 60 * 60 * 24 * 1; // 1 day

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private cryptAdapter: CryptAdapterInterface,
    private tokenAdapter: TokenAdapterInterface,
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

    const token = await this.tokenAdapter.generateToken({}, 'secretKey', user.id, expirationTime);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
