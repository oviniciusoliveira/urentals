import { PrimaryColumn, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

import { CategoryTypeORM } from './Category';
import { SpecificationTypeORM } from './Specifications';

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

  @ManyToMany(() => SpecificationTypeORM)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications?: SpecificationTypeORM[];

  @ManyToOne(() => CategoryTypeORM)
  @JoinColumn({ name: 'category_id' })
  category?: CategoryTypeORM;

  @Column()
  category_id!: string;

  @CreateDateColumn()
  created_at!: Date;
}
