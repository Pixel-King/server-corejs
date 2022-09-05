import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Questions, QuestionsSchema } from 'src/schemas/questions.schema';
import { Tests, TestsSchema } from 'src/schemas/tests.schema';
import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tests.name, schema: TestsSchema }]),
    MongooseModule.forFeature([
      { name: Questions.name, schema: QuestionsSchema },
    ]),
  ],
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule {}
