import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findOne(createUserDto.userId);
    if (user) throw new NotFoundException(`This user account exists.`);

    const createdUser = await this.usersService.create(createUserDto);
    return { message: `User created successfilly`, createdUser };
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return { message: `All users retrieved successfully`, users };
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    return { massage: `User with ID ${userId} retrieved successfully`, user };
  }

  @Put(':userId')
  async update(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    const updatedUser = await this.usersService.update(userId, updateUserDto);
    if (!updatedUser) throw new NotFoundException(`Passwords do not match`);

    return { message: `User updated successfully`, updatedUser };
  }

  @Delete(':userId')
  async remove(@Param('userId') userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    const deletedUser = await this.usersService.remove(userId);
    return { message: `User deleted successfilly`, deletedUser };
  }
}
