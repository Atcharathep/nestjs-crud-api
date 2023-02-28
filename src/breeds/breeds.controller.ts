import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';

@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) { }

  @Get()
  async findAll() {
    const breeds = await this.breedsService.findAll();
    return { message: 'All breeds retrieved successfully', breeds };
  }

  @Get(':code_id')
  async findOne(@Param('code_id') code_id: string) {
    const breed = await this.breedsService.findOne(code_id);
    if (!breed) {
      throw new NotFoundException(`Breed with ID ${code_id} not found`);
    }
    return { message: `Breed with ID ${code_id} retrieved successfully`, breed };
  }

  @Post()
  async create(@Body() createBreedDto: CreateBreedDto) {
    const createdBreed = await this.breedsService.create(createBreedDto);
    return { message: 'Breed created successfully', createdBreed };
  }

  @Put(':code_id')
  async update(@Param('code_id') code_id: string, @Body() updateBreedDto: UpdateBreedDto) {
    const updatedBreed = await this.breedsService.update(code_id, updateBreedDto);
    return { message: 'Breed updated successfully', updatedBreed };
  }

  @Delete(':code_id')
  async remove(@Param('code_id') code_id: string) {
    const deletedBreed = await this.breedsService.remove(code_id);
    return { message: 'Breed deleted successfully', deletedBreed };
  }
}
