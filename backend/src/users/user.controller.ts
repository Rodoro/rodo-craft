import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.schema';
import { JwtAuyhGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {

    constructor(private userService: UsersService) {}

    @ApiOperation({summary: 'Создать пользователя'})
    @ApiResponse({status: 201, type: User})
    @Roles('OWNER')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @ApiOperation({summary: 'Получить список'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('ADMIN', 'OWNER')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({summary: 'Выдать роль'})
    @ApiResponse({status: 200})
    @Roles('OWNER')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }
}
