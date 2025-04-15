import { Get, Controller, Body, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';
import { RoleType, User } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.findAll();
  }
  @UseGuards(JwtGuard)
  @Post()
  async addProduct(
    @Body() dto: CreateProductDto,
    @Roles([RoleType.Guest]) user: User,
  ) {
    console.log(user);
    return await this.productsService.create(dto);
  }
}
