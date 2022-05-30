import { getRepository, Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Rental } from '@/modules/rentals/entities/Rental';

import { CreateRentalDTO, RentalsRepositoryInterface } from '../../interfaces/RentalsRepository';
import { RentalTypeORM } from './entities/Rental';

export class RentalsRepositioryTypeORM implements RentalsRepositoryInterface {
  private repository: Repository<RentalTypeORM>;

  constructor() {
    this.repository = getRepository(RentalTypeORM);
  }

  async create({ carId, expectedReturnDate, userId }: CreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      expected_return_date: expectedReturnDate.toISOString(),
      id: uuidV4(),
      user_id: userId,
      car_id: carId,
    });

    const rentalSaved: RentalTypeORM = await this.repository.save(rental);

    return this.mapRentalFroMTypeORM(rentalSaved);
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental | null> {
    const rental = await this.repository.findOne({
      car_id,
    });

    if (!rental) return null;

    return this.mapRentalFroMTypeORM(rental);
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental | null> {
    const rental = await this.repository.findOne({
      user_id,
    });

    if (!rental) return null;

    return this.mapRentalFroMTypeORM(rental);
  }

  private mapRentalFroMTypeORM(rental: RentalTypeORM): Rental {
    return {
      id: rental.id,
      carId: rental.car_id,
      createdAt: new Date(rental.created_at),
      endDate: rental.end_date ? new Date(rental.end_date) : null,
      expectedReturnDate: new Date(rental.expected_return_date),
      startDate: new Date(rental.start_date),
      total: rental.total || null,
      updatedAt: rental.updated_at ? new Date(rental.updated_at) : null,
      userId: rental.user_id,
    };
  }
}
