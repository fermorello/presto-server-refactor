import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from '../../config/base.dto';
import { UserEntity } from '../../user/entities/user.entity';
import { CategoryEntity } from '../../category/entities/category.entity';

export class UserCategoryDTO extends BaseDTO {
  @IsNotEmpty()
  user!: UserEntity;
  
  @IsNotEmpty()
  category!: CategoryEntity;
}
