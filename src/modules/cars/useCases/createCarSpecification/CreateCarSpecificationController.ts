import { Request, Response } from 'express';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

export class CreateCarSpecificationController {
  constructor(private createCarSpecificationUseCase: CreateCarSpecificationUseCase) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { specifications_id } = request.body;

    try {
      const car = await this.createCarSpecificationUseCase.perform({
        car_id: id,
        specifications_id,
      });

      return response.status(201).json(car);
    } catch (error: any) {
      return response.status(400).send({
        message: error.message || 'Unexpected error.',
      });
    }
  }
}
