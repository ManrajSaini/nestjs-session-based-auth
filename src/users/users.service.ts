import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly userModel: Model<User>){}

    async insertUser(username: string, password: string) {
        const username = username.toLowerCase();
        const newUser = new this.userModel({
            username,
            password,
        });

        await newUser.save();
        return newUser;
    }
}
