import { CarsImagesRepository } from '../../infra/repositories';
import { UploadCarImagesController } from './UploadCarImagesController';
import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

export function uploadCarImagesControllerFactory() {
  const carsImagesRepository = new CarsImagesRepository();
  const uploadCarImagesUseCase = new UploadCarImagesUseCase(carsImagesRepository);
  return new UploadCarImagesController(uploadCarImagesUseCase);
}
