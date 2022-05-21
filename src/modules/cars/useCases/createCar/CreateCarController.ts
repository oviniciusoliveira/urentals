import { Request, Response } from 'express';

import { CreateCarUseCase } from './CreateCarUseCase';

export class CreateCarController {
  constructor(private createCarUseCase: CreateCarUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, daily_rate, license_plate, fine_amount, brand, category_id } = request.body;

    console.log(fine_amount);

    const car = await this.createCarUseCase.perform({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return response.status(201).json(car);
  }
}
