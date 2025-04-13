import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create({
    title,
    description,
    price,
  }: Omit<Product, 'id'>): Promise<Product> {
    const createdProduct = await this.prisma.create({
      data: { title, description, price },
    });
    return createdProduct;
  }

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }
}
