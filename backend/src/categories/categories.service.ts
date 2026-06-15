import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      where: { parent_id: null },
      include: {
        children: {
          orderBy: { name: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findAllFlat() {
    return this.prisma.category.findMany({
      where: { parent_id: { not: null } },
      orderBy: { name: 'asc' },
    });
  }
}
