import { Request, Response } from 'express';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export class UpdateUserAvatarController {
  constructor(private updateUserUseCase: UpdateUserAvatarUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const avatar = request.file?.filename;

    if (!avatar) {
      return response.status(400).json({
        message: 'Invalid avatar file',
      });
    }

    try {
      await this.updateUserUseCase.perform({
        userID: id,
        avatarFile: avatar,
      });
    } catch (error: any) {
      response.status(400).json(error.message);
    }

    return response.status(200).send();
  }
}
