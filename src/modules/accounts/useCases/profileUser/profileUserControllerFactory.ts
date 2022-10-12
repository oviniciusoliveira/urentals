import { UsersRepository } from '../../infra/repositories';
import { ProfileUserController } from './ProfileUserController';
import { ProfileUserUseCase } from './ProfileUserUseCase';

export function profileUserControllerFactory(): ProfileUserController {
  const usersRepository = new UsersRepository();
  const profileUserUseCase = new ProfileUserUseCase(usersRepository);
  const profileUserController = new ProfileUserController(profileUserUseCase);
  return profileUserController;
}
