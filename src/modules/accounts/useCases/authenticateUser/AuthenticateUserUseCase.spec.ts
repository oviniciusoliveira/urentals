import { CryptAdapterBcrypt } from '../../../../shared/infra/adapters/bcrypt/CryptAdapterBcrypt';
import { CryptAdapterInterface } from '../../../../shared/infra/adapters/interfaces/CryptAdapter';
import { TokenAdapterInterface } from '../../../../shared/infra/adapters/interfaces/TokenAdapter';
import { TokenAdapterJWT } from '../../../../shared/infra/adapters/jsonwebtoken/TokenAdapterJWT';
import { CreateUserDTO, UsersRepositoryInterface } from '../../infra/repositories/interfaces/UsersRepository';
import { UsersRepositoryMemory } from '../../infra/repositories/memory/UsersRepositoryMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryMemory: UsersRepositoryInterface;
let cryptAdapter: CryptAdapterInterface;
let tokenAdapter: TokenAdapterInterface;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryMemory = new UsersRepositoryMemory();
    cryptAdapter = new CryptAdapterBcrypt();
    tokenAdapter = new TokenAdapterJWT();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryMemory,
      cryptAdapter,
      tokenAdapter,
      'secret',
      3600,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryMemory, cryptAdapter);
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
