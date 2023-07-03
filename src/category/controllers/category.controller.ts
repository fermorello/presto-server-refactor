import { Request, Response } from 'express';
import { UpdateResult, DeleteResult } from 'typeorm';
import { HttpResponse } from '../../shared/response/http.response';
import { CategoryService } from '../services/category.service';
import { CategoryDTO } from '../dto/category.dto';

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService = new CategoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  
  async getCategories(req: Request, res: Response) {
    try {
      const data = await this.categoryService.findAllCategories();
      if (data.length === 0)
        return this.httpResponse.NotFound(res, 'There is no data');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.log(e);
    }
  }

  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.findCategoryById(id);
      if (!data) return this.httpResponse.NotFound(res, 'There is no data');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }

  async createCategory(req: Request, res: Response) {
    const category: CategoryDTO = req.body;
    try {
      const data = await this.categoryService.createCategory(category);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }

  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.categoryService.deleteCategory(id);
      if (!data.affected) return this.httpResponse.NotFound(res, "Error in delete");
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }

}
