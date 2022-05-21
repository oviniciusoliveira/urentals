import { NextFunction, Request, Response } from 'express';

import { TokenAdapter } from '../adapters';
import { UsersRepository } from '../modules/accounts/repositories';

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    return response.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authorizationHeader.split(' ');

  const SECRET_TOKEN_KEY = process.env.SECRET_TOKEN_KEY;

  if (!SECRET_TOKEN_KEY) {
    return response.status(401).json({ error: 'Could not verify token' });
  }

  try {
    const tokenAdapter = new TokenAdapter();
    const { sub } = await tokenAdapter.verifyToken(token, process.env.SECRET_TOKEN_KEY!);

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findByID(sub);

    if (!user) {
      return response.status(401).json({ error: 'User not found' });
    }

    next();
  } catch {
    return response.status(401).json({ error: 'Token invalid' });
  }
}
