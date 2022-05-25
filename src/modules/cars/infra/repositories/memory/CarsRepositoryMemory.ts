import { v4 as uuidV4 } from 'uuid';

import { Car } from '../../../entities/Car';
import { CarsRepositoryInterface, CreateCarDTO, FindAvailableCarsDTO } from '../interfaces/CarsRepository';

export class CarsRepositoryMemory implements CarsRepositoryInterface {
  cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications = [],
  }: CreateCarDTO): Promise<Car> {
    const car: Car = {
      id: uuidV4(),
      name,
      description,
      created_at: new Date(),
      available: true,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
      specifications,
    };

    this.cars.push(car);

    return car;
  }

  async update(id: string, data: CreateCarDTO): Promise<Car | null> {
    const carIndex = this.cars.findIndex((car) => car.id === id);

    if (carIndex === -1) return null;

    const carUpdated: Car = {
      ...this.cars[carIndex],
      ...data,
    };

    this.cars[carIndex] = carUpdated;

    return carUpdated;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    const car = this.cars.find((car) => car.license_plate === license_plate);
    return car || null;
  }

  async findAvailable({ brand, category_id, name }: FindAvailableCarsDTO): Promise<Car[]> {
    let cars = this.cars.filter((car) => car.available);

    if (brand) {
      cars = cars.filter((car) => car.brand === brand);
    }

    if (category_id) {
      cars = cars.filter((car) => car.category_id === category_id);
    }

    if (name) {
      cars = cars.filter((car) => car.name === name);
    }

    return cars;
  }

  async findByID(id: string): Promise<Car | null> {
    const car = this.cars.find((car) => car.id === id);

    return car || null;
  }
}
