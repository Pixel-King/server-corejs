import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 } from 'uuid';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ default: v4() })
  id: string;

  @Prop({ default: 'User' })
  userName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: '0' })
  rating: string;

  @Prop({ default: [] })
  passedTests: { date: string; testId: string }[];

  @Prop({ default: [] })
  readedArticle: { date: string; articleId: string }[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
