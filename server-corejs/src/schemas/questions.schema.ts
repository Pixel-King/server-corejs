import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 } from 'uuid';

export type QuestionsDocument = Questions & Document;

@Schema()
export class Questions {
  @Prop()
  testId: string;

  @Prop({ default: v4() })
  questId: string;

  @Prop()
  complexity: string;

  @Prop()
  text: string;

  @Prop()
  code: string;

  @Prop()
  answers: { answer: string; isCorrect: boolean }[];
}

export const QuestionsSchema = SchemaFactory.createForClass(Questions);
