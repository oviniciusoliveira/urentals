/* eslint-disable indent */
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { UserTypeORM } from './User';

@Entity('users_reset_password_token')
export class UserResetPasswordTokenORM {
  @PrimaryColumn()
  id!: string;

  @Column()
  reset_password_token!: string;

  @Column()
  user_id!: string;

  @Column()
  expires_date!: Date;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => UserTypeORM)
  @JoinColumn({ name: 'user_id' })
  user!: UserTypeORM;
}
