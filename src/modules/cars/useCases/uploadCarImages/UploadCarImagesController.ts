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

    await this.uploadCarImagesUseCase.perform({
      carId: id,
      imagesName,
    });

    return response.status(201).send();
  }
}
