import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CompanyModule } from 'src/company/company.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [CompanyModule, PassportModule],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
