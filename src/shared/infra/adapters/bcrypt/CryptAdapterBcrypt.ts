import bcrypt from 'bcrypt';

import { CryptAdapterInterface } from '../interfaces/CryptAdapter';

export class CryptAdapterBcrypt implements CryptAdapterInterface {
  async encrypt(value: string): Promise<string> {
    return await bcrypt.hash(value, 10);
  }

  async compare(value: string, encryptedValue: string): Promise<boolean> {
    return await bcrypt.compare(value, encryptedValue);
  }
}
