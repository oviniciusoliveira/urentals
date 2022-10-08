import { Category } from '../../../entities/Category';

export type CreateCategoryDTO = {
  name: string;
  description: string;
};

export interface CategoriesRepositoryInterface {
  create: (data: CreateCategoryDTO) => Promise<void>;
  list: () => Promise<Category[]>;
  findByName: (name: string) => Promise<Category | null>;
  findById: (id: string) => Promise<Category | null>;
}
