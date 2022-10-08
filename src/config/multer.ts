import crypto from 'crypto';
import multer from 'multer';

import { TEMP_FOLDER } from './config';

export const multerConfig: multer.Options = {
  storage: multer.diskStorage({
    destination: TEMP_FOLDER,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
