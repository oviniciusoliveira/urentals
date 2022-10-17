import { StorageAdapterInterface } from 'src/shared/infra/adapters/interfaces/StorageAdapter';

import { UsersRepositoryInterface } from '../../infra/repositories/interfaces/UsersRepository';

type UpdateUserAvatarData = {
  userID: string;
  avatarFile: string;
};

export class UpdateUserAvatarUseCase {
  constructor(private usersRepository: UsersRepositoryInterface, private storageAdapter: StorageAdapterInterface) {}

  async perform({ userID, avatarFile }: UpdateUserAvatarData) {
    const user = await this.usersRepository.findByID(userID);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.avatar) {
      await this.storageAdapter.delete(user.avatar, 'avatar');
    }

    await this.storageAdapter.save(avatarFile, 'avatar');

    await this.usersRepository.update(userID, {
      avatar: avatarFile,
    });
  }
}
