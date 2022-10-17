import { Rental } from 'src/modules/rentals/entities/Rental';
import { v4 as uuidV4 } from 'uuid';

import { CreateRentalDTO, RentalsRepositoryInterface, UpdateRentalDTO } from '../../interfaces/RentalsRepository';

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

  async update(id: string, data: UpdateRentalDTO): Promise<Rental> {
    const rentalSavedIndex = this.rentals.findIndex((rental) => rental.id === id);
    if (rentalSavedIndex < 0) {
      throw new Error('Rental not found');
    }
    const updateDataWithoutNullFields = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
    this.rentals[rentalSavedIndex] = {
      ...this.rentals[rentalSavedIndex],
      ...updateDataWithoutNullFields,
    };
    return this.rentals[rentalSavedIndex];
  }
  async findById(id: string): Promise<Rental | null> {
    const rental = this.rentals.find((rental) => rental.id === id);
    if (!rental) {
      return null;
    }
    return rental;
  }

  async findByUser(userId: string): Promise<Rental[]> {
    const rentals = this.rentals.filter((rental) => rental.userId === userId);
    return rentals;
  }
}
