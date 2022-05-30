export type Rental = {
  id: string;
  carId: string;
  userId: string;
  startDate: Date;
  endDate: Date | null;
  expectedReturnDate: Date;
  total: number | null;
  createdAt: Date;
  updatedAt: Date | null;
};
