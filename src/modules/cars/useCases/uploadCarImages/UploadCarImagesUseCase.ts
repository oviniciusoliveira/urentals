import { StorageAdapterInterface } from '@/shared/infra/adapters/interfaces/StorageAdapter';

import { CarsImagesRepositoryInterface } from '../../infra/repositories/interfaces/CarsImagesRepository';
import { CarsRepositoryInterface } from '../../infra/repositories/interfaces/CarsRepository';

type UploadCarImagesUseCaseData = {
  carId: string;
  imagesName: string[];
};

export class UploadCarImagesUseCase {
  constructor(
    private carsImagesRepository: CarsImagesRepositoryInterface,
    private storageAdapter: StorageAdapterInterface,
    private carsRepository: CarsRepositoryInterface,
  ) {}

  async perform({ carId, imagesName }: UploadCarImagesUseCaseData): Promise<void> {
    const car = await this.carsRepository.findByID(carId);
    if (!car) {
      throw new Error('Car not found');
    }

    imagesName.forEach(async (image) => {
      await this.carsImagesRepository.create(carId, image);
      await this.storageAdapter.save(image, 'cars');
    });
  }
}
