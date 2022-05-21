import { getRepository, Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Car } from '@/modules/cars/entities/Car';

import { CarsRepositoryInterface, CreateCarDTO } from '../../interfaces/CarsRepository';
import { CarTypeORM } from '../entities/Car';

export class CarsRepositoryTypeORM implements CarsRepositoryInterface {
  private repository: Repository<CarTypeORM>;

  constructor() {
    this.repository = getRepository(CarTypeORM);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: CreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      id: uuidV4(),
      available: true,
      brand,
      category_id,
      name,
      license_plate,
      fine_amount,
      description,
      daily_rate,
    });

    const carSaved: CarTypeORM = await this.repository.save(car);

    return this.mapCarFromTypeORM(carSaved);
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    const car = await this.repository.findOne({
      license_plate,
    });

    if (!car) return null;

    return this.mapCarFromTypeORM(car);
  }

  private mapCarFromTypeORM(car: CarTypeORM): Car {
    return {
      id: car.id,
      available: car.available,
      brand: car.brand,
      category_id: car.category_id,
      name: car.name,
      created_at: car.created_at,
      daily_rate: car.daily_rate,
      description: car.description,
      fine_amount: car.fine_amount,
      license_plate: car.license_plate,
    };
  }
}
