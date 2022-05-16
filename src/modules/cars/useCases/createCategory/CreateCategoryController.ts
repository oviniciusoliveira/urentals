import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    try {
      await this.createCategoryUseCase.perform({ name, description });
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }

    return response.status(201).send();
  }
}
