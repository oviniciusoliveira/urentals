import { User } from '../../entities/User';
import { UsersRepository } from '../../infra/repositories';

export class ProfileUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async perform(userId: string): Promise<User> {
    const user = await this.usersRepository.findByID(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
