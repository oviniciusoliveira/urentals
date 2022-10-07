import { CryptAdapterBcrypt } from '../../../../shared/infra/adapters/bcrypt/CryptAdapterBcrypt';
import { DateAdapterDate } from '../../../../shared/infra/adapters/date/DateAdapterDate';
import { CryptAdapterInterface } from '../../../../shared/infra/adapters/interfaces/CryptAdapter';
import { DateAdapterInterface } from '../../../../shared/infra/adapters/interfaces/DateAdapter';
import { TokenAdapterInterface } from '../../../../shared/infra/adapters/interfaces/TokenAdapter';
import { TokenAdapterJWT } from '../../../../shared/infra/adapters/jsonwebtoken/TokenAdapterJWT';
import { CreateUserDTO, UsersRepositoryInterface } from '../../infra/repositories/interfaces/UsersRepository';
import { UsersTokensRepositoryInterface } from '../../infra/repositories/interfaces/UsersTokensRepository';
import { UsersRepositoryMemory } from '../../infra/repositories/memory/UsersRepositoryMemory';
import { UsersTokensRepositoryMemory } from '../../infra/repositories/memory/UsersTokensRepositoryMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepository: UsersRepositoryInterface;
let cryptAdapter: CryptAdapterInterface;
let tokenAdapter: TokenAdapterInterface;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepository: UsersTokensRepositoryInterface;
let dateAdapter: DateAdapterInterface;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryMemory();
    cryptAdapter = new CryptAdapterBcrypt();
    tokenAdapter = new TokenAdapterJWT();
    usersTokensRepository = new UsersTokensRepositoryMemory();
    dateAdapter = new DateAdapterDate();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      usersTokensRepository,
      cryptAdapter,
      tokenAdapter,
      dateAdapter,
      'secret-token-key',
      3600,
      'secret-refresh-token-key',
      600,
    );
    createUserUseCase = new CreateUserUseCase(usersRepository, cryptAdapter);
  });

  it('should be able authenticate a user', async () => {
    const user: CreateUserDTO = {
      name: 'any_name',
      email: 'any@email.com',
      driver_license: 'any_driver_license',
      password: 'any_password',
    };

    await createUserUseCase.perform(user);

    const result = await authenticateUserUseCase.perform({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able authenticate unregistered user', async () => {
    await expect(async () => {
      await authenticateUserUseCase.perform({
        email: 'any@email.com',
        password: 'any_password',
      });
    }).rejects.toThrow('User not found');
  });

  it('should not be able to authenticate a user with wrong password', async () => {
    const user: CreateUserDTO = {
      name: 'any_name',
      email: 'any@email.com',
      driver_license: 'any_driver_license',
      password: 'any_password',
    };

    await createUserUseCase.perform(user);

    await expect(async () => {
      await authenticateUserUseCase.perform({
        email: user.email,
        password: 'wrong_password',
      });
    }).rejects.toThrow('Password incorrect');
  });
});
