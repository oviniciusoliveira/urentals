import { Car } from '@/modules/cars/entities/Car';

import { CarsRepositoryInterface } from '../../../cars/infra/repositories/interfaces/CarsRepository';
import { CarsRepositoryMemory } from '../../../cars/infra/repositories/memory/CarsRepositoryMemory';
import { RentalsRepositoryInterface } from '../../infra/interfaces/RentalsRepository';
import { RentalsRepositoryMemory } from '../../infra/repositories/memory/RentalsRepositoryMemory';
import { CreateRentalUseCase, minimumRentalDurationInMilliseconds } from './CreateRentalUseCase';

let rentalsRepository: RentalsRepositoryInterface;
let carsRepository: CarsRepositoryInterface;
let createRentalUseCase: CreateRentalUseCase;
let car: Car;
const futureDateInMilliseconds = new Date().getTime() + minimumRentalDurationInMilliseconds + 1000 * 60;
const futureDate = new Date(futureDateInMilliseconds);

describe('Create Rental', () => {
  beforeEach(async () => {
    rentalsRepository = new RentalsRepositoryMemory();
    carsRepository = new CarsRepositoryMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository, carsRepository);
    car = await carsRepository.create({
      name: 'any_car_name',
      license_plate: 'any_license_plate',
      description: 'any_description',
      brand: 'any_brand',
      category_id: 'any_category',
      daily_rate: 100,
      fine_amount: 30,
    });
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.perform({
      carId: car.id,
      userId: 'any_user_id',
      expectedReturnDate: futureDate,
    });

    expect(rental).toHaveProperty('id');
  });

  it('should not be able to create a new rental if user already has a open rental ', async () => {
    const car1 = await carsRepository.create({
      name: 'any_car_name_1',
      license_plate: 'any_license_plate_1',
      description: 'any_description_1',
      brand: 'any_brand',
      category_id: 'any_category',
      daily_rate: 100,
      fine_amount: 30,
    });

    const car2 = await carsRepository.create({
      name: 'any_car_name_2',
      license_plate: 'any_license_plate_2',
      description: 'any_description_2',
      brand: 'any_brand',
      category_id: 'any_category',
      daily_rate: 100,
      fine_amount: 30,
    });

    await createRentalUseCase.perform({
      carId: car1.id,
      userId: 'user_1',
      expectedReturnDate: futureDate,
    });

    expect(async () => {
      await createRentalUseCase.perform({
        carId: car2.id,
        userId: 'user_1',
        expectedReturnDate: futureDate,
      });
    }).rejects.toThrowError('User already has an open rental');
  });

  it('should not be able to create a new rental if car already has a open rental', async () => {
    const car1 = await carsRepository.create({
      name: 'any_car_name_1',
      license_plate: 'any_license_plate_1',
      description: 'any_description_1',
      brand: 'any_brand',
      category_id: 'any_category',
      daily_rate: 100,
      fine_amount: 30,
    });

    await createRentalUseCase.perform({
      carId: car1.id,
      userId: 'user_1',
      expectedReturnDate: futureDate,
    });

    expect(async () => {
      await createRentalUseCase.perform({
        carId: car1.id,
        userId: 'user_2',
        expectedReturnDate: futureDate,
      });
    }).rejects.toThrowError('Car unavailable');
  });

  it('should not be able to create a new rental if expected return is not greater than the minimum time', async () => {
    expect(async () => {
      await createRentalUseCase.perform({
        carId: car.id,
        userId: 'user_1',
        expectedReturnDate: new Date(),
      });
    }).rejects.toThrowError('Expected return date is not greater than the minimum time');
  });
});
