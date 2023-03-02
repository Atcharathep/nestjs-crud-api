import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto) {
    const newUser = await new this.userModel(createUserDto).save();
    const userObj = newUser.toObject();
    delete userObj.password;
    return userObj;
  }

  async findAll() {
    const users = await this.userModel.find({}, { password: 0 });
    return users;
  }

  async findOne(userId: string) {
    const user = await this.userModel.findOne({ userId }, { password: 0 });
    return user;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const password = updateUserDto['old_password'];
    const updatedUser = await this.userModel.findOneAndUpdate(
      { userId, password },
      { $set: { ...updateUserDto, updatedAt: Date.now() } },
      { new: true },
    ).select('-password');
    return updatedUser;
  }

  async remove(userId: string) {
    const deletedUser = await this.userModel.findOneAndDelete({ userId }, { password: 0 });
    return deletedUser;
  }
}
