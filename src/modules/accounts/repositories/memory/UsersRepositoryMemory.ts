import { v4 as uuidV4 } from 'uuid';

import { User } from '../../entities/User';
import { CreateUserDTO, UpdateUserDTO, UsersRepositoryInterface } from '../interfaces/UsersRepository';

export class UsersRepositoryMemory implements UsersRepositoryInterface {
  users: User[] = [];

  async create({ driver_license, email, name, password, avatar }: CreateUserDTO): Promise<void> {
    const user: User = {
      id: uuidV4(),
      driverLicense: driver_license,
      email: email,
      name: name,
      password: password,
      avatar,
      isAdmin: false,
      createdAt: new Date(),
    };

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }

  async findByID(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    if (!user) return null;

    return user;
  }

  async update(id: string, { avatar }: UpdateUserDTO): Promise<void> {
    this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          avatar: avatar,
        };
      }

      return user;
    });
  }
}
