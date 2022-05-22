import { CarsRepository } from '../../infra/repositories';
import { ListAvailableCarsController } from './ListAvailableCarsController';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

export function listAvailableCarsControllerFactory() {
  const carsRepository = new CarsRepository();
  const listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  return new ListAvailableCarsController(listAvailableCarsUseCase);
}
