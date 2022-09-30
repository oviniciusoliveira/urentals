import { Request, Response } from 'express';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

export class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const refreshToken = request.body.refresh_token;
    if (!refreshToken) {
      return response.status(400).send('Invalid refresh session request');
    }
    try {
      const data = await this.refreshTokenUseCase.perform(refreshToken);
      return response.status(200).json({
        token: data.newToken,
        refreshToken: data.newRefreshToken,
      });
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}
