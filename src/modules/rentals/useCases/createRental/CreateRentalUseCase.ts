import { CarsRepositoryInterface } from '../../../cars/infra/repositories/interfaces/CarsRepository';
import { Rental } from '../../entities/Rental';
import { RentalsRepositoryInterface } from '../../infra/interfaces/RentalsRepository';

type CreateRentalUseCaseData = {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
};

export const minimumRentalDurationInMilliseconds = 24 * 60 * 60 * 1000; // 1 day

export class CreateRentalUseCase {
  constructor(private rentalsRepository: RentalsRepositoryInterface, private carsRepository: CarsRepositoryInterface) {}

  async perform({ carId, userId, expectedReturnDate }: CreateRentalUseCaseData): Promise<Rental> {
    const car = await this.carsRepository.findByID(carId);
    if (!car) {
      throw new Error('Car not found');
    }

    const carAlreadyInRent = await this.rentalsRepository.findOpenRentalByCarId(carId);

    if (carAlreadyInRent) {
      throw new Error('Car unavailable');
    }

    const userAlreadyInRent = await this.rentalsRepository.findOpenRentalByUserId(userId);

    if (userAlreadyInRent) {
      throw new Error('User already has an open rental');
    }

    const differenceBetweenExpectedReturnDateAndNow = expectedReturnDate.getTime() - new Date().getTime();

    if (differenceBetweenExpectedReturnDateAndNow < minimumRentalDurationInMilliseconds) {
      throw new Error('Expected return date is not greater than the minimum time');
    }

    const rental = await this.rentalsRepository.create({
      carId,
      userId,
      expectedReturnDate,
    });

    await this.carsRepository.update(carId, { available: false });

    return rental;
  }
}
