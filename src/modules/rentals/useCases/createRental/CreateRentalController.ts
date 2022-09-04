import { Request, Response } from 'express';

import { CreateRentalUseCase } from './CreateRentalUseCase';

export class CreateRentalController {
  constructor(private createRentalUseCase: CreateRentalUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { expected_return_date, car_id } = request.body;
    const userId = request.user.id;

    try {
      const rental = await this.createRentalUseCase.perform({
        carId: car_id,
        expectedReturnDate: new Date(expected_return_date),
        userId,
      });
      return response.status(201).json(rental);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.',
      });
    }
  }
}
