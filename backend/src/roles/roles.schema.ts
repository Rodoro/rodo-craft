import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { User } from "src/users/users.schema";

export type RoleDocument = HydratedDocument<Role, RoleCreationAttrs>;

interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Schema({
    timestamps: true,
})
export class Role {

    _id: any;;
    
    @ApiProperty({ example: 'ADMIN' })
    @Prop({ required: true, type: String, unique: true })
    value: string;

    @ApiProperty({ example: 'Администратор' })
    @Prop({ required: true, type: String })
    description: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
    users: User[]

}

export const RoleSchema = SchemaFactory.createForClass(Role)