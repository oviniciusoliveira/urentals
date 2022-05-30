import { Request, Response } from 'express';

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

interface Files {
  filename: string;
}

export class UploadCarImagesController {
  constructor(private uploadCarImagesUseCase: UploadCarImagesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const images = request.files as Files[];

    const imagesName = images.map((file) => file.filename);

    try {
      await this.uploadCarImagesUseCase.perform({
        carId: id,
        imagesName,
      });
      return response.status(201).send();
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.',
      });
    }
  }
}
