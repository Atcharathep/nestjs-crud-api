import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BreedDocument = HydratedDocument<Breed>;

@Schema({ versionKey: false })
export class Breed {

  @Prop()
  code_id: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const BreedSchema = SchemaFactory.createForClass(Breed);