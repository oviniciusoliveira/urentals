import { Car } from '@/modules/cars/entities/Car';
import { Specification } from '@/modules/cars/entities/Specification';

export type CreateCarDTO = {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: Specification[];
};

export type UpdateCarDTO = {
  name?: string;
  description?: string;
  daily_rate?: number;
  license_plate?: string;
  fine_amount?: number;
  brand?: string;
  category_id?: string;
  specifications?: Specification[];
};

export type FindAvailableCarsDTO = {
  category_id?: string;
  brand?: string;
  name?: string;
};

export interface CarsRepositoryInterface {
  create(data: CreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | null>;
  findAvailable(data: FindAvailableCarsDTO): Promise<Car[]>;
  findByID(id: string): Promise<Car | null>;
  update(id: string, data: UpdateCarDTO): Promise<Car | null>;
}
