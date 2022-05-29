import { CarImage } from '@/modules/cars/entities/CarImage';

export interface CarsImagesRepositoryInterface {
  create(car_id: string, image_name: string): Promise<CarImage>;
}
