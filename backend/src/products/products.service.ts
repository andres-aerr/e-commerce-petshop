import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    category?: string;
    petType?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) {
    const { category, petType, sort, page = 1, limit = 20 } = params;
    const skip = (page - 1) * limit;

    const where: any = { is_published: true };
    if (category) where.category = { slug: category };
    if (petType) where.pet_type = petType;

    const orderBy: any = {};
    if (sort === 'price_asc') orderBy.price_one_time = 'asc';
    else if (sort === 'price_desc') orderBy.price_one_time = 'desc';
    else if (sort === 'rating') orderBy.reviews = { _count: 'desc' };
    else orderBy.created_at = 'desc';

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          category: true,
          reviews: {
            where: { is_published: true },
            select: { rating: true },
          },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    const productsWithAvgRating = products.map((p) => {
      const ratings = p.reviews.map((r) => r.rating);
      const avgRating = ratings.length > 0
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : 0;
      return {
        ...p,
        avg_rating: Math.round(avgRating * 10) / 10,
        review_count: ratings.length,
        reviews: undefined,
      };
    });

    return {
      products: productsWithAvgRating,
      total,
      page,
      limit,
      total_pages: Math.ceil(total / limit),
    };
  }

  async findBestSellers() {
    const products = await this.prisma.product.findMany({
      where: { is_published: true, is_bestseller: true },
      take: 8,
      include: {
        category: true,
        reviews: {
          where: { is_published: true },
          select: { rating: true },
        },
      },
    });

    return products.map((p) => {
      const ratings = p.reviews.map((r) => r.rating);
      const avgRating = ratings.length > 0
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : 0;
      return {
        ...p,
        avg_rating: Math.round(avgRating * 10) / 10,
        review_count: ratings.length,
        reviews: undefined,
      };
    });
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug, is_published: true },
      include: {
        category: true,
        reviews: {
          where: { is_published: true },
          take: 10,
          orderBy: { created_at: 'desc' },
        },
      },
    });

    if (!product) return null;

    const ratings = product.reviews.map((r) => r.rating);
    const avgRating = ratings.length > 0
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : 0;

    return {
      ...product,
      avg_rating: Math.round(avgRating * 10) / 10,
      review_count: ratings.length,
    };
  }

  async findReviewsBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        reviews: {
          where: { is_published: true },
          orderBy: { created_at: 'desc' },
        },
      },
    });

    if (!product) return [];
    return product.reviews;
  }

  async create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...dto,
        images_json: dto.images ? JSON.stringify(dto.images) : null,
      },
    });
  }

  async update(id: string, dto: Partial<CreateProductDto>) {
    const data: any = { ...dto };
    if (dto.images) {
      data.images_json = JSON.stringify(dto.images);
      delete data.images;
    }
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }
}
