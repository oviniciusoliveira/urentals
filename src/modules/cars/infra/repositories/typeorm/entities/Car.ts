/* eslint-disable indent */
import { PrimaryColumn, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CategoryTypeORM } from './Category';

@Entity('cars')
export class CarTypeORM {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  daily_rate!: number;

  @Column()
  available!: boolean;

  @Column()
  license_plate!: string;

  @Column()
  fine_amount!: number;

  @Column()
  brand!: string;

  @ManyToOne(() => CategoryTypeORM)
  @JoinColumn({ name: 'category_id' })
  category?: CategoryTypeORM;

  @Column()
  category_id!: string;

  @CreateDateColumn()
  created_at!: Date;
}
