import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Breed, BreedDocument } from 'src/schemas/breed.schema';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';

@Injectable()
export class BreedsService {
  constructor(@InjectModel(Breed.name) private breedModel: Model<BreedDocument>) { }

  async create(createBreedDto: CreateBreedDto): Promise<Breed> {
    const newBreed = new this.breedModel(createBreedDto);
    return newBreed.save();
  }

  async findAll(): Promise<Breed[]> {
    const breeds = await this.breedModel.find().exec();
    return breeds;
  }

  async findOne(code_id: string): Promise<Breed> {
    const breed = await this.breedModel.findOne({ code_id }).exec();
    return breed;
  }

  async update(code_id: string, updateBreedDto: UpdateBreedDto): Promise<Breed> {
    const updatedBreed = await this.breedModel.findOneAndUpdate(
      { code_id },
      { $set: { ...updateBreedDto, updatedAt: Date.now() } },
      { new: true }
    ).exec();
    return updatedBreed;
  }

  async remove(code_id: string): Promise<Breed> {
    const deletedBreed = await this.breedModel.findOneAndDelete({ code_id }).exec();
    return deletedBreed;
  }
}
