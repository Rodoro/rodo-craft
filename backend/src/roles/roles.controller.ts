import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.schema';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {

    constructor(private roleService: RolesService) {}
    
    @ApiOperation({summary: 'Создать роль'})
    @ApiResponse({status: 201, type: [Role]})
    @Roles('OWNER')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({summary: 'Найти роль по значению'})
    @ApiResponse({status: 200, type: [Role]})
    @Roles('ADMIN', 'OWNER')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }
}
