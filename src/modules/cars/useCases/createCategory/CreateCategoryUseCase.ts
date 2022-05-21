import {
  CategoriesRepositoryInterface,
  CreateCategoryDTO,
} from '../../infra/repositories/interfaces/CategoriesRepository';

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepositoryInterface) {}

  async perform({ name, description }: CreateCategoryDTO): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    await this.categoriesRepository.create({
      name,
      description,
    });
  }
}
