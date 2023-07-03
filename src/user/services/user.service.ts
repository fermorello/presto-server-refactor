import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { UserDTO } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';
import bcrypt from 'bcrypt';

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async findAllUsers(): Promise<UserEntity[]> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .getMany();
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .where({ id })
      .getOne();
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ email })
      .getOne();
  }

  async findUserByUsername(username: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ username })
      .getOne();
  }

  async createUser(user: UserDTO): Promise<UserEntity> {
    const newUser = (await this.execRepository).create(user);
    const hash = await bcrypt.hash(newUser.password, 10);
    newUser.password = hash;
    return (await this.execRepository).save(newUser);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
  
  async updateUser(id: string, updatedUser: UserDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, updatedUser);
  }
}
