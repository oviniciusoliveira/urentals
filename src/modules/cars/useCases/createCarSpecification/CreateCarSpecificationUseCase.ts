import { Car } from '../../entities/Car';
import { CarsRepositoryInterface } from '../../infra/repositories/interfaces/CarsRepository';
import { SpecificationsRepositoryInterface } from '../../infra/repositories/interfaces/SpecificationsRepository';

type CreateCarSpecificationUseCaseDTO = {
  car_id: string;
  specifications_id: string[];
};

export class CreateCarSpecificationUseCase {
  constructor(
    private carsRepository: CarsRepositoryInterface,
    private specificationsRepository: SpecificationsRepositoryInterface,
  ) {}

  async perform({ car_id, specifications_id }: CreateCarSpecificationUseCaseDTO): Promise<Car> {
    const car = await this.carsRepository.findByID(car_id);

    if (!car) {
      throw new Error('Car not found');
    }

    const specificationsIdsToBeAdded = specifications_id.filter(
      (specification_id) => !car.specifications.some((specification) => specification.id === specification_id),
    );

    const newSpecifications = await this.specificationsRepository.findByIds(specificationsIdsToBeAdded);

    const newCarSpecifications = [...car.specifications, ...newSpecifications];

    const newCar = await this.carsRepository.update(car_id, {
      specifications: newCarSpecifications,
    });

    if (!newCar) {
      throw new Error('Car not found');
    }

    return newCar;
  }
}
