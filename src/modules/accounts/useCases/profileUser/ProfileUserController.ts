import { Request, Response } from 'express';

import { UserModelUtils } from '../../views/models/User';
import { ProfileUserUseCase } from './ProfileUserUseCase';

export class ProfileUserController {
  constructor(private profileUserUseCase: ProfileUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    try {
      const user = await this.profileUserUseCase.perform(id);
      return response.json(UserModelUtils.map(user));
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}
