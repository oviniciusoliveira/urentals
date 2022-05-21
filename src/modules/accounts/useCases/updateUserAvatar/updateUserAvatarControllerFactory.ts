import { UsersRepository } from '../../repositories';
import { UpdateUserAvatarController } from './UpdateUserAvatarController';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export function updateUserAvatarControllerFactory() {
  const usersRepository = new UsersRepository();
  const updateUserAvatarUseCase = new UpdateUserAvatarUseCase(usersRepository);
  return new UpdateUserAvatarController(updateUserAvatarUseCase);
}
