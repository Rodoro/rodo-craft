import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class AddRoleDto {
     @ApiProperty({
        example: 'MODER',
    })
    @IsString({message: "String expected"})
    readonly value: string;

    @ApiProperty({
        example: '68718261264889621',
    })
    @IsString({message: "String expected"})
    readonly userId: number;
}