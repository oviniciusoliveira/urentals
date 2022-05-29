import { CarsImagesRepositoryInterface } from '../../infra/repositories/interfaces/CarsImagesRepository';

type UploadCarImagesUseCaseData = {
  carId: string;
  imagesName: string[];
};

export class UploadCarImagesUseCase {
  constructor(private carsImagesRepository: CarsImagesRepositoryInterface) {}

  async perform({ carId, imagesName }: UploadCarImagesUseCaseData): Promise<void> {
    imagesName.forEach(async (image) => {
      await this.carsImagesRepository.create(carId, image);
    });
  }
}
