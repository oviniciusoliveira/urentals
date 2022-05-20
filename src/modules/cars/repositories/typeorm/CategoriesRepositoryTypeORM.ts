import { getRepository, Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { CategoryTypeORM } from '../../../../database/entities/Category';
import { Category } from '../../entities/Category';
import { CategoriesRepositoryInterface, CreateCategoryDTO } from '../interfaces/CategoriesRepository';

export class CategoriesRepositoryTypeORM implements CategoriesRepositoryInterface {
  private repository: Repository<CategoryTypeORM>;

  constructor() {
    this.repository = getRepository(CategoryTypeORM);
  }

  async create({ name, description }: CreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      id: uuidV4(),
      name,
      description,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      createdAt: category.created_at,
      description: category.description,
    }));
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.repository.findOne({ name });

    if (!category) return null;

    return {
      id: category.id,
      name: category.name,
      createdAt: category.created_at,
      description: category.description,
    };
  }
}
