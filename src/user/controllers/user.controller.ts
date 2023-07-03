import { Request, Response } from 'express';
import { UpdateResult, DeleteResult } from 'typeorm';
import { UserService } from '../services/user.service';
import { HttpResponse } from '../../shared/response/http.response';

export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  async getUsers(req: Request, res: Response) {
    try {
      const data = await this.userService.findAllUsers();
      if (data.length === 0)
        return this.httpResponse.NotFound(res, 'There is no data');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.log(e);
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.userService.findUserById(id);
      if (!data) return this.httpResponse.NotFound(res, 'There is no data');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }

  async createUser(req: Request, res: Response) {
    const user = req.body;
    try {
      const data = await this.userService.createUser(user);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.userService.deleteUser(id);
      if (!data.affected) return this.httpResponse.NotFound(res, "Error in delete");
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const updatedUser = req.body;
    try {
      const data: UpdateResult = await this.userService.updateUser(
        id,
        updatedUser
      );

      if (!data.affected) return this.httpResponse.NotFound(res, "Error in update");

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }
}
