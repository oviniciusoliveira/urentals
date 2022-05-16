import { Request, Response } from 'express';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

export class CreateSpecificationController {
  constructor(private readonly createSpecificationUseCase: CreateSpecificationUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    try {
      await this.createSpecificationUseCase.perform({ name, description });
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }

    return response.status(201).send();
  }
}
