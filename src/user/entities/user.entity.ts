import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../config/base.entity';
import { ExpenseEntity } from '../../expense/entities/expense.entity';
import { UserCategoryEntity } from '../../custom/entities/user-category.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column()
  username!: string;

  @Column()
  email!: string;

  @Exclude()
  @Column({ select: false })
  password!: string;

  @OneToMany(() => ExpenseEntity, (expense) => expense.user)
  expenses!: ExpenseEntity[];

  @OneToMany(
    () => UserCategoryEntity,
    (UserCategory) => UserCategory.user
  )
  UserCategory!: UserCategoryEntity;
}
