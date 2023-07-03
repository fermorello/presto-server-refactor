import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { ExpenseDTO } from '../dto/expense.dto';
import { ExpenseEntity } from '../entities/expense.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { UpdateExpenseDTO } from '../dto/updateExpense.dto';

export class ExpenseService extends BaseService<ExpenseEntity> {
  constructor() {
    super(ExpenseEntity);
  }

  async findAllExpenseByUser(userId: string): Promise<ExpenseEntity[]> {
    return (await this.execRepository)
      .createQueryBuilder('expense')
      .leftJoinAndSelect('expense.user', 'user')
      .leftJoinAndSelect('expense.category', 'category')
      .where('expense.user = :userId', { userId })
      .getMany();
  }

  async findAllExpenseByUserAndCategory(userId: string, categoryId: string): Promise<ExpenseEntity[]> {
    return (await this.execRepository)
      .createQueryBuilder('expense')
      .where('expense.user = :userId', { userId })
      .andWhere('expense.category = :categoryId', { categoryId })
      .getMany();
  }

  async sumAllExpenseByUserAndCategory(userId: string): Promise<ExpenseEntity[]> {
    return (await this.execRepository)
      .createQueryBuilder('expense')
      .select(['category.name AS name', 'SUM(expense.amount) AS total'])
      .innerJoin('expense.category', 'category')
      .where('expense.user = :userId', { userId })
      .groupBy('name')
      .getRawMany();
  }

  async sumAllExpenseByUserAndCategoryAndDate(userId: string, date: string): Promise<ExpenseEntity[]> {
    return (await this.execRepository)
      .createQueryBuilder('expense')
      .select(['category.name AS name', 'SUM(expense.amount) AS total'])
      .innerJoin('expense.category', 'category')
      .where('expense.user = :userId', { userId })
      .andWhere('DATE(expense.date) = :date', { date })
      .groupBy('name')
      .getRawMany();
  }

  async getMonthlyExpenseSum(userId: string, { year, month }: { year: string; month: string }): Promise<ExpenseEntity[]> {
    return (await this.execRepository)
      .createQueryBuilder('expense')
      .where('expense.user = :userId', { userId })
      .andWhere('YEAR(expense.date) = :year', { year })
      .andWhere('MONTH(expense.date) = :month', { month })
      .getMany();
  }

  async sumMonthlyExpense(userId: string, { year, month }: { year: string; month: string }): Promise<ExpenseEntity[]> {
    return (await this.execRepository)
      .createQueryBuilder('expense')
      .select(['category.name AS name', 'SUM(expense.amount) AS total'])
      .innerJoin('expense.category', 'category')
      .where('expense.user = :userId', { userId })
      .andWhere('YEAR(expense.date) = :year', { year })
      .andWhere('MONTH(expense.date) = :month', { month })
      .groupBy('name')
      .getRawMany();
  }

  async getAllMonthlyExpenseSum(userId: string): Promise<ExpenseEntity[]> {
    return (await this.execRepository)
      .createQueryBuilder('expense')
      .select('MONTH(expense.date) AS month, SUM(expense.amount) AS total')
      .where('expense.user = :userId', { userId })
      .groupBy('month')
      .orderBy('month')
      .getRawMany();
  }

  async findAllExpenseByDates(userId: string): Promise<ExpenseEntity[]> {
    return (await this.execRepository).createQueryBuilder('expense').where('expense.user = :userId', { userId }).getMany();
  }

  async sumAllExpenseByDates(date: string): Promise<ExpenseEntity[]> {
    return (await this.execRepository).createQueryBuilder('expense').where('expense.date = :date', { date }).getMany();
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

  async updateExpense(id: string, updatedExpense: UpdateExpenseDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, updatedExpense);
  }
}
