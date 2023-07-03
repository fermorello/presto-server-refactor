import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseDTO } from '../../config/base.dto';
import { CategoryEntity } from '../../category/entities/category.entity';
import { UserEntity } from '../../user/entities/user.entity';

export class ExpenseDTO extends BaseDTO {
  @IsNotEmpty()
  expense_name!: string;

  @IsNotEmpty()
  date!: Date;

  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  category!: CategoryEntity;

  @IsNotEmpty()
  isDollar!: boolean;
  
  @IsOptional()
  user!: UserEntity;
}
