import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ProductModule,
    AuthModule,
    TokenModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
