import jwt from 'jsonwebtoken';

import { TokenAdapterInterface } from '../interfaces/TokenAdapter';

export class TokenAdapterJWT implements TokenAdapterInterface {
  async generateToken(
    payload: Record<string, any>,
    secretKey: string,
    userID: string,
    expiresIn: number,
  ): Promise<string> {
    const token = jwt.sign(payload, secretKey, {
      expiresIn,
      subject: userID,
    });

    return token;
  }
}
