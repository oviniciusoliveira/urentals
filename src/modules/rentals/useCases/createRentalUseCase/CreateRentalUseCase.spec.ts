import { CarsRepositoryInterface } from '../../../cars/infra/repositories/interfaces/CarsRepository';
import { CarsRepositoryMemory } from '../../../cars/infra/repositories/memory/CarsRepositoryMemory';
import { RentalsRepositoryInterface } from '../../infra/interfaces/RentalsRepository';
import { RentalsRepositoryMemory } from '../../infra/repositories/memory/RentalsRepositoryMemory';
import { CreateRentalUseCase, minimumRentalDurationInMilliseconds } from './CreateRentalUseCase';

let rentalsRepository: RentalsRepositoryInterface;
let carsRepository: CarsRepositoryInterface;
let createRentalUseCase: CreateRentalUseCase;
const futureDateInMilliseconds = new Date().getTime() + minimumRentalDurationInMilliseconds + 1000 * 60;
const futureDate = new Date(futureDateInMilliseconds);

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryMemory();
    carsRepository = new CarsRepositoryMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository, carsRepository);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.perform({
      carId: 'any_car_id',
      userId: 'any_user_id',
      expectedReturnDate: futureDate,
    });

    expect(rental).toHaveProperty('id');
  });

  it('should not be able to create a new rental if user already has a open rental ', async () => {
    await createRentalUseCase.perform({
      carId: 'car_1',
      userId: 'user_1',
      expectedReturnDate: futureDate,
    });

    expect(async () => {
      await createRentalUseCase.perform({
        carId: 'car_2',
        userId: 'user_1',
        expectedReturnDate: futureDate,
      });
    }).rejects.toThrowError('User already has an open rental');
  });

  it('should not be able to create a new rental if car already has a open rental', async () => {
    await createRentalUseCase.perform({
      carId: 'car_1',
      userId: 'user_1',
      expectedReturnDate: futureDate,
    });

    expect(async () => {
      await createRentalUseCase.perform({
        carId: 'car_1',
        userId: 'user_2',
        expectedReturnDate: futureDate,
      });
    }).rejects.toThrowError('Car unavailable');
  });

  it('should not be able to create a new rental if expected return is not greater than the minimum time', async () => {
    expect(async () => {
      await createRentalUseCase.perform({
        carId: 'car_1',
        userId: 'user_1',
        expectedReturnDate: new Date(),
      });
    }).rejects.toThrowError('Expected return date is not greater than the minimum time');
  });
});
