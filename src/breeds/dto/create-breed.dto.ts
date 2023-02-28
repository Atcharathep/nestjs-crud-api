import { IsNotEmpty } from 'class-validator';

export class CreateBreedDto {
    @IsNotEmpty()
    code_id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    age: number;
}