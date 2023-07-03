import { Request, Response } from 'express';
import { UpdateResult, DeleteResult } from 'typeorm';
import { HttpResponse } from '../../shared/response/http.response';
import { ExpenseService } from '../services/expense.service';
import { ExpenseDTO } from '../dto/expense.dto';

export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService = new ExpenseService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  
  async getExpensesByUser(req: Request, res: Response) {
    const { user } = req.body;
    try {
      const data = await this.expenseService.findAllExpenseByUser();
      if (data.length === 0)
        return this.httpResponse.NotFound(res, 'There is no data');
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
    const { user } = req.body;
    const expense: ExpenseDTO = req.body;
    try {
      const data = await this.expenseService.createExpense(expense);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }

  async deleteExpense(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.expenseService.deleteExpense(id);
      if (!data.affected) return this.httpResponse.NotFound(res, "Error in delete");
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }

}
