import { Car } from '@/modules/cars/entities/Car';

export type CreateCarDTO = {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
};

export interface CarsRepositoryInterface {
  create(data: CreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | null>;
}
