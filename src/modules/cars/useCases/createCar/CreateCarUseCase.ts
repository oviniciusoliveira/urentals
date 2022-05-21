import { Car } from '../../entities/Car';
import { CarsRepositoryInterface } from '../../infra/repositories/interfaces/CarsRepository';

type CreateCarData = {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
};

export class CreateCarUseCase {
  constructor(private carsRepository: CarsRepositoryInterface) {}

  async perform({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: CreateCarData): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);

    if (carAlreadyExists) {
      throw new Error('Car with this license plate already exists');
    }

    const car = await this.carsRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    return car;
  }
}
