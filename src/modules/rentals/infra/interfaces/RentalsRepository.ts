import { Rental } from '../../entities/Rental';

export type CreateRentalDTO = {
  carId: string;
  userId: string;
  expectedReturnDate: Date;
};

export type UpdateRentalDTO = {
  endDate: Date | null;
  total: number | null;
};

export interface RentalsRepositoryInterface {
  create(data: CreateRentalDTO): Promise<Rental>;
  update(id: string, data: UpdateRentalDTO): Promise<Rental>;
  findOpenRentalByCarId(carId: string): Promise<Rental | null>;
  findOpenRentalByUserId(userId: string): Promise<Rental | null>;
  findById(id: string): Promise<Rental | null>;
}
