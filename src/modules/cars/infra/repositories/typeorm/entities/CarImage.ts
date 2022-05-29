import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('cars_image')
export class CarImageTypeORM {
  @PrimaryColumn()
  id!: string;

  @Column()
  car_id!: string;

  @Column()
  image_name!: string;

  @CreateDateColumn()
  created_at!: Date;
}
