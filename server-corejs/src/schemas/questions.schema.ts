import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v1 } from 'uuid';

export type QuestionsDocument = Questions & Document;

@Schema()
export class Questions {
  @Prop()
  testId: string;

  @Prop({ default: v1() })
  questId: string;

  @Prop()
  text: string;

  @Prop()
  answers: { answer: string; isCorrect: boolean }[];
}

export const QuestionsSchema = SchemaFactory.createForClass(Questions);
