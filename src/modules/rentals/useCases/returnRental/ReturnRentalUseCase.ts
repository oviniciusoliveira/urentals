import { CarsRepositoryInterface } from 'src/modules/cars/infra/repositories/interfaces/CarsRepository';
import { DateAdapterInterface } from 'src/shared/infra/adapters/interfaces/DateAdapter';

import { Rental } from '../../entities/Rental';
import { RentalsRepositoryInterface } from '../../infra/interfaces/RentalsRepository';

type ReturnRentalUseCaseData = {
  rentalId: string;
};

export class ReturnRentalUseCase {
  private minimumRentalDurationInDays = 1;

  constructor(
    private rentalsRepository: RentalsRepositoryInterface,
    private carsRepository: CarsRepositoryInterface,
    private dateAdapter: DateAdapterInterface,
  ) {}

  async perform({ rentalId }: ReturnRentalUseCaseData): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rentalId);
    if (!rental) {
      throw new Error('Rental does not exists');
    }
    if (rental.endDate !== null) {
      throw new Error('This rental is already closed');
    }
    const car = await this.carsRepository.findByID(rental.carId);
    if (!car) {
      throw new Error('Car not found');
    }

    let total = 0;
    let rentalDaysDuration = this.dateAdapter.diffInDays(new Date(rental.startDate), new Date());
    if (rentalDaysDuration <= this.minimumRentalDurationInDays - 1) {
      rentalDaysDuration = this.minimumRentalDurationInDays;
    }
    total += rentalDaysDuration * car.daily_rate;

    const extapolatedDays = this.dateAdapter.diffInDays(new Date(rental.expectedReturnDate), new Date());
    if (extapolatedDays > 0) {
      total += extapolatedDays * car.fine_amount;
    }
    rental.endDate = new Date();
    rental.total = total;

    const rentalUpdated = await this.rentalsRepository.update(rental.id, {
      total: rental.total,
      endDate: rental.endDate,
    });
    await this.carsRepository.update(car.id, {
      available: true,
    });

    return rentalUpdated;
  }
}
