import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { changeQuestionDto, questionDto } from './dto/createQuestions.dto';
import { createTestDto } from './dto/createTest.dto';
import { TestsService } from './tests.service';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('tests')
export class TestsController {
  constructor(private testsServise: TestsService) {}
  @Public()
  @Get('questions/:id')
  public async getQuestions(@Param('id', new ParseUUIDPipe()) id: string) {
    const quest = await this.testsServise.findSeveralQuestById(id);

    if (!quest) {
      throw new ConflictException('Test with such "id" not exists');
    }

    return quest;
  }

  @Public()
  @HttpCode(201)
  @Post('questions/:id')
  public async setQuestions(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() questionsBody: questionDto,
  ) {
    const quest = await this.testsServise.addQuestions(id, questionsBody);

    if (!quest) {
      throw new ConflictException('Test with such "id" not exists');
    }
    return quest;
  }

  @Public()
  @HttpCode(201)
  @Post('questions/change/:id')
  public async changeQuestions(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() questionsBody: changeQuestionDto,
  ) {
    const quest = await this.testsServise.changeQuestion(id, questionsBody);
    if (!quest) {
      throw new ConflictException('Test with such "id" not exists');
    }
    return quest;
  }

  @Public()
  @Delete('questions/:id')
  public async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const quest = this.testsServise.deleteQuest(id);

    if (!quest) {
      throw new ConflictException('Test with such "id" not exists');
    }

    return quest;
  }

  @Public()
  @Get()
  public findAll() {
    return this.testsServise.findAll();
  }

  @Public()
  @Get(':id')
  public async getTestById(@Param('id', new ParseUUIDPipe()) id: string) {
    console.log('id test', id);
    const test = await this.testsServise.findOneBy({ id });
    console.log('get test', test);
    if (!test) {
      return null;
    }
    return test;
  }

  @Public()
  @Post()
  @HttpCode(201)
  public async createTest(@Body() testBody: createTestDto) {
    const test = await this.testsServise.createTest(testBody);

    if (!test) {
      throw new ConflictException('Test with such "name" exists');
    }

    return testBody;
  }

  @Public()
  @Post(':id')
  @HttpCode(201)
  public async changeTest(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() testBody: createTestDto,
  ) {
    const test = await this.testsServise.changeTest(id, testBody);
    return test ?? null;
  }

  @Public()
  @Delete(':id')
  public async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const test = await this.testsServise.delTest(id);

    if (!test) {
      throw new ConflictException('Test with such "id" not exists');
    }

    return test;
  }
}
