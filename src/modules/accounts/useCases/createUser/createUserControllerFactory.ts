import { CryptAdapter } from '../../../../adapters';
import { UsersRepository } from '../../repositories';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

export function createUserControllerFactory() {
  const usersRepository = new UsersRepository();
  const cryptAdapter = new CryptAdapter();
  const createUserUseCase = new CreateUserUseCase(usersRepository, cryptAdapter);
  return new CreateUserController(createUserUseCase);
}
