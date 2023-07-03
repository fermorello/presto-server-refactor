import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { ExpenseDTO } from '../dto/expense.dto';
import { ExpenseEntity } from '../entities/expense.entity';

export class ExpenseService extends BaseService<ExpenseEntity> {
  constructor() {
    super(ExpenseEntity);
  }

  async findAllExpenseByUser(): Promise<ExpenseEntity[]> {
    return (await this.execRepository).createQueryBuilder('expense').getMany();
  }

  async findExpenseById(id: string): Promise<ExpenseEntity | null> {
    return (await this.execRepository).createQueryBuilder('expense').where({ id }).getOne();
  }

  async createExpense(expense: ExpenseDTO): Promise<ExpenseEntity> {
    const newExpense = (await this.execRepository).create(expense);
    return (await this.execRepository).save(newExpense);
  }

  async deleteExpense(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }

  async updateExpense(id: string, updatedExpense: ExpenseDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, updatedExpense);
  }
}
