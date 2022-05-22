import { Car } from '../../entities/Car';
import { CarsRepositoryInterface } from '../../infra/repositories/interfaces/CarsRepository';

type ListAvailableCarsUseCaseData = {
  category_id?: string;
  brand?: string;
  name?: string;
};

export class ListAvailableCarsUseCase {
  constructor(private carsRepository: CarsRepositoryInterface) {}

  async perform({ category_id, brand, name }: ListAvailableCarsUseCaseData): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable({
      brand,
      category_id,
      name,
    });
    return cars;
  }
}
