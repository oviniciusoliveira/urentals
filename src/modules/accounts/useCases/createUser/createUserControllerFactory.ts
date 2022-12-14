import { CryptAdapter } from '../../../../shared/infra/adapters';
import { UsersRepository } from '../../infra/repositories';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

export function createUserControllerFactory() {
  const usersRepository = new UsersRepository();
  const cryptAdapter = new CryptAdapter();
  const createUserUseCase = new CreateUserUseCase(usersRepository, cryptAdapter);
  return new CreateUserController(createUserUseCase);
}
