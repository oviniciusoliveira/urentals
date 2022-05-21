import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '../../../../modules/accounts/infra/repositories';

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findByID(id);

  if (!user || !user.isAdmin) {
    return response.status(401).json({
      message: 'You must be an admin to access this route',
    });
  }

  return next();
}
