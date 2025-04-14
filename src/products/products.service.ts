import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create({
    name,
    description,
    price,
  }: Pick<Product, 'name' | 'description' | 'price'>): Promise<Product> {
    const createdProduct = await this.prisma.product.create({
      data: { name, description, price },
    });
    return createdProduct;
  }

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async findOne(uuid: string): Promise<Product | null> {
    return await this.prisma.product.findUnique({
      where: { id: uuid },
    });
  }

  async update(
    uuid: string,
    data: Pick<Product, 'name' | 'description' | 'price'>,
  ): Promise<Product> {
    const updatedProduct = await this.prisma.product.update({
      where: { id: uuid },
      data,
    });
    return updatedProduct;
  }

  async delete(uuid: string): Promise<Product> {
    const deletedProduct = await this.prisma.product.delete({
      where: { id: uuid },
    });
    return deletedProduct;
  }
}
