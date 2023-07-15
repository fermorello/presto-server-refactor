import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { CategoryEntity } from '../../category/entities/category.entity';

@Entity({ name: 'user_category' })
export class UserCategoryEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.UserCategory)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.UserCategory)
  @JoinColumn({ name: 'category_id' })
  category!: CategoryEntity;
}
