import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    ProductsModule,
    CategoriesModule,
    AuthModule,
    UsersModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
