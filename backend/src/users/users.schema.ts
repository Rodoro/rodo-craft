import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Role } from "src/roles/roles.schema";

export type UserDocument = HydratedDocument<User, UserCreationAttrs>;

interface UserCreationAttrs {
    name: string;
    email: string;
    password: string;
}

@Schema({
    timestamps: true,
})
export class User {

    _id: any;;
    
    @ApiProperty({ example: 'Alex', description: 'Имя пользователя' })
    @Prop({ required: true, type: String })
    name: string;

    @ApiProperty({ example: 'example@example.com', description: 'Уникальный email' })
    @Prop({ required: true, type: String, unique: true })
    email: string;

    @ApiProperty({ example: 'sihdfuiwkdjsaiohsfjw[pejoi[wenhpowd[[s', description: 'Пароль пользователя' })
    @Prop({ required: true, type: String })
    password: string;

    @ApiProperty({ example: 'null', description: 'Картинка профиля пользователя' })
    @Prop({ type: String })
    img: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role'}]})
    roles: Role[]

}

export const UserSchema = SchemaFactory.createForClass(User)