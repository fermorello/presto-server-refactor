import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { HttpResponse } from '../../shared/response/http.response';
import { UserCategoryService } from '../services/user-category.service';
import { CategoryDTO } from '../../category/dto/category.dto';

export class UserCategoryController {
  constructor(
    private readonly userCategoryService: UserCategoryService = new UserCategoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}
  async getAllUserCategoriesByUserId(req: Request, res: Response) {
    const user: { sub: string; int: number } = req.user as { sub: string; int: number };
    try {
      const data = await this.userCategoryService.findUserCategoriesByUserId(user.sub);
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, 'No existe dato');
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.ERROR(res, e);
    }
  }
  //   async getPurchaseProductById(req: Request, res: Response) {
  //     const { id } = req.params;
  //     try {
  //       const data = await this.purchaseProductService.findPurchaseProductById(
  //         id
  //       );
  //       if (!data) {
  //         return this.httpResponse.NotFound(res, "No existe dato");
  //       }
  //       return this.httpResponse.Ok(res, data);
  //     } catch (e) {
  //       console.error(e);
  //       return this.httpResponse.ERROR(res, e);
  //     }
  //   }

  async createUserCategory(req: Request, res: Response) {
    const user: { sub: string; int: number } = req.user as { sub: string; int: number };
    const category: CategoryDTO = req.body;
    try {
      const data = await this.userCategoryService.createUserCategory(category, user.sub);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.ERROR(res, e);
    }
  }
  //   async updatePurchaseProduct(req: Request, res: Response) {
  //     const { id } = req.params;
  //     try {
  //       const data: UpdateResult =
  //         await this.purchaseProductService.updatePurchaseProduct(id, req.body);

  //       if (!data.affected) {
  //         return this.httpResponse.NotFound(res, "Hay un error en actualizar");
  //       }

  //       return this.httpResponse.Ok(res, data);
  //     } catch (e) {
  //       console.error(e);
  //       return this.httpResponse.ERROR(res, e);
  //     }
  //   }
  //   async deletePurchaseProduct(req: Request, res: Response) {
  //     const { id } = req.params;
  //     try {
  //       const data: DeleteResult =
  //         await this.purchaseProductService.deletePurchaseProduct(id);
  //       if (!data.affected) {
  //         return this.httpResponse.NotFound(res, "Hay un error en borrar");
  //       }

  //       return this.httpResponse.Ok(res, data);
  //     } catch (e) {
  //       console.error(e);
  //       return this.httpResponse.ERROR(res, e);
  //     }
  //   }
}
