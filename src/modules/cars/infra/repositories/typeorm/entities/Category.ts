import { PrimaryColumn, Column, CreateDateColumn, Entity } from 'typeorm';

@Entity('categories')
export class CategoryTypeORM {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  created_at!: Date;
}
