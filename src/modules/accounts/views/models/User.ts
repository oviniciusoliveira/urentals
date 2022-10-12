import { DiskStorages } from '../../../../shared/infra/adapters';
import { User } from '../../entities/User';

export type UserModel = {
  name: string;
  email: string;
  id: string;
  driverLicense: string;
  createdAt: string;
  avatar?: string;
  avatarUrl?: string;
};

export class UserModelUtils {
  private static getAvatarUrl(avatar: string): string | undefined {
    switch (process.env.DISK_STORAGE as DiskStorages) {
      case 'local':
        return `${process.env.BASE_API_URL}/avatar/${avatar}`;
      case 's3':
        return `${process.env.AWS_S3_BUCKET_URL}/avatar/${avatar}`;
      default:
        return undefined;
    }
  }

  static map(user: User): UserModel {
    return {
      id: user.id,
      driverLicense: user.driverLicense,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toISOString(),
      avatar: user.avatar,
      avatarUrl: user.avatar ? UserModelUtils.getAvatarUrl(user.avatar) : undefined,
    };
  }
}
