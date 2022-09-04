import { RentalsRepository } from '../../infra/repositories';
import { ListRentalsByUserController } from './ListRentalsByUserController';
import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase';

export function listRentalsByUserControllerFactory() {
  const rentalsRepository = new RentalsRepository();
  const listRentalsByUserUseCase = new ListRentalsByUserUseCase(rentalsRepository);
  return new ListRentalsByUserController(listRentalsByUserUseCase);
}
