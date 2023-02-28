import { Module } from '@nestjs/common';
import { BreedsModule } from './breeds/breeds.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [BreedsModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest')],
  controllers: [],
  providers: [],
})
export class AppModule { }
