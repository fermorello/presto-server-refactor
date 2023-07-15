import { BaseEntity } from '../../config/base.entity';
import { UserCategoryEntity } from '../../custom/entities/user-category.entity';
import { ExpenseEntity } from '../../expense/entities/expense.entity';
import { Entity, Column, OneToMany, Index } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity extends BaseEntity {
  @Column()
  @Index({ unique: true })
  name!: string;

  @OneToMany(() => ExpenseEntity, expense => expense.category)
  expenses!: ExpenseEntity[];

  @OneToMany(
    () => UserCategoryEntity,
    (UserCategory) => UserCategory.category
  )
  UserCategory!: UserCategoryEntity;
}