import { CarsRepository, CategoriesRepository } from '../../infra/repositories';
import { CreateCarController } from './CreateCarController';
import { CreateCarUseCase } from './CreateCarUseCase';

export function createCarControllerFactory() {
  const carsRepository = new CarsRepository();
  const categoriesRepository = new CategoriesRepository();
  const createCarUseCase = new CreateCarUseCase(carsRepository, categoriesRepository);
  return new CreateCarController(createCarUseCase);
}
