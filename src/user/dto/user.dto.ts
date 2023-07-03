import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from '../../config/base.dto';

export class UserDTO extends BaseDTO {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;
}
