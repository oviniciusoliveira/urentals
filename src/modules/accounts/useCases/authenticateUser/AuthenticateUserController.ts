import { Request, Response } from 'express';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const session = await this.authenticateUserUseCase.perform({
        email,
        password,
      });

      return response.status(200).json({ ...session });
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}
