import { CategoriesRepository } from '../../repositories';
import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

export function importCategoryControllerFactory(): ImportCategoryController {
  const categoriesRepository = new CategoriesRepository();
  const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
  return new ImportCategoryController(importCategoryUseCase);
}
