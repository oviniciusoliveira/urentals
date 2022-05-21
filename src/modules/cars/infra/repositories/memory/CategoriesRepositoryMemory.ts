import { v4 as uuidV4 } from 'uuid';

import { Category } from '../../../entities/Category';
import { CategoriesRepositoryInterface, CreateCategoryDTO } from '../interfaces/CategoriesRepository';

export class CategoriesRepositoryMemory implements CategoriesRepositoryInterface {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  async create(data: CreateCategoryDTO): Promise<void> {
    const newCategory: Category = {
      id: uuidV4(),
      name: data.name,
      description: data.description,
      createdAt: new Date(),
    };

    this.categories.push(newCategory);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.name === name);

    if (!category) return null;

    return category;
  }
}
