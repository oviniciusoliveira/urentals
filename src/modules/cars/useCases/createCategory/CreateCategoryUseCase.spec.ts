import { CategoriesRepositoryInterface } from '../../infra/repositories/interfaces/CategoriesRepository';
import { CategoriesRepositoryMemory } from '../../infra/repositories/memory/CategoriesRepositoryMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepository: CategoriesRepositoryInterface;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'any_name',
      description: 'any_description',
    };

    await createCategoryUseCase.perform({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepository.findByName(category.name);

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category if name already exists', async () => {
    const category = {
      name: 'any_name',
      description: 'any_description',
    };

    await createCategoryUseCase.perform({
      name: category.name,
      description: category.description,
    });

    await expect(async () => {
      await createCategoryUseCase.perform({
        name: category.name,
        description: category.description,
      });
    }).rejects.toThrow('Category already exists');
  });
});
