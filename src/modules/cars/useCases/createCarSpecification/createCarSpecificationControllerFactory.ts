import { CarsRepository, SpecificationsRepository } from '../../infra/repositories';
import { CreateCarSpecificationController } from './CreateCarSpecificationController';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

export function createCarSpecificationControllerFactory() {
  const carsRepository = new CarsRepository();
  const specificationsRepository = new SpecificationsRepository();
  const createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepository, specificationsRepository);
  return new CreateCarSpecificationController(createCarSpecificationUseCase);
}
