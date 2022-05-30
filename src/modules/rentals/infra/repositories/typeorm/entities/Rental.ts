import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('rentals')
export class RentalTypeORM {
  @PrimaryColumn()
  id!: string;

  @Column()
  car_id!: string;

  @Column()
  user_id!: string;

  @Column()
  start_date!: string;

  @Column()
  end_date?: string;

  @Column()
  expected_return_date!: string;

  @Column()
  total?: number;

  @Column()
  created_at!: string;

  @Column()
  updated_at?: Date;
}
