import { parse } from 'csv-parse';
import fs from 'fs';

import { CategoriesRepositoryInterface } from '../../repositories/interfaces/CategoriesRepository';

type ImportCategoryData = {
  name: string;
  description: string;
};

export class ImportCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepositoryInterface) {}

  private async loadCategories(file: Express.Multer.File): Promise<ImportCategoryData[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const loadedCategories: ImportCategoryData[] = [];

      const parser = parse();

      stream.pipe(parser);

      parser.on('data', async (chunk) => {
        const [name, description] = chunk;

        loadedCategories.push({
          name,
          description,
        });
      });

      parser.on('error', (error) => {
        reject(error);
      });

      parser.on('end', () => {
        fs.promises.unlink(file.path);
        resolve(loadedCategories);
      });
    });
  }

  async perform(file: Express.Multer.File): Promise<void> {
    const categoriesFromFile = await this.loadCategories(file);

    categoriesFromFile.map(async (category) => {
      const { name, description } = category;

      const categoryExists = await this.categoriesRepository.findByName(name);

      if (!categoryExists) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }
}
