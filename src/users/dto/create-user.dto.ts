import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({ message: 'CodeId cannot be empty' })
    @IsString({ message: 'CodeId must be a string' })
    @MaxLength(13, { message: 'CodeId must be at most 13 characters long' })
    codeId: string;

    @IsNotEmpty({ message: 'Username cannot be empty' })
    @IsString({ message: 'Username must be a string' })
    @MaxLength(20, { message: 'Username must be at most 20 characters long' })
    username: string;

    @IsNotEmpty({ message: 'Password cannot be empty' })
    @IsString({ message: 'Password must be a string' })
    @MaxLength(16, { message: 'Password must be at most 16 characters long' })
    password: string;
}
