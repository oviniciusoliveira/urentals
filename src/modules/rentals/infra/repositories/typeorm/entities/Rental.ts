import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { CarTypeORM } from '../../../../../cars/infra/repositories/typeorm/entities/Car';

@Entity('rentals')
export class RentalTypeORM {
  @PrimaryColumn()
  id!: string;

  @ManyToOne(() => CarTypeORM)
  @JoinColumn({
    name: 'car_id',
  })
  car?: CarTypeORM;

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

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
