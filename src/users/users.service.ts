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

  async findOne(codeId: string) {
    const user = await this.userModel.findOne({ codeId }, { password: 0 });
    return user;
  }

  async update(codeId: string, updateUserDto: UpdateUserDto) {
    const password = updateUserDto['old_password'];
    const updatedUser = await this.userModel.findOneAndUpdate(
      { codeId, password },
      { $set: { ...updateUserDto, updatedAt: Date.now() } },
      { new: true },
    ).select('-password');
    return updatedUser;
  }

  async remove(codeId: string) {
    const deletedUser = await this.userModel.findOneAndDelete({ codeId }, { password: 0 });
    return deletedUser;
  }
}
