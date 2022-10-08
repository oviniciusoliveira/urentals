import fs from 'fs';
import { resolve } from 'path';

import { TEMP_FOLDER } from '../../../../../config/config';
import { StorageAdapterInterface } from '../../interfaces/StorageAdapter';

export class StorageAdapterLocal implements StorageAdapterInterface {
  async save(fileName: string, folder: string): Promise<string> {
    const tempPath = resolve(TEMP_FOLDER, fileName);
    const localPath = resolve(TEMP_FOLDER, folder, fileName);
    await fs.promises.rename(tempPath, localPath);
    return fileName;
  }
  async delete(fileName: string, folder: string): Promise<void> {
    const filePath = resolve(TEMP_FOLDER, folder, fileName);
    try {
      await fs.promises.stat(filePath);
      await fs.promises.unlink(filePath);
    } catch {
      throw new Error('Error deleting file');
    }
  }
}
