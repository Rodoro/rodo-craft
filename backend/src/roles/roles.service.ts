import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './roles.schema';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role.name) private roleRepository: Model<Role>) { }

    async createRole(dto: CreateRoleDto) {
        const existingRole = await this.roleRepository.findOne({ value: dto.value }).exec();
        if (existingRole) {
            throw new BadRequestException('Role with this value already exists');
        }
        const role = await this.roleRepository.create(dto)
        return role;
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({ value: value }).exec()
        return role
    }

}
