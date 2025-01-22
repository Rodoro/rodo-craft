import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({
        example: 'ADMIN',
    })
    @IsString({ message: 'String expected' })
    readonly value: string;

    @ApiProperty({
        example: 'Администратор',
    })
    @IsString({ message: 'String expected' })
    readonly description: string;
}