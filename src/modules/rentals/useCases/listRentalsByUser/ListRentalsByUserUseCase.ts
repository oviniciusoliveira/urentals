import { RentalsRepositoryInterface } from '../../infra/interfaces/RentalsRepository';

export class ListRentalsByUserUseCase {
  constructor(private rentalsRepository: RentalsRepositoryInterface) {}

  async perform(userId: string) {
    const rentalsByUser = await this.rentalsRepository.findByUser(userId);
    return rentalsByUser;
  }
}
