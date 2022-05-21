import { CarsRepository } from '../../infra/repositories';
import { CreateCarController } from './CreateCarController';
import { CreateCarUseCase } from './CreateCarUseCase';

export function createCarControllerFactory() {
  const carsRepository = new CarsRepository();
  const createCarUseCase = new CreateCarUseCase(carsRepository);
  return new CreateCarController(createCarUseCase);
}
