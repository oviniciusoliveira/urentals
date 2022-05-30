import { RentalsRepository } from '../../infra/repositories';
import { CreateRentalController } from './CreateRentalController';
import { CreateRentalUseCase } from './CreateRentalUseCase';

export function createRentalControllerFactory() {
  const rentalsRepository = new RentalsRepository();
  const createRentalUseCase = new CreateRentalUseCase(rentalsRepository);
  return new CreateRentalController(createRentalUseCase);
}
