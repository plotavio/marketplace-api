import { Injectable } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
    constructor(
      private companyService: CompanyService,
      private jwtService: JwtService,
      private tokenService: TokenService
      ) {}

    async validateCompany(cnpj: string, password: string): Promise<any> {
        const company = await this.companyService.findOne(cnpj);
        if (company && bcrypt.compareSync(password, company.password)) {
          const { password, ...result } = company;
          return result;
        }
        return null;
      }

      async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        const token = this.jwtService.sign(payload)
        this.tokenService.save(token, user.cnpj)
        return {
          access_token: token 
        };
      }
}
