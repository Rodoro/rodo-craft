import { Module, forwardRef } from '@nestjs/common';
import { RolesService } from './roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './roles.schema';
import { RolesController } from './roles.controller';
import { User, UserSchema } from 'src/users/users.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }, { name: User.name, schema: UserSchema}])
  ],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService]
})
export class RolesModule { }
