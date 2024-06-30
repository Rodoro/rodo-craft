import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import mongoose, { Model } from 'mongoose';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userRepository: Model<User>, private roleService: RolesService) { }

    async createUser(dto: CreateUserDto) {
        const existingUser = await this.userRepository.findOne({ email: dto.email });
        if (existingUser) {
            throw new BadRequestException('User with this email already exists');
        }
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue('USER')
        user.roles.push(role)
        await user.save();
        role.users.push(user);
        await role.save()
        if (user && user.roles) user.roles.forEach(role => { role.users = null })
        return user;
    }

    async getAllUsers() {
        let users = await this.userRepository.find().populate('roles', '-users').exec();
        users.forEach(user => { if (user && user.roles) user.roles.forEach(role => { role.users = null }) })
        return users
    }

    async getUserByEmail(email: string) {
        let user = await this.userRepository.findOne({ email: email }).populate('roles', '-users')
        if (user && user.roles) user.roles.forEach(role => { role.users = null })
        return user
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findById(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            user.roles.push(role);
            await user.save();
            return dto;
        }
        throw new BadRequestException('Пользователь или роль не найдены');
    }

    async findById(id: string): Promise<UserDocument> {
        let user = await this.userRepository.findById(id).populate('roles', '-users');
        if (user && user.roles) user.roles.forEach(role => { role.users = null })
        return user
    }

    async update(
        id: string,
        updateUserDto: UpdateUserDto,
    ): Promise<User> {
        let user = null
        if (typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/)) {
            user = await this.userRepository
                .findByIdAndUpdate(id, updateUserDto, { new: true })
                .populate('roles', '-users');
        } else if (typeof id === 'object') {
            user = await this.userRepository
                .findByIdAndUpdate(id, updateUserDto, { new: true })
                .populate('roles', '-users');
        }
        if (user && user.roles) user.roles.forEach(role => { role.users = null })
        return
    }

}
