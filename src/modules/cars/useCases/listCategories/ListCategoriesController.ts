import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

export class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const categories = await this.listCategoriesUseCase.perform();
      return response.json(categories);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
