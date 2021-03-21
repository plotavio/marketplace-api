import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { companyProviders } from './company.providers';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller'
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers:[CompanyController],
  providers: [
    ...companyProviders,
    CompanyService,
  ],
  exports: [CompanyService]
})
export class CompanyModule {}
