import { CarsRepositoryInterface } from '../../infra/repositories/interfaces/CarsRepository';
import { CategoriesRepositoryInterface } from '../../infra/repositories/interfaces/CategoriesRepository';
import { CarsRepositoryMemory } from '../../infra/repositories/memory/CarsRepositoryMemory';
import { CategoriesRepositoryMemory } from '../../infra/repositories/memory/CategoriesRepositoryMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInterface;
let categoriesRepository: CategoriesRepositoryInterface;

describe('Create Car', () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryMemory();
    carsRepository = new CarsRepositoryMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository, categoriesRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.perform({
      name: 'name_car',
      description: 'description_car',
      brand: 'brand_car',
      license_plate: 'ABC-1234',
      category_id: '1',
      daily_rate: 100,
      fine_amount: 10,
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with same license plate', async () => {
    await createCarUseCase.perform({
      name: 'name_car',
      description: 'description_car',
      brand: 'brand_car',
      license_plate: 'ABC-1234',
      category_id: '1',
      daily_rate: 100,
      fine_amount: 10,
    });
    await expect(async () => {
      await createCarUseCase.perform({
        name: 'name_car',
        description: 'description_car',
        brand: 'brand_car',
        license_plate: 'ABC-1234',
        category_id: '1',
        daily_rate: 100,
        fine_amount: 10,
      });
    }).rejects.toThrow('Car with this license plate already exists');
  });

  it('should always create a new car with available by default', async () => {
    const car = await createCarUseCase.perform({
      name: 'name_car',
      description: 'description_car',
      brand: 'brand_car',
      license_plate: 'ABC-1234',
      category_id: '1',
      daily_rate: 100,
      fine_amount: 10,
    });

    expect(car).toHaveProperty('available', true);
  });
});
