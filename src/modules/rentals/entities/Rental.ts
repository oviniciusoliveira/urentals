import { Car } from '@/modules/cars/entities/Car';

export type Rental = {
  id: string;
  carId: string;
  car?: Car;
  userId: string;
  startDate: Date;
  endDate: Date | null;
  expectedReturnDate: Date;
  total: number | null;
  createdAt: Date;
  updatedAt: Date | null;
};
