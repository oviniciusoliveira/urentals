import { Request, Response } from 'express';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license } = request.body;

    const avatar = request.file?.filename;

    try {
      await this.createUserUseCase.perform({
        name,
        email,
        password,
        driver_license,
        avatar: avatar,
      });
      return response.status(201).send();
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}
