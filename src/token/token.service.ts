import { Injectable, Inject, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Token } from './token.entity';
import { CompanyService } from 'src/company/company.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<Token>,
    private userService: CompanyService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

async save(hash: string, username: string){
  let objToken = await this.tokenRepository.findOne({username: username})
  if(objToken){
    this.tokenRepository.update(objToken.id, {
      hash: hash
    })
  }else{
    this.tokenRepository.insert({
      hash: hash,
      username: username
    })
  }
}

async IsValidToken(token: string) {
  const objToken = await this.tokenRepository.findOne({ hash: token });
  if (objToken) return true;

  return false;
}

async refreshToken(oldToken: string){
  let objToken = await this.tokenRepository.findOne({ hash: oldToken})
  if (objToken){
    let user = await this.userService.findOne(objToken.username)
    return this.authService.login(user)
  }else{
  
    
    return new HttpException({
      
      errorMessage: 'Token Invalido'
    }, HttpStatus.UNAUTHORIZED)
  }

}
}
