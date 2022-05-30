import { Rental } from '../../entities/Rental';

export type CreateRentalDTO = {
  carId: string;
  userId: string;
  expectedReturnDate: Date;
};

export interface RentalsRepositoryInterface {
  create(data: CreateRentalDTO): Promise<Rental>;
  findOpenRentalByCarId(carId: string): Promise<Rental | null>;
  findOpenRentalByUserId(userId: string): Promise<Rental | null>;
}
