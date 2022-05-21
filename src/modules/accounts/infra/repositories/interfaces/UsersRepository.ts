import { User } from '../../../entities/User';

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  driver_license: string;
  avatar?: string;
};

export type UpdateUserDTO = {
  avatar?: string;
};

export interface UsersRepositoryInterface {
  create: (data: CreateUserDTO) => Promise<void>;
  findByEmail: (email: string) => Promise<User | null>;
  findByID: (id: string) => Promise<User | null>;
  update: (id: string, data: UpdateUserDTO) => Promise<void>;
}
