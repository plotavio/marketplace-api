import { Injectable, Inject } from '@nestjs/common';
import { ResultDto } from 'src/dto/result.dto';
import { Repository } from 'typeorm';
import { ProductCreateDto } from './dto/product.create.dto';
import { ProductUpdateDto } from './dto/product.update.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async list(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getById(id: number){
    return this.productRepository.findOne(id);
    
  }

  async create(data: ProductCreateDto): Promise <ResultDto>{
    let product = new Product()
      product.name = data.name
      product.price = data.price
      product.stock = data.stock
      product.rating = data.rating
      return this.productRepository.save(product)
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

  async update(id: number, ProductUpdateDto){
    return this.productRepository
    .update(id, ProductUpdateDto)
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
    return this.productRepository.delete(id)
  }
}
