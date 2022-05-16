import { Request, Response } from 'express';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

export class ImportCategoryController {
  constructor(private readonly importCategoryUseCase: ImportCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    if (!file) return response.status(400).send();

    try {
      await this.importCategoryUseCase.perform(file);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }

    return response.status(201).send();
  }
}
