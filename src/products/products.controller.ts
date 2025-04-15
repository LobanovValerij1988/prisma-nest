import { Get, Controller, Body, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @UseGuards(JwtGuard)
  @Get()
  getAll() {
    return this.productsService.findAll();
  }

  @Post()
  async addProduct(@Body() dto: CreateProductDto) {
    return await this.productsService.create(dto);
  }
}
