import { PrimaryColumn, Column, CreateDateColumn, Entity } from 'typeorm';

@Entity('specifications')
export class SpecificationTypeORM {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  created_at!: Date;
}
