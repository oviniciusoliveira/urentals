import { getRepository, Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { UserTypeORM } from '../../../../database/entities/User';
import { User } from '../../entities/User';
import { CreateUserDTO, UsersRepositoryInterface } from '../interfaces/UsersRepository';

export class UsersRepositoryTypeORM implements UsersRepositoryInterface {
  private repository: Repository<UserTypeORM>;

  constructor() {
    this.repository = getRepository(UserTypeORM);
  }

  async create({ driver_license, email, name, password }: CreateUserDTO): Promise<void> {
    const user = this.repository.create({
      id: uuidV4(),
      driver_license,
      email,
      name,
      password,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({
      email,
    });

    if (!user) return null;

    return {
      id: user.id,
      createdAt: user.created_at,
      driverLicense: user.driver_license,
      email: user.email,
      isAdmin: user.is_admin,
      name: user.name,
      password: user.password,
    };
  }
}
