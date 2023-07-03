import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../config/base.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { CategoryEntity } from '../../category/entities/category.entity';

@Entity({ name: 'expense' })
export class ExpenseEntity extends BaseEntity {
  @Column()
  expense_name!: string;

  @Column()
  amount!: number;

  @Column()
  date!: Date;

  @Column()
  description!: String;

  @ManyToOne(() => CategoryEntity, (category) => category.expenses)
  @JoinColumn({ name: 'category_id' })
  category!: CategoryEntity;

  @Column()
  isDollar!: boolean;

  @ManyToOne(() => UserEntity, (user) => user.expenses)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}
