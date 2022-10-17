import { CarImage } from 'src/modules/cars/entities/CarImage';

export interface CarsImagesRepositoryInterface {
  create(car_id: string, image_name: string): Promise<CarImage>;
}
