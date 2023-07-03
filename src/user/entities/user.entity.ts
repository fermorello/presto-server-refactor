import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column()
  username!: string;

  @Column()
  email!: string;

  @Exclude()
  @Column({ select: false })
  password!: string;
}
