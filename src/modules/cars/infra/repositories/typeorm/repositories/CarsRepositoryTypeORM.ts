import { getRepository, Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Car } from '@/modules/cars/entities/Car';

import {
  CarsRepositoryInterface,
  CreateCarDTO,
  FindAvailableCarsDTO,
  UpdateCarDTO,
} from '../../interfaces/CarsRepository';
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

    return CarsRepositoryTypeORM.mapCarFromTypeORM(carSaved);
  }

  async update(id: string, data: UpdateCarDTO): Promise<Car | null> {
    const car = await this.repository.findOne({
      id,
    });
    if (!car) return null;
    const carUpdated = await this.repository.save({
      ...car,
      ...data,
    });
    return CarsRepositoryTypeORM.mapCarFromTypeORM(carUpdated);
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    const car = await this.repository.findOne({
      license_plate,
    });

    if (!car) return null;

    return CarsRepositoryTypeORM.mapCarFromTypeORM(car);
  }

  async findAvailable({ brand, category_id, name }: FindAvailableCarsDTO): Promise<Car[]> {
    const query = this.repository.createQueryBuilder('car');

    query.andWhere('car.available = :available', { available: true });

    if (category_id) {
      query.andWhere('car.category_id = :category_id', {
        category_id,
      });
    }

    if (brand) {
      query.andWhere('car.brand = :brand', {
        brand,
      });
    }

    if (name) {
      query.andWhere('car.name = :name', {
        name,
      });
    }

    const cars = await query.leftJoinAndSelect('car.specifications', 'specification').getMany();

    return cars.map((car) => CarsRepositoryTypeORM.mapCarFromTypeORM(car));
  }

  async findByID(id: string): Promise<Car | null> {
    const car = await this.repository.findOne(
      {
        id,
      },
      {
        relations: ['specifications'],
      },
    );

    if (!car) return null;

    return CarsRepositoryTypeORM.mapCarFromTypeORM(car);
  }

  static mapCarFromTypeORM(car: CarTypeORM): Car {
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
      specifications:
        car.specifications?.map((specification) => ({
          id: specification.id,
          createdAt: specification.created_at,
          name: specification.name,
          description: specification.description,
        })) || [],
    };
  }
}
