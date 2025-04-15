import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const isCategoryExist = await this.prisma.category.findUnique({
      where: {
        id: dto.categoryId,
      },
    });
    if (!isCategoryExist) {
      throw new NotFoundException('category does not exist');
    }
    const createdProduct = await this.prisma.product.create({
      data: dto,
    });
    return createdProduct;
  }

  async findAll() {
    return await this.prisma.product.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
            moduleName: true,
          },
        },
      },
    });
  }
}
