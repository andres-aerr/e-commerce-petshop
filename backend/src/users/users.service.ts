import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password_hash, ...profile } = user;
    return profile;
  }

  async updateProfile(userId: string, data: { first_name?: string; last_name?: string; phone?: string }) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data,
    });
    const { password_hash, ...profile } = user;
    return profile;
  }
}
