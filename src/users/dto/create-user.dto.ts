import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({ message: 'userId cannot be empty' })
    @IsString({ message: 'userId must be a string' })
    @MaxLength(13, { message: 'userId must be at most 13 characters long' })
    userId: string;

    @IsNotEmpty({ message: 'Username cannot be empty' })
    @IsString({ message: 'Username must be a string' })
    @MaxLength(20, { message: 'Username must be at most 20 characters long' })
    username: string;

    @IsNotEmpty({ message: 'Password cannot be empty' })
    @IsString({ message: 'Password must be a string' })
    @MaxLength(16, { message: 'Password must be at most 16 characters long' })
    password: string;
}
