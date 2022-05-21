import { deleteLocalFile } from '../../../../utils/deleteLocalFile';
import { UsersRepositoryInterface } from '../../infra/repositories/interfaces/UsersRepository';

type UpdateUserAvatarData = {
  userID: string;
  avatarFile: string;
};

export class UpdateUserAvatarUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async perform({ userID, avatarFile }: UpdateUserAvatarData) {
    const user = await this.usersRepository.findByID(userID);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.avatar) {
      await deleteLocalFile(`./temp/avatar/${user.avatar}`);
    }

    await this.usersRepository.update(userID, {
      avatar: avatarFile,
    });
  }
}
