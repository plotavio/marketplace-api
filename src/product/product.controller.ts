import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { get } from 'node:http';
import { ResultDto } from 'src/dto/result.dto';
import { ProductCreateDto } from './dto/product.create.dto';
import { ProductUpdateDto } from './dto/product.update.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('list')
  async list(): Promise<Product[]>{
      return this.productService.list()
  }

  @Post('create')
  async create(@Body() data: ProductCreateDto): Promise<ResultDto>{
      return this.productService.create(data)
  }

  @Get('list/:id')
    async findOne(@Param('id') id: number) {
    return this.productService.getById(id);
   }

   @Get('search/:name')
   async findByName(@Param('name') name: string) {
   return this.productService.findByname(name);
  }

   @Put(':id')
   async update(@Param('id') id: number, @Body() updateUserDto: ProductUpdateDto): Promise<ResultDto> {
   return this.productService.update(id, updateUserDto);
   }

   @Delete(':id')
   async remove(@Param('id') id: number) {
   return this.productService.remove(id);
   }
}