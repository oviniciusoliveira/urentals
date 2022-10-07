import { Request, Response } from 'express';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

export class SendForgotPasswordMailController {
  constructor(private sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    if (!email) {
      return response.status(400).json('User email should be informed');
    }
    try {
      await this.sendForgotPasswordMailUseCase.perform(email);
      return response.send();
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}
