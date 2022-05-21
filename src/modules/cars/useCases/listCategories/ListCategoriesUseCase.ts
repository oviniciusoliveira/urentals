import { Category } from '../../entities/Category';
import { CategoriesRepositoryInterface } from '../../infra/repositories/interfaces/CategoriesRepository';

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepositoryInterface) {}

  async perform(): Promise<Category[]> {
    return await this.categoriesRepository.list();
  }
}
