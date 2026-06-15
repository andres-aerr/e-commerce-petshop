import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  category_id: string;

  @IsString()
  sku: string;

  @IsString()
  pet_type: string;

  @IsString()
  @IsOptional()
  image_url?: string;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsNumber()
  @IsOptional()
  weight_kg?: number;

  @IsBoolean()
  @IsOptional()
  is_published?: boolean;

  @IsBoolean()
  @IsOptional()
  is_bestseller?: boolean;

  @IsString()
  @IsOptional()
  badge?: string;

  @IsNumber()
  price_one_time: number;

  @IsNumber()
  price_autoship: number;

  @IsInt()
  @IsOptional()
  autoship_discount_percentage?: number;

  @IsInt()
  @IsOptional()
  stock_quantity?: number;

  @IsString()
  @IsOptional()
  meta_title?: string;

  @IsString()
  @IsOptional()
  meta_description?: string;
}
