import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';

import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  DeleteObjectCommand,
  DeleteObjectCommandInput,
} from '@aws-sdk/client-s3';

import { TEMP_FOLDER } from '../../../../../config/config';
import { StorageAdapterInterface } from '../../interfaces/StorageAdapter';

export class StorageAdapterS3 implements StorageAdapterInterface {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_S3_REGION,
    });
  }

  async save(fileName: string, folder: string): Promise<string> {
    const tempFilePath = resolve(TEMP_FOLDER, fileName);
    const file = await fs.promises.readFile(tempFilePath);
    const contentType = mime.getType(tempFilePath) || undefined;

    const params: PutObjectCommandInput = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${folder}/${fileName}`,
      ACL: 'public-read',
      Body: file,
      ContentType: contentType,
    };

    await this.client.send(new PutObjectCommand(params));
    await fs.promises.unlink(tempFilePath);
    return fileName;
  }
  async delete(fileName: string, folder: string): Promise<void> {
    const params: DeleteObjectCommandInput = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${folder}/${fileName}`,
    };
    await this.client.send(new DeleteObjectCommand(params));
  }
}
