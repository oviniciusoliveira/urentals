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

  async verifyToken(token: string, secretKey: string): Promise<any | null> {
    return jwt.verify(token, secretKey, function (err, decoded) {
      if (err) {
        return null;
      } else {
        return decoded;
      }
    });
  }
}
