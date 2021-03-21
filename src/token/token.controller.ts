import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { RefreshTokenDto } from "./dto/refresh.token.dto";
import { TokenService } from "./token.service";

@Controller('token')
export class TokenController{
    constructor(
        private TokenService: TokenService
    ){}

    @Get('isValid/:token')
    async isValidToken(@Param('token') token: string) {
        return this.TokenService.IsValidToken(token);
    }

    @Put('refresh')
    async refreshToken(@Body() data: RefreshTokenDto){
        return this.TokenService.refreshToken(data.oldToken)
    }
}