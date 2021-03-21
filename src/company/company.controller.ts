import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { get } from 'node:http';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyCreateDto } from './dto/company.create.dto';
import { ResultDto } from '../dto/result.dto';
import { CompanyUpdateDto } from './dto/company.update.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('list')
  async list(): Promise<Company[]>{
      return this.companyService.list()
  }

  @Post('create')
  async create(@Body() data: CompanyCreateDto): Promise<ResultDto>{
      return this.companyService.create(data)
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @Get('list/:id')
    async findOne(@Param('id') id: number) {
    return this.companyService.getById(id);
   }

   @Put(':id')
   async update(@Param('id') id: number, @Body() updateUserDto: CompanyUpdateDto): Promise<ResultDto> {
   return this.companyService.update(id, updateUserDto);
   }

   @Delete(':id')
   async remove(@Param('id') id: number) {
   return this.companyService.remove(id);
   }
}