import { DateAdapter } from '../../../../shared/infra/adapters';
import { CarsRepository } from '../../../cars/infra/repositories';
import { RentalsRepository } from '../../infra/repositories';
import { ReturnRentalController } from './ReturnRentalController';
import { ReturnRentalUseCase } from './ReturnRentalUseCase';

export function returnRentalControllerFactory(): ReturnRentalController {
  const rentalsRepository = new RentalsRepository();
  const carsRepository = new CarsRepository();
  const dateAdapter = new DateAdapter();
  const returnRentalUseCase = new ReturnRentalUseCase(rentalsRepository, carsRepository, dateAdapter);
  const returnRentalController = new ReturnRentalController(returnRentalUseCase);
  return returnRentalController;
}
