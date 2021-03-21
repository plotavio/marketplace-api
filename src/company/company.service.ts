import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CompanyCreateDto } from './dto/company.create.dto';
import { CompanyUpdateDto } from './dto/company.update.dto';
import { ResultDto } from '../dto/result.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: Repository<Company>,
  ) {}

  async list(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async getById(id: number){
    return this.companyRepository.findOne(id);
    
  }

  async create(data: CompanyCreateDto): Promise <ResultDto>{
    let company = new Company()
      company.name = data.name
      company.cnpj = data.cnpj
      company.companyName = data.companyName
      company.adress = data.adress
      company.phone = data.phone
      company.password = data.password
      return this.companyRepository.save(company)
      .then((result) => {
        return <ResultDto>{
          status:true,
          message: "sucesso!"
      }
      })
      .catch((error) => {
        console.log(error)
        return <ResultDto>{
          status:false,
          message: "falhou!"
      }
      })
      
  }

  async update(id: number, CompanyUpdateDto){
    return this.companyRepository
    .update(id, CompanyUpdateDto)
    .then((result) => {
      return <ResultDto>{
        status:true,
        message:'Sucesso!'
      }
    })
    .catch((error) => {
      console.log(error);
      return <ResultDto>{
        status:false,
        message:'Falhou'
        
      };
    }) 
  }

  async remove(id: number){
    return this.companyRepository.delete(id)
  }
}
