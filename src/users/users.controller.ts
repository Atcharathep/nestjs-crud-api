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
    const user = await this.usersService.findOne(createUserDto.codeId);
    if (user) throw new NotFoundException(`This user account exists.`);

    const createdUser = await this.usersService.create(createUserDto);
    return { message: `User created successfilly`, createdUser };
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return { message: `All users retrieved successfully`, users };
  }

  @Get(':codeId')
  async findOne(@Param('codeId') codeId: string) {
    const user = await this.usersService.findOne(codeId);
    if (!user) throw new NotFoundException(`User with ID ${codeId} not found`);
    return { massage: `User with ID ${codeId} retrieved successfully`, user };
  }

  @Put(':codeId')
  async update(@Param('codeId') codeId: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.findOne(codeId);
    if (!user) throw new NotFoundException(`User with ID ${codeId} not found`);

    const updatedUser = await this.usersService.update(codeId, updateUserDto);
    if (!updatedUser) throw new NotFoundException(`Passwords do not match`);

    return { message: `User updated successfully`, updatedUser };
  }

  @Delete(':codeId')
  async remove(@Param('codeId') codeId: string) {
    const user = await this.usersService.findOne(codeId);
    if (!user) throw new NotFoundException(`User with ID ${codeId} not found`);

    const deletedUser = await this.usersService.remove(codeId);
    return { message: `User deleted successfilly`, deletedUser };
  }
}
