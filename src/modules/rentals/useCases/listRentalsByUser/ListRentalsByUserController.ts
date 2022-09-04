import { Request, Response } from 'express';

import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase';

export class ListRentalsByUserController {
  constructor(private listRentalsByUserUseCase: ListRentalsByUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    try {
      const rentals = await this.listRentalsByUserUseCase.perform(id);
      return response.status(200).json(rentals);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error',
      });
    }
  }
}
