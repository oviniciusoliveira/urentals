import { getRepository, Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { CarImage } from '@/modules/cars/entities/CarImage';

import { CarsImagesRepositoryInterface } from '../../interfaces/CarsImagesRepository';
import { CarImageTypeORM } from '../entities/CarImage';

export class CarsImagesRepositoryTypeORM implements CarsImagesRepositoryInterface {
  private repository: Repository<CarImageTypeORM>;

  constructor() {
    this.repository = getRepository(CarImageTypeORM);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      id: uuidV4(),
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return this.mapToDomain(carImage);
  }

  private mapToDomain(carImage: CarImageTypeORM): CarImage {
    return {
      id: carImage.id,
      carId: carImage.car_id,
      imageName: carImage.image_name,
      createdAt: carImage.created_at,
    };
  }
}
