import { CarsRepositoryMemory } from '../../infra/repositories/memory/CarsRepositoryMemory';
import { CreateCarUseCase } from '../createCar/CreateCarUseCase';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepository: CarsRepositoryMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let createCarUseCase: CreateCarUseCase;

describe('List Available Cars', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to list all available cars', async () => {
    await createCarUseCase.perform({
      brand: 'any_brand',
      category_id: 'any_category',
      daily_rate: 100,
      description: 'any_description',
      fine_amount: 10,
      license_plate: 'license_plate_1',
      name: 'any_name',
    });

    await createCarUseCase.perform({
      brand: 'any_brand',
      category_id: 'any_category',
      daily_rate: 100,
      description: 'any_description',
      fine_amount: 10,
      license_plate: 'license_plate_2',
      name: 'any_name',
    });

    const cars = await listAvailableCarsUseCase.perform({});

    expect(cars).toHaveLength(2);
  });

  it('should be able to list all available cars by car name', async () => {
    await createCarUseCase.perform({
      brand: 'any_brand',
      category_id: 'any_category',
      daily_rate: 100,
      description: 'any_description',
      fine_amount: 10,
      license_plate: 'license_plate_1',
      name: 'any_name_1',
    });

    await createCarUseCase.perform({
      brand: 'any_brand',
      category_id: 'any_category',
      daily_rate: 100,
      description: 'any_description',
      fine_amount: 10,
      license_plate: 'license_plate_2',
      name: 'any_name_2',
    });

    const cars = await listAvailableCarsUseCase.perform({
      name: 'any_name_1',
    });

    expect(cars).toHaveLength(1);
  });

  it('should be able to list all available cars by car brand', async () => {
    await createCarUseCase.perform({
      brand: 'any_brand_1',
      category_id: 'any_category',
      daily_rate: 100,
      description: 'any_description',
      fine_amount: 10,
      license_plate: 'license_plate_1',
      name: 'any_name',
    });

    await createCarUseCase.perform({
      brand: 'any_brand_2',
      category_id: 'any_category',
      daily_rate: 100,
      description: 'any_description',
      fine_amount: 10,
      license_plate: 'license_plate_2',
      name: 'any_name',
    });

    const cars = await listAvailableCarsUseCase.perform({
      brand: 'any_brand_1',
    });

    expect(cars).toHaveLength(1);
  });

  it('should be able to list all available cars by car category', async () => {
    await createCarUseCase.perform({
      brand: 'any_brand',
      category_id: 'any_category_1',
      daily_rate: 100,
      description: 'any_description',
      fine_amount: 10,
      license_plate: 'license_plate_1',
      name: 'any_name',
    });

    await createCarUseCase.perform({
      brand: 'any_brand2',
      category_id: 'any_category_2',
      daily_rate: 100,
      description: 'any_description',
      fine_amount: 10,
      license_plate: 'license_plate_2',
      name: 'any_name',
    });

    const cars = await listAvailableCarsUseCase.perform({
      category_id: 'any_category_1',
    });

    expect(cars).toHaveLength(1);
  });
});
