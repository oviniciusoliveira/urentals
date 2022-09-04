import { Request, Response } from 'express';

import { ReturnRentalUseCase } from './ReturnRentalUseCase';

export class ReturnRentalController {
  constructor(private returnRentalUseCase: ReturnRentalUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const rental = await this.returnRentalUseCase.perform({
        rentalId: id,
      });

      return response.status(200).json(rental);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error',
      });
    }
  }
}
