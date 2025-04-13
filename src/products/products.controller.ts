import { Get, Controller, Body, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Product {
    return this.productsService.findById(id);
  }
  @Post()
  addProduct(@Body() createProductDto: Omit<Product, 'id'>): Product {
    return this.productsService.create({ ...createProductDto });
  }
}
