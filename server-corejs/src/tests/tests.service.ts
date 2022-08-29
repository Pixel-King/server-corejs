import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questions, QuestionsDocument } from 'src/schemas/questions.schema';
import { Tests, TestsDocument } from 'src/schemas/tests.schema';
import { changeQuestionDto, questionDto } from './dto/createQuestions.dto';
import { createTestDto } from './dto/createTest.dto';
import { TestsModel } from './tests.models';

@Injectable()
export class TestsService {
  constructor(
    @InjectModel(Tests.name) private testModel: Model<TestsDocument>,
    @InjectModel(Questions.name)
    private questionsModel: Model<QuestionsDocument>,
  ) {}

  public async findSeveralQuestById(id: string) {
    const quest = await this.questionsModel.find();
    console.log(quest);
    const sortQ = quest.filter((el) => el.testId === id);
    return sortQ;
  }

  public async findOneQuestsById(id: string) {
    const questions = await this.questionsModel.findOne({ questId: id });
    return questions ?? null;
  }

  public async changeQuestion(id: string, questionBody: changeQuestionDto) {
    const quest = await this.findOneQuestsById(id);

    if (!quest) {
      return null;
    }
    const chnageQuest = {
      testId: quest.testId,
      questId: quest.questId,
      text: questionBody.text,
      answers: questionBody.answers,
    };
    await this.deleteQuest(quest.questId);
    const newQuest = await new this.questionsModel(chnageQuest);
    const saveQuest = newQuest.save();
    return saveQuest;
  }

  public deleteQuest(id: string) {
    const quest = this.questionsModel.deleteOne({ questId: id });

    if (!quest) {
      return null;
    }

    return quest;
  }

  public async addQuestions(id: string, questionBody: questionDto) {
    const test = await this.findOneBy({ id });
    if (test) {
      //   const quest = await this.findOneQuestsById(id);
      const questObj = {
        testId: id,
        text: questionBody.text,
        answers: questionBody.answers,
      };
      const newQuest = await new this.questionsModel(questObj);
      const questions = newQuest.save();
      return questions ? { success: true } : { success: false };
    }
    return null;
  }

  public findAll() {
    return this.testModel.find();
  }

  public async findOneBy(param: Partial<TestsModel>) {
    const test = await this.testModel.findOne(param);

    return test ?? null;
  }

  public async createTest(testBody: createTestDto) {
    const test = await this.findOneBy({
      name: testBody.name,
      type: testBody.type,
    });
    if (!test) {
      const newTest = new this.testModel(testBody);
      const createdTest = await newTest.save();
      return createdTest;
    }
    return null;
  }

  public async delTest(id: string) {
    const test = await this.findOneBy({ id });
    if (test) {
      await this.questionsModel.deleteMany({ testId: id });
      return await this.testModel.deleteOne({ id });
    }
    return null;
  }

  public async changeTest(id: string, testBody: createTestDto) {
    const test = await this.findOneBy({ id });
    const changeTestObj = {
      id: id,
      ...testBody,
    };
    if (!test) {
      return null;
    }
    this.delTest(id);
    const newTest = new this.testModel(changeTestObj);
    const saveNewTest = newTest.save();
    return saveNewTest;
  }
}
