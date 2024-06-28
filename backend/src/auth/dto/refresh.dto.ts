import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail, IsNumber } from "class-validator";

export class RefreshTokensDto {
    @ApiProperty({
        example: '241241634121',
    })
    @IsString({ message: 'String expected' })
    @IsNotEmpty({ message: 'This is required field' })
    public readonly id: string;

    @ApiProperty({
        example: 'aoiwihfjadlkfawepug9hj-kgfawle',
    })
    @IsString({ message: 'String expected' })
    @IsNotEmpty({ message: 'This is required field' })
    public readonly refreshToken: string;
}