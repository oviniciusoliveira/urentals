import { getDiskStorage } from '../../../../shared/infra/adapters';
import { CarsImagesRepository, CarsRepository } from '../../infra/repositories';
import { UploadCarImagesController } from './UploadCarImagesController';
import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

export function uploadCarImagesControllerFactory() {
  const carsImagesRepository = new CarsImagesRepository();
  const storageAdapter = getDiskStorage();
  const carsRepository = new CarsRepository();
  const uploadCarImagesUseCase = new UploadCarImagesUseCase(carsImagesRepository, storageAdapter, carsRepository);
  return new UploadCarImagesController(uploadCarImagesUseCase);
}
