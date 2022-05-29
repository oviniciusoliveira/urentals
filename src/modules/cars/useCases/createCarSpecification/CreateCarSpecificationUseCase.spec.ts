import { CarsRepositoryInterface } from '../../infra/repositories/interfaces/CarsRepository';
import { SpecificationsRepositoryInterface } from '../../infra/repositories/interfaces/SpecificationsRepository';
import { CarsRepositoryMemory } from '../../infra/repositories/memory/CarsRepositoryMemory';
import { SpecificationsRepositoryMemory } from '../../infra/repositories/memory/SpecificationsRepositoryMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let carsRepository: CarsRepositoryInterface;
let specificationsRepository: SpecificationsRepositoryInterface;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryMemory();
    specificationsRepository = new SpecificationsRepositoryMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepository, specificationsRepository);
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepository.create({
      brand: 'any_brand',
      category_id: '1',
      daily_rate: 100,
      description: 'any_description',
      fine_amount: 10,
      license_plate: 'any_license_plate',
      name: 'any_name',
    });

    const specification1 = await specificationsRepository.create({
      name: 'any_specification_name_1',
      description: 'any_specification_description_1',
    });

    const specification2 = await specificationsRepository.create({
      name: 'any_specification_name_2',
      description: 'any_specification_description_2',
    });

    const specifications_id = [specification1.id, specification2.id];

    const carWithSpecifications = await createCarSpecificationUseCase.perform({
      car_id: car.id,
      specifications_id,
    });

    expect(carWithSpecifications).toHaveProperty('specifications');
    expect(carWithSpecifications.specifications).toHaveLength(2);
  });

  it('should not be able to add a new specification to a unregistered car', async () => {
    const car_id = '1';
    const specifications_id = ['1', '2'];

    await expect(async () => {
      await createCarSpecificationUseCase.perform({
        car_id,
        specifications_id,
      });
    }).rejects.toThrow('Car not found');
  });

  it('should correctly add a specification in a car with existing specifications', async () => {
    const car = await carsRepository.create({
      brand: 'any_brand',
      category_id: '1',
      daily_rate: 100,
      description: 'any_description',
      fine_amount: 10,
      license_plate: 'any_license_plate',
      name: 'any_name',
    });

    const specification1 = await specificationsRepository.create({
      name: 'any_specification_name_1',
      description: 'any_specification_description_1',
    });

    const carWithSpecifications = await createCarSpecificationUseCase.perform({
      car_id: car.id,
      specifications_id: [specification1.id],
    });

    const specification2 = await specificationsRepository.create({
      name: 'any_specification_name_2',
      description: 'any_specification_description_2',
    });

    expect(carWithSpecifications).toHaveProperty('specifications');
    expect(carWithSpecifications.specifications).toHaveLength(1);

    const carWithSpecificationsSecondCall = await createCarSpecificationUseCase.perform({
      car_id: car.id,
      specifications_id: [specification2.id],
    });

    expect(carWithSpecificationsSecondCall).toHaveProperty('specifications');
    expect(carWithSpecificationsSecondCall.specifications).toHaveLength(2);
  });
});
