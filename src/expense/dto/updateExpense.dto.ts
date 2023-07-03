import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseDTO } from '../../config/base.dto';
import { CategoryEntity } from '../../category/entities/category.entity';
import { UserEntity } from '../../user/entities/user.entity';

export class UpdateExpenseDTO extends BaseDTO {
  @IsOptional()
  expense_name!: string;

  @IsOptional()
  date!: Date;

  @IsOptional()
  description!: string;

  @IsOptional()
  category!: CategoryEntity;

  @IsOptional()
  isDollar!: boolean;
}
