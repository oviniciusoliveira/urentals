import { CryptAdapterInterface } from '../../../../adapters/interfaces/CryptAdapter';
import { CreateUserDTO, UsersRepositoryInterface } from '../../repositories/interfaces/UsersRepository';

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepositoryInterface, private cryptAdapter: CryptAdapterInterface) {}

  async perform({ email, name, password, driver_license }: CreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const encryptedPassword = await this.cryptAdapter.encrypt(password);

    await this.usersRepository.create({
      driver_license,
      email,
      name,
      password: encryptedPassword,
    });
  }
}
