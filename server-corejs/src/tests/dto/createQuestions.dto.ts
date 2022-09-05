import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class answer {
  @IsNotEmpty()
  @IsString()
  public answer: string;

  @IsNotEmpty()
  @IsBoolean()
  public isCorrect: boolean;
}

export class questionDto {
  @IsNotEmpty()
  @IsString()
  public testId: string;

  @IsNotEmpty()
  @IsNumber()
  public complexity: number;

  @IsNotEmpty()
  @IsString()
  public text: string;

  @IsNotEmpty()
  @IsString()
  public code: string;

  @IsNotEmpty()
  //   @Length(3, 5)
  public answers: answer[];
}

export class changeQuestionDto {
  @IsNotEmpty()
  @IsString()
  public questId: string;

  @IsNotEmpty()
  @IsString()
  public text: string;

  @IsNotEmpty()
  @IsNumber()
  public complexity: number;

  @IsNotEmpty()
  //   @Length(3, 5)
  public answers: answer[];
}

// export class QuestionsDto {
//   @IsNotEmpty()
//   @IsString()
//   public questions: questionDto[];
// }
