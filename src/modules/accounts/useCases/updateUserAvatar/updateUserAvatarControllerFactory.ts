import { getDiskStorage } from '../../../../shared/infra/adapters';
import { UsersRepository } from '../../infra/repositories';
import { UpdateUserAvatarController } from './UpdateUserAvatarController';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export function updateUserAvatarControllerFactory() {
  const usersRepository = new UsersRepository();
  const storageAdapter = getDiskStorage();
  const updateUserAvatarUseCase = new UpdateUserAvatarUseCase(usersRepository, storageAdapter);
  return new UpdateUserAvatarController(updateUserAvatarUseCase);
}
