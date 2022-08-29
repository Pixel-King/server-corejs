import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 } from 'uuid';

export type TestsDocument = Tests & Document;

@Schema()
export class Tests {
  @Prop({ default: v4() })
  id: string;

  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop({ default: '0' })
  rating: string;
}

export const TestsSchema = SchemaFactory.createForClass(Tests);
