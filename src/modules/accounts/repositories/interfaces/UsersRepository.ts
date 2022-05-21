import { User } from '../../entities/User';

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  driver_license: string;
};

export interface UsersRepositoryInterface {
  create: (data: CreateUserDTO) => Promise<void>;
  findByEmail: (email: string) => Promise<User | null>;
  findByID: (id: string) => Promise<User | null>;
}
