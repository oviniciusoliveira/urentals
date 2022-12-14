import { getRepository, Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Category } from '../../../../entities/Category';
import { CategoriesRepositoryInterface, CreateCategoryDTO } from '../../interfaces/CategoriesRepository';
import { CategoryTypeORM } from '../entities/Category';

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
    return categories.map((category) => this.map(category));
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.repository.findOne({ name });

    if (!category) return null;

    return this.map(category);
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.repository.findOne(id);

    if (!category) return null;

    return this.map(category);
  }

  private map(category: CategoryTypeORM): Category {
    return {
      id: category.id,
      name: category.name,
      createdAt: category.created_at,
      description: category.description,
    };
  }
}
