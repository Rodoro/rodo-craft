import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'


@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private jwtService: JwtService) { }

    async login(userDto: LoginDto) {
        const user = await this.validateUser(userDto)
        const tokens = await this.getTokens(user._id, user.name, user.email, user.img, user.roles);
        await this.updateRefreshToken(user._id, tokens.refreshToken)
        return tokens
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new BadRequestException('User with this email already exists');
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({ ...userDto, password: hashPassword })
        const tokens = await this.getTokens(user._id, user.name, user.email, user.img, user.roles);
        await this.updateRefreshToken(user._id, tokens.refreshToken)
        return tokens
    }

    async logout(userId: string) {
        return this.userService.update(userId, { refreshToken: null })
    }

    async refreshTokens(userId: string, refreshToken: string) {
        const user = await this.userService.findById(userId)
        if (!user || !user.refreshToken) {
            throw new ForbiddenException('Access Denied');
        }

        const refreshTokenMatches = await bcrypt.compare(
            refreshToken,
            user.refreshToken,
        );
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user._id, user.name, user.email, user.img, user.roles);
        await this.updateRefreshToken(user._id, tokens.refreshToken);
        return tokens;
    }

    private async validateUser(userDto: LoginDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (!user) {
            throw new UnauthorizedException({ message: 'Invalid email or password' })
        }
        const passwordEqual = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEqual) {
            return user
        }
        throw new UnauthorizedException({ message: 'Invalid email or password' })
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 5);
        await this.userService.update(userId, {
            refreshToken: hashedRefreshToken,
        });
    }

    async getTokens(userId: string, username: string, email: string, img: string, roles: any) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                    email,
                    img,
                    roles
                },
                {
                    secret: process.env.JWT_ACCESS_SECRET,
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: process.env.JWT_REFRESH_SECRET,
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

}
