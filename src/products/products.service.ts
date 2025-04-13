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

  async findById(productId: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return { ...product };
  }
  // update(
  //   productId: string,
  //   { title, description, price }: Omit<Product, 'id'>,
  // ): Product {
  //   const productIndex = this.findProductIndex(productId);
  //   if (productIndex === -1) {
  //     throw new NotFoundException('Product not found');
  //   }
  //   const updatedProduct = new Product(title, price, description);
  //   this.products[productIndex] = updatedProduct;
  //   return { ...updatedProduct };
  // }

  // private findProductIndex(productId: string): Promise<number> {
  //   return this.prisma.products.((product) => product.id === productId);
  // }
}
