import { Body, Controller, Get, Post, Req, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Request } from 'express';
import { RefreshTokensDto } from './dto/refresh.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UsePipes(ValidationPipe)
    @Post('/login')
    login(@Body() userDto: LoginDto) {
        return this.authService.login(userDto)
    }

    @UsePipes(ValidationPipe)
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @UsePipes(ValidationPipe)
    @Get('logout')
    logout(@Req() req: Request) {
        this.authService.logout(req.user['sub']);
    }

    @UsePipes(ValidationPipe)
    @Post('refresh')
    refreshTokens(@Body() dto: RefreshTokensDto) {
        return this.authService.refreshTokens(dto.id, dto.refreshToken);
    }
}
