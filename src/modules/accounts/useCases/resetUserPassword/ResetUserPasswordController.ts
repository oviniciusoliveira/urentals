import { Request, Response } from 'express';

import { ResetUserPasswordUseCase } from './ResetUserPasswordUseCase';

export class ResetUserPasswordController {
  constructor(private resetUserPasswordUseCase: ResetUserPasswordUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;
    if (!token || !password) {
      return response.status(400).send('Invalid reset password request');
    }

    try {
      await this.resetUserPasswordUseCase.perform({ resetToken: String(token), newPassword: password });
      return response.status(201).send();
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}
