import { Request, Response } from 'express';
import { UpdateResult, DeleteResult } from 'typeorm';
import { HttpResponse } from '../../shared/response/http.response';
import { ExpenseService } from '../services/expense.service';
import { ExpenseDTO } from '../dto/expense.dto';
import { CategoryService } from '../../category/services/category.service';
import { UserService } from '../../user/services/user.service';
import { CategoryEntity } from '../../category/entities/category.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { UpdateExpenseDTO } from '../dto/updateExpense.dto';

export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService = new ExpenseService(),
    private readonly userService: UserService = new UserService(),
    private readonly categoryService: CategoryService = new CategoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getExpensesByUser(req: Request, res: Response) {
    const user: { sub: string; int: number } = req.user as { sub: string; int: number };
    try {
      const data = await this.expenseService.findAllExpenseByUser(user.sub);
      if (data.length === 0) return this.httpResponse.NotFound(res, 'There is no data');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.log(e);
    }
  }

  async getExpensesByUserAndCategory(req: Request, res: Response) {
    const user: { sub: string; int: number } = req.user as { sub: string; int: number };
    const { id: category } = req.params;
    try {
      const data = await this.expenseService.findAllExpenseByUserAndCategory(user.sub, category);
      if (data.length === 0) return this.httpResponse.NotFound(res, 'There is no data');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.log(e);
    }
  }

  async sumAllExpenseByUserAndCategory(req: Request, res: Response) {
    const user: { sub: string; int: number } = req.user as { sub: string; int: number };
    try {
      const data = await this.expenseService.sumAllExpenseByUserAndCategory(user.sub);
      if (data.length === 0) return this.httpResponse.NotFound(res, 'There is no data');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.log(e);
    }
  }

  async sumAllExpenseByUserAndCategoryAndDate(req: Request, res: Response) {
    const user: { sub: string; int: number } = req.user as { sub: string; int: number };
    const { date } = req.query;
    try {
      const data = await this.expenseService.sumAllExpenseByUserAndCategoryAndDate(user.sub, date as string);
      if (data.length === 0) return this.httpResponse.NotFound(res, 'There is no data');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.log(e);
    }
  }

  async getMonthlyExpenseSum(req: Request, res: Response) {
    const user: { sub: string; int: number } = req.user as { sub: string; int: number };
    const { year, month } = req.query;
    try {
      const data = await this.expenseService.getMonthlyExpenseSum(user.sub, { year, month } as { year: string; month: string });
      const sum = await this.expenseService.sumMonthlyExpense(user.sub, { year, month } as { year: string; month: string });
      if (data.length === 0) return this.httpResponse.NotFound(res, 'There is no data');
      return this.httpResponse.Ok(res, { data, total: sum });
    } catch (e) {
      console.log(e);
    }
  }

  async getAllMonthlyExpenseSum(req: Request, res: Response) {
    const user: { sub: string; int: number } = req.user as { sub: string; int: number };
    const { year, month } = req.query;
    try {
      const data = await this.expenseService.getAllMonthlyExpenseSum(user.sub);
      if (data.length === 0) return this.httpResponse.NotFound(res, 'There is no data');
      return this.httpResponse.Ok(res, { data });
    } catch (e) {
      console.log(e);
    }
  }

  async getAllExpenseByDates(req: Request, res: Response) {
    const user: { sub: string; int: number } = req.user as { sub: string; int: number };
    try {
      const data = await this.expenseService.findAllExpenseByDates(user.sub);
      if (data.length === 0) return this.httpResponse.NotFound(res, 'There is no data');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.log(e);
    }
  }

  async getExpenseById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.expenseService.findExpenseById(id);
      if (!data) return this.httpResponse.NotFound(res, 'There is no data');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }

  async createExpense(req: Request, res: Response) {
    const user: { sub: string; int: number } = req.user as { sub: string; int: number };
    const expense: ExpenseDTO = req.body;
    try {
      const searchedCategory: CategoryEntity | null = await this.categoryService.findCategoryById(String(expense.category));
      if (!searchedCategory) return this.httpResponse.ERROR(res, 'Category does not exists');
      const searchedUser: UserEntity | null = await this.userService.findUserById(user.sub);
      if (!searchedUser) return this.httpResponse.ERROR(res, 'User does not exists');
      expense.category = searchedCategory as CategoryEntity;
      expense.user = searchedUser as UserEntity;
      const data = await this.expenseService.createExpense(expense);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }

  async updateExpense(req: Request, res: Response) {
    const { id } = req.params;
    const updatedUser: UpdateExpenseDTO = req.body;
    try {
      const data: UpdateResult = await this.expenseService.updateExpense(id, updatedUser);

      if (!data.affected) return this.httpResponse.NotFound(res, 'Error in update');

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }

  async deleteExpense(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.expenseService.deleteExpense(id);
      if (!data.affected) return this.httpResponse.NotFound(res, 'Error in delete');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }
}
