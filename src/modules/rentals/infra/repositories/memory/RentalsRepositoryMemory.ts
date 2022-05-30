import { v4 as uuidV4 } from 'uuid';

import { Rental } from '@/modules/rentals/entities/Rental';

import { CreateRentalDTO, RentalsRepositoryInterface } from '../../interfaces/RentalsRepository';

export class RentalsRepositoryMemory implements RentalsRepositoryInterface {
  private rentals: Rental[] = [];

  async create({ carId, expectedReturnDate, userId }: CreateRentalDTO): Promise<Rental> {
    const rental: Rental = {
      id: uuidV4(),
      carId,
      createdAt: new Date(),
      endDate: null,
      expectedReturnDate,
      userId,
      startDate: new Date(),
      total: null,
      updatedAt: null,
    };

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCarId(carId: string): Promise<Rental | null> {
    const rental = this.rentals.find((rental) => rental.carId === carId && !rental.endDate);

    if (!rental) return null;

    return rental;
  }

  async findOpenRentalByUserId(userId: string): Promise<Rental | null> {
    const rental = this.rentals.find((rental) => rental.userId === userId && !rental.endDate);

    if (!rental) return null;

    return rental;
  }
}
