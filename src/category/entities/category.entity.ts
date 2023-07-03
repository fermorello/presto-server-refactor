import { BaseEntity } from '../../config/base.entity';
import { ExpenseEntity } from '../../expense/entities/expense.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity extends BaseEntity {
  @Column()
  name!: string;

  @OneToMany(() => ExpenseEntity, expense => expense.category)
  expenses!: ExpenseEntity[];
}