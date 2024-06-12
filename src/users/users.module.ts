import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports :[
        JwtModule.register({
            global:true,
            secret:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSm9obiBEb2UifQ.7RCIDxPiGTM9HO9CXI-WeZGplQbxh-YFx5EOOh81alk",
            signOptions:{expiresIn:'6000s'}
        })
    ],
    controllers:[UsersController],
    providers:[UsersService]
})
export class UsersModule {}
