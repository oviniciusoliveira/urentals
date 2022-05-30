import { Request, Response } from 'express';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

export class ListAvailableCarsController {
  constructor(private listAvailableCarsUseCase: ListAvailableCarsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;

    if (brand && typeof brand !== 'string') {
      return response.status(400).json({
        error: 'The brand must be a string',
      });
    }

    if (name && typeof name !== 'string') {
      return response.status(400).json({
        error: 'The name must be a string',
      });
    }

    if (category_id && typeof category_id !== 'string') {
      return response.status(400).json({
        error: 'The category_id must be a string',
      });
    }

    try {
      const cars = await this.listAvailableCarsUseCase.perform({
        brand,
        category_id,
        name,
      });
      return response.status(200).json(cars);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.',
      });
    }
  }
}
