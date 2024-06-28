import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example: 'Alex',
        description: 'User name',
    })
    @IsString({ message: 'String expected' })
    @IsNotEmpty({ message: 'This is required field' })
    public readonly name: string;

    @ApiProperty({
        example: 'example@example.com',
        description: 'User email',
    })
    @IsString({ message: 'String expected' })
    @IsEmail({}, {message: "Incorrect email"})
    @IsNotEmpty({ message: 'This is required field' })
    public readonly email: string;

    @ApiProperty({
        example: '123456',
        description: 'User password (min length - 6, max length - 32 characters',
    })
    @MinLength(6, {
        message: 'Password must be at least 6 characters long',
    })
    @MaxLength(32, {
        message: 'Password must not exceed 32 characters',
    })
    @IsString({ message: 'String expected' })
    @IsNotEmpty({ message: 'This is required field' })
    public readonly password: string;

    public readonly refreshToken?: string;
}