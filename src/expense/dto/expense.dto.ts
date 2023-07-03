import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from '../../config/base.dto';
import { CategoryEntity } from '../../category/entities/category.entity';
import { UserEntity } from '../../user/entities/user.entity';

export class ExpenseDTO extends BaseDTO {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  date!: Date;

  @IsNotEmpty()
  description!: String;

  @IsNotEmpty()
  category!: CategoryEntity;

  @IsNotEmpty()
  isDollar!: boolean;

  @IsNotEmpty()
  user!: UserEntity;
}
