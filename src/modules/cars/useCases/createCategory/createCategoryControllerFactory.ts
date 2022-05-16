import { CategoriesRepository } from '../../repositories';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export function createCategoryControllerFactory(): CreateCategoryController {
  const categoriesRepository = new CategoriesRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  return new CreateCategoryController(createCategoryUseCase);
}
