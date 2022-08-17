import fs from 'fs';

export const deleteLocalFile = async (filePath: string) => {
  try {
    await fs.promises.stat(filePath);
    await fs.promises.unlink(filePath);
  } catch {
    throw new Error('Error deleting file');
  }
};
