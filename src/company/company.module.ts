import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { companyProviders } from './company.providers';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller'

@Module({
  imports: [DatabaseModule],
  controllers:[CompanyController],
  providers: [
    ...companyProviders,
    CompanyService,
  ],
})
export class CompanyModule {}
