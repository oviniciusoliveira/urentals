import { CategoriesRepository } from '../../infra/repositories';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

export function listCategoriesControllerFactory(): ListCategoriesController {
  const categoriesRepository = new CategoriesRepository();
  const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
  return new ListCategoriesController(listCategoriesUseCase);
}
