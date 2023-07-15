import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { CategoryService } from '../../category/services/category.service';
import { UserCategoryEntity } from '../entities/user-category.entity';
import { CategoryDTO } from '../../category/dto/category.dto';
import { UserService } from '../../user/services/user.service';
import { UserEntity } from '../../user/entities/user.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import { UserCategoryDTO } from '../dto/user-category.dto';

export class UserCategoryService extends BaseService<UserCategoryEntity> {
  constructor(
    private readonly categoryService: CategoryService = new CategoryService(),
    private readonly userService: UserService = new UserService(),
  ) {
    super(UserCategoryEntity);
  }

  async findUserCategoriesByUserId(user_id: string): Promise<UserCategoryEntity[]> {
    return (await this.execRepository)
      .createQueryBuilder('userCategory')
      .leftJoinAndSelect('userCategory.category', 'category')
      .where('userCategory.user_id = :user_id', { user_id })
      .getMany();
  }

  async createUserCategory(category: CategoryDTO, user_id: string): Promise<UserCategoryEntity> {
    const newCategory: CategoryEntity = await this.categoryService.createCategory(category);
    const user: UserEntity = await this.userService.findUserById(user_id) as UserEntity;
    const newUserCategoryEntity: UserCategoryDTO = {
      user,
      category: newCategory,
    } as UserCategoryDTO;
    const newUserCategory = (await this.execRepository).create(newUserCategoryEntity);
    return (await this.execRepository).save(newUserCategory);
  }

  //   async deletePurchaseProduct(id: string): Promise<DeleteResult> {
  //     return (await this.execRepository).delete({ id });
  //   }

  //   async updatePurchaseProduct(id: string, infoUpdate: UserCategoryEntityDTO): Promise<UpdateResult> {
  //     return (await this.execRepository).update(id, infoUpdate);
}
