import {
  Get,
  Controller,
  Body,
  Post,
  Param,
  NotFoundException,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.findAll();
  }

  @Get(':uuid')
  async getOne(@Param('uuid') uuid: string): Promise<Product> {
    const product = await this.productsService.findOne(uuid);
    if (!product) {
      throw new NotFoundException(`Product with id ${uuid} not found`);
    }
    return product;
  }

  @Post()
  async addProduct(
    @Body() createProductDto: Pick<Product, 'name' | 'description' | 'price'>,
  ): Promise<Product> {
    return await this.productsService.create({ ...createProductDto });
  }

  @Put(':uuid')
  async updateProduct(
    @Param('uuid') uuid: string,
    @Body() updateProductDto: Pick<Product, 'name' | 'description' | 'price'>,
  ): Promise<Product> {
    try {
      const updatedProduct = await this.productsService.update(
        uuid,
        updateProductDto,
      );
      return updatedProduct;
    } catch (error) {
      if ((error as { code?: string })?.code === 'P2025') {
        throw new NotFoundException(`Product with id ${uuid} not found`);
      }
      throw error;
    }
  }
  @Delete(':uuid')
  async deleteProduct(@Param('uuid') uuid: string): Promise<Product> {
    try {
      const deletedProduct = await this.productsService.delete(uuid);
      return deletedProduct;
    } catch (error) {
      if ((error as { code?: string })?.code === 'P2025') {
        throw new NotFoundException(`Product with id ${uuid} not found`);
      }
      throw error;
    }
  }
}
