import { CarsRepository } from '../../../cars/infra/repositories';
import { RentalsRepository } from '../../infra/repositories';
import { CreateRentalController } from './CreateRentalController';
import { CreateRentalUseCase } from './CreateRentalUseCase';

export function createRentalControllerFactory() {
  const rentalsRepository = new RentalsRepository();
  const carsRepository = new CarsRepository();
  const createRentalUseCase = new CreateRentalUseCase(rentalsRepository, carsRepository);
  return new CreateRentalController(createRentalUseCase);
}
