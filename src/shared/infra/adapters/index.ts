/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { StorageAdapterInterface } from './interfaces/StorageAdapter';
import { StorageAdapterLocal } from './storage/local/StorageAdapterLocal';
import { StorageAdapterS3 } from './storage/s3/StorageAdapterS3';

export { CryptAdapterBcrypt as CryptAdapter } from './bcrypt/CryptAdapterBcrypt';
export { TokenAdapterJWT as TokenAdapter } from './jsonwebtoken/TokenAdapterJWT';
export { DateAdapterDate as DateAdapter } from './date/DateAdapterDate';
export { MailAdapterEthereal as MailAdapter } from './mail/ethereal/MailAdapterEthereal';

export { StorageAdapterLocal } from './storage/local/StorageAdapterLocal';

export type DiskStorages = 'local' | 's3';

export function getDiskStorage(): StorageAdapterInterface {
  const diskStorages: Record<DiskStorages, StorageAdapterInterface> = {
    local: new StorageAdapterLocal(),
    s3: new StorageAdapterS3(),
  };
  return diskStorages[process.env.DISK_STORAGE! as DiskStorages];
}
