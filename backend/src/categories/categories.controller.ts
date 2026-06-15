import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(@Query('flat') flat?: string) {
    if (flat === 'true') {
      return this.categoriesService.findAllFlat();
    }
    return this.categoriesService.findAll();
  }
}
