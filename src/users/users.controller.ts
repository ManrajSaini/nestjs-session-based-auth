import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post('/signup')
    async addUser(
        @Body('password') userPassword: string,
        @Body('username') userName: string,
    ){
        const salt = 10;
        const hashedPassword = await bcrypt.hash(userPassword, salt);
        const result = await this.usersService.insertUser(
            userName,
            hashedPassword,
        );

        return {
            msg: 'User successfully registered',
            userId: result.id,
            userName: result.username,
        };
    }
}
