import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService){}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getUser(username);
        if(!user){
            throw new NotAcceptableException('Could not find user');
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if(user && passwordValid){
            return {
                userId: user.id,
                userName: user.username
            };
        }

        return null;
    }
}
