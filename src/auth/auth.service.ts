import { Injectable } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private companyService: CompanyService) {}

    async validateCompany(cnpj: string, password: string): Promise<any> {
        const company = await this.companyService.findOne(cnpj);
        if (company && bcrypt.compareSync(password, company.password)) {
          const { password, ...result } = company;
          return result;
        }
        return null;
      }
}
