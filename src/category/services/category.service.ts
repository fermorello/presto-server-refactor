import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { CategoryDTO } from '../dto/category.dto';
import { CategoryEntity } from '../entities/category.entity';

export class CategoryService extends BaseService<CategoryEntity> {
  constructor() {
    super(CategoryEntity);
  }

  async findAllCategories(): Promise<CategoryEntity[]> {
    return (await this.execRepository).createQueryBuilder('category').getMany();
  }

  async findAllDefaultCategories(): Promise<CategoryEntity[]> {
    return (await this.execRepository).createQueryBuilder('category').where('category.isDefault = :isDefault', { isDefault: true }).getMany();
  }

  async findCategoryById(id: string): Promise<CategoryEntity | null> {
    return (await this.execRepository).createQueryBuilder('category').where({ id }).getOne();
  }

  async findCategoryByName(name: string): Promise<CategoryEntity | null> {
    return (await this.execRepository).createQueryBuilder('category').where({ name }).getOne();
  }

  async createCategory(category: CategoryDTO): Promise<CategoryEntity> {
    const newCategory = (await this.execRepository).create(category);
    return (await this.execRepository).save(newCategory);
  }

  async deleteCategory(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }

  async updateCategory(id: string, updatedCategory: CategoryDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, updatedCategory);
  }
}
